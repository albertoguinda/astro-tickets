import React, { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { $totalItems } from '../../store/cart';

export default function NavbarCart() {
  const count = useStore($totalItems);
  const [pulse, setPulse] = useState(false);

  // Efecto de pulso cuando se añade un item
  useEffect(() => {
    if (count > 0) {
      setPulse(true);
      const timer = setTimeout(() => setPulse(false), 600);
      return () => clearTimeout(timer);
    }
  }, [count]);

  return (
    <div className="flex-none">
      <div className="dropdown dropdown-end">
        <a 
          href="/merch" 
          tabIndex={0} 
          role="button" 
          className={`btn btn-ghost btn-circle transition-all duration-300 ${pulse ? 'scale-125' : 'scale-100'}`}
          aria-label="Ver carrito de compras"
        >
          <div className="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {count > 0 && (
              <span className={`badge badge-sm indicator-item badge-primary ${pulse ? 'animate-ping' : ''}`}>
                {count}
                <span className="sr-only">{count} {count === 1 ? 'artículo' : 'artículos'} en el carrito</span>
              </span>
            )}
          </div>
        </a>
      </div>
    </div>
  );
}