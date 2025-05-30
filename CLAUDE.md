# CLAUDE.md

This file provides guidance to Claude Code when working with the VedaVid application.

## Project Overview

VedaVid is a mobile-first Vue.js Single Page Application (SPA) designed for Veda Adhyayana (Vedic study). It provides access to digitized Sanskrit texts from the Taittiriya Sakha, including Samhita, Brahmana, and Aranyaka texts.

## Architecture

### Technology Stack
- **Vue 3** with Composition API and TypeScript
- **Pinia** for state management  
- **Vue Router** for navigation
- **Tailwind CSS** for styling
- **Vite** for build tooling
- **Mobile-first responsive design**

### Key Design Principles
- **Mobile-first**: Optimized for phone usage with touch targets and responsive typography
- **Modular**: Flexible architecture to support future Veda traditions
- **Performance**: Lazy loading and efficient data fetching
- **Accessibility**: Proper semantic HTML and keyboard navigation

## Transliteration System

### Architecture
VedaVid uses a two-tier transliteration system:
- **FastAPI Server**: Local Vidyut-lipi server for high-quality Sanskrit transliteration
- **Frontend Service**: Caching layer with graceful fallbacks

### Supported Scripts
- **Devanagari** (देवनागरी) - Primary display script
- **IAST** - International standard romanization  
- **Harvard-Kyoto** - Academic transliteration
- **Baraha** - Source script for most texts
- **Regional Scripts**: Tamil, Telugu, Kannada, Malayalam, Gujarati
- **Technical**: ITRANS, SLP1, Velthuis, WX

### Usage
1. Start transliteration server: `pnpm run transliteration-server`
2. Select scripts from the dropdown in navigation
3. Text automatically transliterates with caching for performance

## Data Integration

### Data Sources
The app uses a configurable data service (`src/services/vedaService.ts`) that can work with:
- Local files (symlinked to `public/data/`)
- Remote CDN/API endpoints
- Configuration via `src/config/dataConfig.ts`

### Data Structure
- **Samhita**: Verses with both `padam` (word-by-word) and `samhita` (continuous) formats
- **Brahmana/Aranyaka**: Prose sections with metadata
- **Flexible schema** to accommodate different Vedic traditions

## Development Workflow

### Setup Commands
```bash
pnpm install          # Install dependencies
pnpm run setup       # Setup data symlink (runs ./scripts/setup-data.sh)
```

### Development Server
VedaVid requires two servers for full functionality:

**Terminal 1 - Transliteration Server:**
```bash
pnpm run transliteration-server  # FastAPI server on http://localhost:5001
```

**Terminal 2 - Frontend Server:**
```bash
pnpm run dev         # Vite dev server with mobile network access
```

### Testing
- **Desktop**: http://localhost:3000
- **Mobile**: Use Network URL from terminal output (e.g., http://192.168.1.x:3000)
- **API Docs**: http://localhost:5001/docs (transliteration server documentation)
- Test on actual mobile devices for touch interactions and typography

### Build Commands
```bash
pnpm run type-check  # TypeScript validation
pnpm run lint        # ESLint validation  
pnpm run build       # Production build
pnpm run preview     # Preview build with mobile access
```

## File Structure

```
├── server/
│   └── transliteration-server.py    # FastAPI server with Vidyut-lipi
├── scripts/
│   ├── setup-data.sh                # Data symlink setup
│   ├── generate-transliterations.sh # Static transliteration generation
│   └── start-transliteration-server.sh # Server startup script
├── src/
│   ├── components/          # Reusable Vue components
│   │   ├── VedaNavigation.vue    # Main navigation with mobile menu
│   │   ├── SamhitaVerse.vue      # Verse display component
│   │   ├── BrahmanaSection.vue   # Prose section component
│   │   ├── ScriptSelector.vue    # Script selection dropdown
│   │   └── ChapterSelector.vue   # Chapter/book selection
│   ├── views/              # Page-level components
│   │   ├── HomeView.vue         # Landing page with corpus overview
│   │   ├── SamhitaView.vue      # Samhita text browser
│   │   ├── BrahmanaView.vue     # Brahmana text browser
│   │   └── AranyakaView.vue     # Aranyaka text browser
│   ├── stores/             # Pinia state management
│   │   └── vedaStore.ts         # Main application state
│   ├── services/           # Data and transliteration services
│   │   ├── vedaService.ts       # API abstraction layer
│   │   └── transliterationService.ts # Transliteration service
│   ├── types/              # TypeScript definitions
│   │   └── veda.ts             # Core data types
│   ├── config/             # Configuration
│   │   └── dataConfig.ts       # Data source configuration
│   └── router/             # Vue Router setup
│       └── index.ts
└── public/data/taittiriya/
    └── transliteration-env/ # Python virtual environment for Vidyut
```

## Mobile Optimizations

### CSS Classes
- `.touch-target` - Ensures 44px minimum touch target size
- `.verse-text` - Responsive Sanskrit typography with clamp()
- `.sanskrit-text` - Base Sanskrit text styling

### Responsive Breakpoints
- `sm:` 640px+ (small tablets)
- `md:` 768px+ (tablets) 
- `lg:` 1024px+ (desktop)

### Mobile Features
- Sticky navigation header
- Collapsible mobile menu
- Responsive font scaling
- Touch-optimized interactions
- Mobile-first component layouts

## Extending the App

### Adding New Veda Traditions
1. Update type definitions in `src/types/veda.ts`
2. Extend data service in `src/services/vedaService.ts`
3. Add new view components following existing patterns
4. Update router configuration

### Adding Features
- Search functionality
- Bookmarking/favorites
- Audio recitation integration
- Commentary layers
- Cross-references

## Data Dependencies

The app expects data to be available at `/data/` (configured in `dataConfig.ts`):
- Symlink: `public/data -> ../data` (development)
- Copy: `public/data/` (production deployment)
- Remote: Configure `VITE_DATA_BASE_URL` environment variable

## Performance Considerations

- Lazy load large text files
- Use virtual scrolling for long chapter lists
- Optimize Sanskrit font loading
- Minimize bundle size with tree shaking
- Consider service worker for offline functionality