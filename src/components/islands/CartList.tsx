import React from 'react';
import { useStore } from '@nanostores/react';
import { cartItems, removeCartItem, addCartItem, clearCart, $totalPrice } from '../../store/cart';
import Swal from 'sweetalert2';
import confetti from 'canvas-confetti';

export default function CartList() {
  const $cartItems = useStore(cartItems);
  const totalPrice = useStore($totalPrice);
  const items = Object.values($cartItems).filter(Boolean);

  const handleCheckout = async () => {
    // Lanzar confetti ESPECTACULAR
    const duration = 4 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 45,
      spread: 360,
      ticks: 100,
      zIndex: 99999,
      scalar: 1.2,
      drift: 0
    };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    // Explosión inicial grande
    confetti({
      particleCount: 150,
      spread: 180,
      origin: { y: 0.6 },
      colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'],
      zIndex: 99999
    });

    // Confetti continuo desde los lados
    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 80;

      // Desde la izquierda
      confetti({
        ...defaults,
        particleCount,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ['#ff0000', '#ffd700', '#ff69b4', '#00ff00', '#00ffff', '#ff1493']
      });

      // Desde la derecha
      confetti({
        ...defaults,
        particleCount,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ['#ff0000', '#ffd700', '#ff69b4', '#00ff00', '#00ffff', '#ff1493']
      });

      // Desde arriba
      confetti({
        ...defaults,
        particleCount: particleCount / 2,
        origin: { x: randomInRange(0.3, 0.7), y: 0 },
        colors: ['#ff0000', '#ffd700', '#ff69b4', '#00ff00', '#00ffff', '#ff1493']
      });
    }, 200);

    // Mostrar SweetAlert con backdrop blur
    await Swal.fire({
      title: '¡Compra Realizada!',
      html: `
        <div style="padding: 1rem;">
          <p style="font-size: 1.125rem; margin-bottom: 1rem;">Tu pedido ha sido procesado exitosamente.</p>
          <p style="font-size: 1.875rem; font-weight: bold; margin-top: 1rem;">Total: ${totalPrice.toFixed(2)}€</p>
        </div>
      `,
      icon: 'success',
      confirmButtonText: 'Continuar',
      width: '32rem',
      padding: '2rem',
      backdrop: `
        rgba(0,0,0,0.6)
        left top
        no-repeat
      `,
      customClass: {
        popup: 'swal2-custom-popup',
        title: 'swal2-custom-title',
        confirmButton: 'swal2-custom-button',
        htmlContainer: 'swal2-custom-html'
      }
    });

    // Limpiar carrito
    clearCart();
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center p-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-base-content"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
        <p className="text-lg font-medium">Tu carrito está vacío</p>
        <p className="text-sm">¡Añade entradas o merch para empezar!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 p-2 max-h-[60vh] overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 p-3 bg-base-100/50 hover:bg-base-100 rounded-xl border border-base-content/30 transition-all duration-200 group">
            {/* Image */}
            <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden relative">
              <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Content */}
            <div className="flex-grow flex flex-col justify-between">
              <div className="flex justify-between items-start">
                  <h3 className="font-bold text-sm line-clamp-2 leading-tight">{item.name}</h3>
                  <button
                      onClick={() => removeCartItem(item.id)}
                      className="text-error hover:text-error transition-colors p-1 cursor-pointer"
                      aria-label="Eliminar"
                  >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                  </button>
              </div>

              <div className="flex justify-between items-end mt-2">
                  <div className="flex items-center gap-2 bg-base-200 rounded-lg p-1">
                      <button
                          onClick={() => removeCartItem(item.id)}
                          className="btn btn-sm btn-ghost btn-square min-w-11 min-h-11 cursor-pointer"
                          aria-label="Disminuir cantidad"
                      >-</button>
                      <span className="text-sm font-bold min-w-8 text-center">{item.quantity}</span>
                      <button
                          onClick={() => addCartItem(item)}
                          className="btn btn-sm btn-ghost btn-square min-w-11 min-h-11 cursor-pointer"
                          aria-label="Aumentar cantidad"
                      >+</button>
                  </div>
                  <div className="font-bold text-primary">
                      {(item.price * item.quantity).toFixed(2)}€
                  </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total y Botón de Finalizar Compra */}
      <div className="border-t border-base-content/30 pt-4 px-2 space-y-3">
        <div className="flex justify-between items-center text-lg font-bold">
          <span>Total:</span>
          <span className="text-primary text-2xl">{totalPrice.toFixed(2)}€</span>
        </div>
        <button
          onClick={handleCheckout}
          className="btn btn-primary btn-block text-lg font-bold hover:scale-[1.02] transition-transform"
        >
          Finalizar Compra
        </button>
      </div>
    </div>
  );
}
