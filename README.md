# VLIMA Visuals - Propuesta de Servicios Audiovisuales

Sitio web profesional para presentar la propuesta de servicios audiovisuales para VLIMA Córdoba (Valeria Lynch Instituto Musical Artístico).

## 🎭 Proyecto

Visuales para la Obra de Teatro Musical **"La ley se viste de rosa"** (adaptación de "Legalmente Rubia").

## 🚀 Tecnologías

- **React 19** + **TypeScript**
- **Vite** - Build tool
- **TailwindCSS v4** - Estilos
- **Three.js** - Efectos de fondo interactivos (Liquid Ether)
- **Framer Motion** - Animaciones
- **GSAP** - Animaciones del menú

## ✨ Características

- ✨ Background interactivo con efecto Liquid Ether
- 🎨 Diseño moderno y profesional (blanco sobre negro)
- 📱 Totalmente responsive
- 🎯 Navegación con sidebar animado
- 💫 Efectos de hover en las cards (Glare Hover)
- 📄 Botón de descarga de PDF del presupuesto
- 🎭 Animaciones suaves y transiciones

## 📦 Instalación

```bash
npm install
```

## 🛠️ Desarrollo

```bash
npm run dev
```

## 🏗️ Build para Producción

```bash
npm run build
```

## 🌐 Deployment

Este proyecto está configurado para deployment en **Vercel**.

### Configuración de Vercel

El proyecto incluye un archivo `vercel.json` con la configuración necesaria. Vercel detectará automáticamente:

- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

### Pasos para Deployment

1. Conecta tu repositorio de GitHub a Vercel
2. Vercel detectará automáticamente la configuración
3. El deployment se realizará automáticamente en cada push a la rama principal

## 📝 Estructura del Proyecto

```
├── public/
│   ├── Mapping La ley se viste de rosa presupuesto.pdf
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Hero.tsx
│   │   ├── Sidebar.tsx
│   │   ├── SectionCard.tsx
│   │   ├── LiquidEtherBackground.tsx
│   │   └── ...
│   ├── data/
│   │   └── proposalData.ts
│   └── ...
└── vercel.json
```

## 👨‍💻 Autor

**Stefan Miranda González**

- 📧 Email: stefan.migo@gmail.com
- 📱 Teléfono: +54 9 2972542298

## 📄 Licencia

Este proyecto es privado y está destinado exclusivamente para VLIMA Córdoba.
