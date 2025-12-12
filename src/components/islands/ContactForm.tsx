import React, { useState } from 'react';

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const validate = (): boolean => {
    const newErrors: Errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (formData.name.trim().length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres.';
    }
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Por favor, introduce un correo electrónico válido.';
    }
    if (formData.message.trim().length < 10) {
      newErrors.message = 'El mensaje es demasiado corto (mínimo 10 caracteres).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = () => {
    // Validate on blur for better UX
    if(formData.name || formData.email || formData.message) validate();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
        Envíanos un mensaje
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-base-content/80 ml-1">
            Nombre Completo
          </label>
          <input
            type="text"
            id="name"
            className={`input w-full bg-base-100/50 focus:ring-2 transition-all backdrop-blur-sm ${errors.name ? 'input-error ring-2 ring-error/20' : 'border-base-content/20 focus:border-primary focus:ring-primary/20'}`}
            placeholder="Ej. Juan Pérez"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            onBlur={handleBlur}
          />
          {errors.name && <span className="text-error text-xs ml-1 animate-pulse">{errors.name}</span>}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-base-content/80 ml-1">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            className={`input w-full bg-base-100/50 focus:ring-2 transition-all backdrop-blur-sm ${errors.email ? 'input-error ring-2 ring-error/20' : 'border-base-content/20 focus:border-primary focus:ring-primary/20'}`}
            placeholder="tucorreo@ejemplo.com"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            onBlur={handleBlur}
          />
          {errors.email && <span className="text-error text-xs ml-1 animate-pulse">{errors.email}</span>}
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-base-content/80 ml-1">
            Mensaje
          </label>
          <textarea
            id="message"
            rows={4}
            className={`textarea w-full bg-base-100/50 focus:ring-2 transition-all backdrop-blur-sm text-base ${errors.message ? 'textarea-error ring-2 ring-error/20' : 'border-base-content/20 focus:border-primary focus:ring-primary/20'}`}
            placeholder="¿En qué podemos ayudarte?"
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            onBlur={handleBlur}
          ></textarea>
          {errors.message && <span className="text-error text-xs ml-1 animate-pulse">{errors.message}</span>}
        </div>

        <button
          type="submit"
          disabled={status === 'submitting' || status === 'success'}
          className={`btn btn-primary btn-block text-lg shadow-lg hover:shadow-primary/30 transition-all duration-300 ${status === 'submitting' ? 'loading' : ''}`}
        >
          {status === 'idle' && 'Enviar Mensaje'}
          {status === 'submitting' && 'Enviando...'}
          {status === 'success' && '¡Mensaje Enviado!'}
        </button>

        {status === 'success' && (
          <div className="alert alert-success shadow-lg animate-in fade-in slide-in-from-bottom-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>¡Gracias! Nos pondremos en contacto contigo pronto.</span>
          </div>
        )}
      </form>
    </div>
  );
}