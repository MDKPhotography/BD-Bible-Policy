# BD-Bible Frontend

A modern React application for Business Development knowledge management with professional landing pages and interactive components.

## 🚀 Quick Start

```bash
npm install
npm start
```

Visit http://localhost:3000 to view the application.

## 📦 Installed Packages

### Core Dependencies
- React 18.2.0
- React DOM 18.2.0
- React Scripts 5.0.1
- React Router DOM 6.20.1

### UI Libraries
- **Ant Design** (antd): Component library
- **Material-UI** (@mui/material): Material Design components
- **Tailwind CSS 3.x**: Utility-first CSS framework
- **Styled Components**: CSS-in-JS styling

### Animation & Effects
- **Framer Motion**: Advanced animations
- **React Spring**: Spring-physics animations
- **React Parallax**: Parallax scrolling effects
- **React Scroll Parallax**: Scroll-based animations
- **React Intersection Observer**: Viewport detection
- **React Transition Group**: Page transitions

### 3D Graphics
- **Three.js**: 3D graphics library
- **@react-three/fiber**: React renderer for Three.js
- **@react-three/drei**: Helper components for Three.js

### Data Visualization
- **Recharts**: Chart library
- **Chart.js + React ChartJS 2**: Chart components
- **@ant-design/charts**: Ant Design charts
- **Plotly.js + React Plotly**: Interactive plots

### Media & Images
- **React Image Gallery**: Image galleries
- **React Image Zoom**: Image zoom functionality
- **React Lazy Load Image Component**: Lazy loading
- **React Slick + Slick Carousel**: Carousel/sliders
- **React Modal**: Modal dialogs

### Maps
- **@react-google-maps/api**: Google Maps integration

### Other Utilities
- **React Toastify**: Toast notifications
- **React Typed**: Typing animations
- **React CountUp**: Number animations

## 🎨 Available Components

### Landing Pages
1. **HeroPage** (`src/HeroPage.js`)
   - Original hero landing page with animations

2. **ProfessionalLanding** (`src/components/ProfessionalLanding.js`)
   - Full-featured landing with parallax scrolling
   - Animated navigation bar
   - Feature cards with hover effects
   - Interactive floor plans
   - Image gallery

3. **PropertyShowcase** (`src/components/PropertyShowcase.js`)
   - Interactive property viewer
   - Video background hero
   - Floor selector with availability
   - 2D/3D view toggle

## 🔄 Component Usage

In `src/App.js`, you can switch between components:

```javascript
import HeroPage from './HeroPage';
import ProfessionalLanding from './components/ProfessionalLanding';
import PropertyShowcase from './components/PropertyShowcase';

// Toggle showHero to switch views
const showHero = true; // Set to false for BD Bible app

// Or directly use specific components
<ProfessionalLanding />
<PropertyShowcase />
```

## 🛠️ Development Workflow

### Backup System
```bash
# Backup current component
./src/backups/backup-hero.sh "description"

# Restore previous version
./src/backups/restore-hero.sh
```

### Custom Styles
Custom scrollbar and smooth scrolling are configured in `src/index.css`.

## 📁 Project Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── ProfessionalLanding.js
│   │   └── PropertyShowcase.js
│   ├── backups/
│   │   ├── hero-versions/
│   │   ├── backup-hero.sh
│   │   └── restore-hero.sh
│   ├── HeroPage.js
│   ├── App.js
│   └── index.css
├── package.json
└── README.md
```

## 🚨 Common Issues

### Port 3000 Already in Use
```bash
lsof -ti :3000 | xargs kill -9
npm start
```

### Dependency Conflicts
Many packages have React 19 peer dependencies. We're using React 18 compatible versions.

## 📝 Scripts

- `npm start`: Start development server
- `npm run build`: Build for production
- `npm test`: Run tests (if configured)

## 🔗 Resources

- [React Documentation](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Three.js](https://threejs.org/)

## 📄 License

Private project - all rights reserved.