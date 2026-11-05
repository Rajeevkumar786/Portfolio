# Modern 3D Developer Portfolio — Rajeev Kumar

An award-winning, interactive **3D Developer Portfolio** engineered with **React 19**, **TypeScript**, **Three.js / React Three Fiber**, **GSAP ScrollTrigger**, **Lenis Smooth Scroll**, and **Tailwind CSS**.

![React](https://img.shields.io/badge/React-19.x-61dafb?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Three.js](https://img.shields.io/badge/Three.js-R3F-black?logo=three.js)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite)

---

## 🌟 Key Features

- **Cinematic 3D Engine:** Single continuous WebGL Canvas running procedural particle drift, gyroscope orbital rings, and dynamic camera choreography synced to active sections.
- **3D Skills Constellation:** Interactive Fibonacci spherical constellation with laser connections, glowing technology nodes, and a real-time node inspection panel.
- **Project Showcase (35+ Repositories):** Filterable gallery with categories for *Full Stack & MERN*, *Python & Computer Vision*, *Extensions & Utilities*, and *Interactive UI & Games*.
- **Adaptive Performance Modes:** Automatic device detection (High / Balanced / Performance) with live manual toggle via Command Palette.
- **Command Palette (`Ctrl + K` / `Cmd + K`):** Keyboard-accessible quick navigation, performance switcher, reduced-motion toggle, and resume PDF actions.
- **Lenis Smooth Scroll + GSAP ScrollTrigger:** Cinematic scroll continuity with zero frame jitter.
- **WebGL Fallback Engine:** Graceful `WebGLErrorBoundary` automatically degrading to an ambient CSS mesh background on restricted devices without breaking UI functionality.
- **Context-Aware Custom Cursor:** Magnetic hover pull with action labels (`VIEW`, `SKILL`).

---

## 🛠️ Technology Stack

| Domain | Technology |
| :--- | :--- |
| **Frontend Core** | React 19, TypeScript, Vite, React Router DOM, Tailwind CSS v4 |
| **3D & WebGL** | Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`), Postprocessing |
| **Animation** | GSAP, GSAP ScrollTrigger, Lenis, Framer Motion |
| **State Management** | Zustand |
| **Icons & UI** | Lucide React, Radix UI Primitives, Class Variance Authority, Tailwind Merge |

---

## 📁 Architecture Overview

```text
src/
├── app/                  # Application root & code-split lazy routes
├── components/
│   ├── 3d/               # Three.js canvas scenes (Hero, Skills, Particles, Postprocessing)
│   ├── layout/           # Navbar, Footer, PageContainer with Lenis wrapper
│   ├── project/          # ProjectCard, ProjectModal, ProjectGallery
│   ├── sections/         # Hero, About, Skills, Experience, Projects, Education, Achievements, Contact
│   └── ui/               # MagneticButton, TiltCard, GlassCard, CustomCursor, CommandPalette
├── data/
│   └── portfolio.ts      # Single source of truth (resume + 35+ GitHub repos)
├── hooks/                # useMousePosition, useScrollProgress, usePerformanceMode, useReducedMotion
├── lib/                  # Animation curves, performance calculations, utility helpers
├── store/                # Zustand global store
└── styles/               # Tailwind CSS tokens & glassmorphic styling
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` or `pnpm`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Rajeevkumar786/Portfolio.git
   cd Portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```text
   http://localhost:5173
   ```

### Building for Production

```bash
npm run build
npm run preview
```

---

## 👤 Author

**Rajeev Kumar**
- **GitHub:** [@Rajeevkumar786](https://github.com/Rajeevkumar786)
- **Email:** [kumarprincekumar403@gmail.com](mailto:kumarprincekumar403@gmail.com)
- **Education:** B.Tech in Computer Science & Engineering (2023 - Present) — United Institute of Technology
