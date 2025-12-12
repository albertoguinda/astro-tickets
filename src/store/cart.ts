import { computed } from 'nanostores';
import { persistentMap } from '@nanostores/persistent';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// Persist cart in localStorage under the key 'astro-tickets-cart'
export const cartItems = persistentMap<Record<string, CartItem>>(
  'astro-tickets-cart',
  {},
  {
    // Custom decode function to ensure price is always a number and handle corrupt data
    decode: (value) => {
      try {
        const item = JSON.parse(value);
        if (item && typeof item === 'object' && item.id && item.name && typeof item.price === 'number' && typeof item.quantity === 'number') {
            // Ensure price is a number for this individual item
            if (typeof item.price === 'string') { // Re-check if it's somehow a string
                item.price = Number(item.price);
            }
            return item;
        }
        // If the parsed item is not a valid CartItem, return undefined to remove it
        console.warn('Corrupt cart item in localStorage, removing:', item);
        return undefined; // Returning undefined removes the item from the map
      } catch (e) {
        // If JSON parsing fails, the data is corrupt, return undefined to remove it
        console.warn('Failed to parse corrupt cart item from localStorage, removing:', value, e);
        return undefined;
      }
    },
    // No custom encode needed, default JSON.stringify handles numbers correctly
  }
);
export function addCartItem(item: Omit<CartItem, 'quantity'>) {
  const existing = cartItems.get()[item.id];
  const price = Number(item.price);
  
  if (isNaN(price)) {
    console.error(`Invalid price for item ${item.name}: ${item.price}`);
    return;
  }

  if (existing) {
    cartItems.setKey(item.id, {
      ...existing,
      quantity: existing.quantity + 1,
    });
  } else {
    cartItems.setKey(item.id, {
      ...item,
      price: price,
      quantity: 1,
    });
  }
}


export function removeCartItem(id: string) {
  const existing = cartItems.get()[id];
  if (existing && existing.quantity > 1) {
    cartItems.setKey(id, {
      ...existing,
      quantity: existing.quantity - 1,
    });
  } else {
    // If quantity is 1 or user wants to remove completely
    const current = cartItems.get();
    const { [id]: _, ...rest } = current; // Destructure to remove key
    cartItems.set(rest);
  }
}

export function clearCart() {
  cartItems.set({});
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem('astro-tickets-cart');
  }
}

// Helper to get total count for the badge
export const $totalItems = computed(cartItems, (items) => {
  return Object.values(items).reduce((sum, item) => sum + (item?.quantity || 0), 0);
});

// Helper to get total price
export const $totalPrice = computed(cartItems, (items) => {
  return Object.values(items).reduce((sum, item) => {
    if (!item) return sum;
    const price = Number(item.price);
    return sum + (isNaN(price) ? 0 : price) * (item.quantity || 0);
  }, 0);
});


