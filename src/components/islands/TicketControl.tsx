import React, { useState } from 'react';
import { addCartItem } from '../../store/cart'; // Import cartItems for sanitization

interface TicketControlProps {
  id: string;
  name: string;
  price: number;
  initialStock: number;
  image: string;
}

export default function TicketControl({ id, name, price, initialStock, image }: TicketControlProps) {
  const [stock, setStock] = useState(initialStock);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (quantity > stock) return; // Safety check

    // Add to global store
    for (let i = 0; i < quantity; i++) {
        addCartItem({ id, name, price, image });
    }

    // Decrease local stock visually
    setStock(prev => prev - quantity);
    
    // Reset quantity selection or keep it, keeping it at 1 makes sense
    setQuantity(1);
  };

  const isSoldOut = stock === 0;

  return (
    <div className="card-actions flex-col mt-4 gap-3">
      <div className="flex justify-between w-full items-center">
        <span className="text-sm font-semibold">
            Stock: <span className={stock < 5 ? "text-error" : "text-success"}>{stock}</span>
        </span>
        <span className="text-xl font-bold">{price}€</span>
      </div>

      <div className="flex w-full gap-2">
         {/* Quantity Selector */}
        <select
            className="select select-bordered select-md w-24 min-h-11"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            disabled={isSoldOut}
            aria-label="Cantidad"
        >
            {[...Array(Math.min(5, stock)).keys()].map(i => (
                <option key={i+1} value={i+1}>{i+1}</option>
            ))}
        </select>

        {/* Buy Button */}
        <button
            onClick={handleAddToCart}
            disabled={isSoldOut}
            className={`btn btn-md flex-1 min-h-11 ${isSoldOut ? 'btn-disabled' : 'btn-primary'}`}
        >
            {isSoldOut ? 'Sold Out' : 'Agregar al Carrito'}
        </button>
      </div>
    </div>
  );
}
