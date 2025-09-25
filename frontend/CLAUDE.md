# Claude AI Assistant Guidelines

This document provides context for Claude AI when working on the BD-Bible Frontend project.

## Project Overview
BD-Bible is a modern React application for Business Development knowledge management, featuring professional landing pages with advanced animations and interactive components.

## Tech Stack
- **React 18.2.0** with functional components and hooks
- **Tailwind CSS 3.x** for utility-first styling
- **Framer Motion** for animations
- **Three.js** with React Three Fiber for 3D graphics
- **TypeScript** support (optional)

## Key Components

### Landing Pages
1. **HeroPage** - Original animated hero landing
2. **ProfessionalLanding** - Full-featured parallax landing page
3. **PropertyShowcase** - Interactive property viewer with video backgrounds

## Development Guidelines

### Component Creation
- Use functional components with hooks
- Implement responsive design with Tailwind classes
- Add animations using Framer Motion
- Follow existing component patterns

### Code Style
- Use ES6+ syntax
- Destructure props
- Keep components modular and reusable
- Comment complex logic

### File Structure
```
src/
├── components/       # Reusable components
├── backups/         # Version backups
├── assets/          # Images, videos, etc.
└── styles/          # Custom CSS files
```

## Common Tasks

### Adding New Landing Page
1. Create component in `src/components/`
2. Import required libraries (motion, parallax, etc.)
3. Use existing components as reference
4. Update App.js to include new component

### Implementing Animations
```javascript
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  Content
</motion.div>
```

### Using Parallax
```javascript
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';

<ParallaxProvider>
  <Parallax speed={-20}>
    <div>Parallax content</div>
  </Parallax>
</ParallaxProvider>
```

### 3D Graphics
```javascript
import { Canvas } from '@react-three/fiber';
import { Box, OrbitControls } from '@react-three/drei';

<Canvas>
  <ambientLight />
  <Box />
  <OrbitControls />
</Canvas>
```

## Performance Considerations
- Lazy load images with react-lazy-load-image-component
- Use React.memo for expensive components
- Implement code splitting with React.lazy
- Optimize animations for 60fps

## Testing Checklist
- [ ] Responsive on mobile/tablet/desktop
- [ ] Animations perform smoothly
- [ ] Images load properly
- [ ] Navigation works correctly
- [ ] Forms validate properly
- [ ] Accessibility standards met

## Available Libraries

### Animation
- framer-motion
- react-spring
- react-parallax
- react-scroll-parallax
- react-intersection-observer

### UI Components
- antd (Ant Design)
- @mui/material (Material-UI)
- react-modal
- react-toastify

### Media
- react-image-gallery
- react-image-zoom
- react-slick (carousels)
- react-lazy-load-image-component

### Data Visualization
- recharts
- chart.js with react-chartjs-2
- plotly.js with react-plotly
- @ant-design/charts

### Maps
- @react-google-maps/api

## Environment Variables
Create `.env.local` for environment-specific configs:
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_GOOGLE_MAPS_KEY=your_key_here
```

## Debugging Tips
1. Check browser console for errors
2. Use React DevTools for component inspection
3. Monitor Network tab for API calls
4. Check responsive design with device emulator

## Common Issues & Solutions

### Port 3000 in use
```bash
lsof -ti :3000 | xargs kill -9
```

### Dependency conflicts
Use compatible versions for React 18:
- @react-three/fiber@8
- @react-three/drei@9

### Build errors
```bash
rm -rf node_modules package-lock.json
npm install
```

## Best Practices
1. Keep components under 200 lines
2. Extract reusable logic to custom hooks
3. Use semantic HTML elements
4. Implement proper error boundaries
5. Add loading states for async operations
6. Use proper TypeScript types (if applicable)
7. Follow accessibility guidelines (ARIA labels, keyboard navigation)

## Deployment Considerations
- Run `npm run build` for production build
- Optimize images before deployment
- Enable gzip compression
- Configure proper caching headers
- Test on multiple browsers

## Resources
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [Three.js](https://threejs.org)