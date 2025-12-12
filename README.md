# ✨ AstroTickets

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://astro-tickets.vercel.app)
[![Built with Astro](https://img.shields.io/badge/Built%20with-Astro-FF5D01?style=for-the-badge&logo=astro)](https://astro.build)
[![Styled with Tailwind](https://img.shields.io/badge/Styled%20with-Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)

**Plataforma moderna de venta y gestión de entradas para eventos**, desarrollada con las últimas tecnologías web para ofrecer una experiencia de usuario excepcional priorizando rendimiento, interactividad y accesibilidad.

🌐 **Demo en vivo**: [https://astro-tickets.vercel.app](https://astro-tickets.vercel.app)

## 📋 Cumplimiento del Enunciado

Este proyecto cumple **todos los requisitos** especificados en el enunciado académico:

- ✅ **8 páginas funcionales** (Home, Entradas, Tienda, Dashboard, Comunidad, Ubicación, About, Contacto)
- ✅ **Arquitectura de Islas** con hidratación selectiva
- ✅ **Animaciones GSAP** con ScrollTrigger y efectos parallax
- ✅ **Carrito persistente** con localStorage y checkout funcional
- ✅ **Sistema de temas** con soporte dark/light mode
- ✅ **Mapa interactivo** con React-Leaflet
- ✅ **Dashboard administrativo** con gráficos en tiempo real
- ✅ **Consumo de API externa** en página de comunidad
- ✅ **Formularios con validación** personalizada
- ✅ **100% Responsive** en todos los dispositivos

## 🛠️ Stack Tecnológico

### Core Framework
- **Astro 5.16** - Framework MPA que envía cero JavaScript por defecto, permitiendo páginas ultra-rápidas mientras ofrece la flexibilidad de añadir interactividad donde sea necesaria mediante su arquitectura de Islas.

### Estilos
- **Tailwind CSS 4** - Enfoque "CSS-first" que permite desarrollo rápido con utilidades de bajo nivel, garantizando diseño responsive y consistente sin CSS innecesario.
- **DaisyUI 5** - Componentes UI prediseñados que aceleran el desarrollo sin sacrificar personalización, facilitando la implementación de temas.

### Interactividad
- **React** - Utilizado estratégicamente para hidratar componentes interactivos (`client:*`) y manejar estado complejo (carrito, dashboard).
- **Nano Stores** - Gestión de estado minimalista y reactiva, ideal para compartir estado entre islas sin la complejidad de soluciones más pesadas.

### Animaciones & UX
- **GSAP + ScrollTrigger** - Estándar de la industria para animaciones de alto rendimiento, permitiendo efectos parallax y scroll-driven sin afectar el rendimiento.
- **Lenis** - Scroll suave que mejora drásticamente la experiencia de navegación.

### Funcionalidades Avanzadas
- **React-Leaflet** - Mapas interactivos con interfaz declarativa y basada en componentes.
- **Recharts** - Gráficos interactivos construidos con React y D3 para el dashboard administrativo.
- **SweetAlert2** - Modales elegantes para confirmaciones de compra.
- **Canvas Confetti** - Efectos de celebración para mejorar la experiencia del usuario.

## 🚀 Instalación y Ejecución

```bash
# Clonar repositorio
git clone https://github.com/albertoguinda/astro-tickets.git
cd astro-tickets

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
# La app estará disponible en http://localhost:4321

# Generar build de producción
npm run build
```

## 📁 Estructura del Proyecto

```
astro-tickets/
├── src/
│   ├── components/
│   │   ├── islands/      # Componentes React interactivos
│   │   ├── layout/       # Navbar, Footer
│   │   └── ui/           # Componentes reutilizables
│   ├── pages/            # 8 páginas de la aplicación
│   ├── store/            # Estado global (Nano Stores)
│   └── styles/           # Estilos globales y temas
├── public/               # Archivos estáticos
└── astro.config.mjs
```

## ✨ Características Destacadas

- 🛒 **Smart Cart** - Persistencia en localStorage con animaciones confetti y SweetAlert
- 🎨 **Multi-Theme** - 4 temas disponibles (Light, Winter, Lemonade, Cyberpunk)
- ⚡ **Optimizado** - Arquitectura de Islas con carga selectiva de JavaScript
- 🗺️ **Mapa Interactivo** - Visualización de ubicaciones de eventos
- 📊 **Admin Dashboard** - Panel de control con métricas y gráficos
- 🎭 **Animaciones Fluidas** - GSAP con efectos parallax y smooth scroll

---

<div align="center">
  <p><strong>Desarrollado con ❤️ usando Astro 5, Tailwind CSS 4 y React</strong></p>
  <p><em>Alberto Guinda Sevilla - 2025</em></p>
</div>
