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
    if(formData.name || formData.email || formData.message) validate();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus('submitting');

    try {
      const response = await fetch('https://formspree.io/f/xdalkbod', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `💼 Consulta de Proyecto Web - ${formData.name}`,
          _replyto: formData.email,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleWhatsApp = () => {
    // Don't block if form is partially filled
    const message = encodeURIComponent(
      `Hola Alberto!\n\n` +
      `Me interesa hablar contigo sobre un proyecto web.\n\n` +
      `${formData.message || 'Quisiera más información sobre tus servicios.'}\n\n` +
      `Mis datos:\n` +
      `Nombre: ${formData.name || 'A completar'}\n` +
      `Email: ${formData.email || 'A completar'}\n\n` +
      `¿Podemos tomar un café y hablar del proyecto?`
    );

    const phoneNumber = '34641607924';
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
        ¿Necesitas una página web?
      </h2>
      <p className="text-base-content font-semibold mb-6 leading-relaxed">
        Me adapto a cualquier <strong>presupuesto</strong> y proyecto que tengas en mente.
        Tomamos un café ☕ y hacemos un <strong>estudio personalizado</strong> en base a tus necesidades.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-base-content ml-1">
            Nombre Completo
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={`input w-full bg-base-100/50 focus:ring-2 transition-all backdrop-blur-sm ${errors.name ? 'input-error ring-2 ring-error/50' : 'border-base-content/40 focus:border-primary focus:ring-primary/50'}`}
            placeholder="Ej. Juan Pérez"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            onBlur={handleBlur}
            disabled={status === 'submitting'}
          />
          {errors.name && <span className="text-error text-xs ml-1 animate-pulse" role="alert" aria-live="polite">{errors.name}</span>}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-base-content ml-1">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`input w-full bg-base-100/50 focus:ring-2 transition-all backdrop-blur-sm ${errors.email ? 'input-error ring-2 ring-error/50' : 'border-base-content/40 focus:border-primary focus:ring-primary/50'}`}
            placeholder="tucorreo@ejemplo.com"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            onBlur={handleBlur}
            disabled={status === 'submitting'}
          />
          {errors.email && <span className="text-error text-xs ml-1 animate-pulse" role="alert" aria-live="polite">{errors.email}</span>}
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-base-content ml-1">
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className={`textarea w-full bg-base-100/50 focus:ring-2 transition-all backdrop-blur-sm text-base ${errors.message ? 'textarea-error ring-2 ring-error/50' : 'border-base-content/40 focus:border-primary focus:ring-primary/50'}`}
            placeholder="Ejemplo: Necesito una web para mi negocio de cafetería, con sistema de pedidos online..."
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            onBlur={handleBlur}
            disabled={status === 'submitting'}
          ></textarea>
          {errors.message && <span className="text-error text-xs ml-1 animate-pulse" role="alert" aria-live="polite">{errors.message}</span>}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={status === 'submitting' || status === 'success'}
            className={`btn btn-primary flex-1 text-base font-bold text-white shadow-lg hover:shadow-primary/30 transition-all duration-300 gap-2 h-14 ${status === 'submitting' ? 'loading' : ''}`}
          >
            {/* Gmail Icon */}
            {status === 'idle' && (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.545l8.073-6.052C21.69 2.28 24 3.434 24 5.457z"/>
                </svg>
                Enviar Email
              </>
            )}
            {status === 'submitting' && 'Enviando...'}
            {status === 'success' && '✅ ¡Enviado!'}
            {status === 'error' && '❌ Error'}
          </button>

          <button
            type="button"
            onClick={handleWhatsApp}
            disabled={status === 'submitting'}
            className="btn btn-success flex-1 text-base font-bold text-white shadow-lg hover:shadow-success/30 transition-all duration-300 gap-2 h-14"
          >
            {/* WhatsApp Icon */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            WhatsApp
          </button>
        </div>

        {status === 'success' && (
          <div className="alert alert-success shadow-lg animate-in fade-in slide-in-from-bottom-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span className="font-semibold">¡Gracias! He recibido tu mensaje. Te responderé pronto.</span>
          </div>
        )}

        {status === 'error' && (
          <div className="alert alert-error shadow-lg animate-in fade-in slide-in-from-bottom-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span className="font-semibold">Error al enviar. Por favor, intenta con WhatsApp.</span>
          </div>
        )}

        <p className="text-sm text-center text-base-content font-medium">
          Respondo en menos de 24h · Todos los presupuestos son bienvenidos
        </p>
      </form>
    </div>
  );
}
