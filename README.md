# VedaVid - Digital Platform for Veda Adhyayana

VedaVid is a modern web application designed to facilitate the study of Vedic texts, starting with the complete Taittiriya Sakha corpus.

## Features

- **Samhita Texts**: View both Padam (word-by-word) and Samhita (continuous) recitations
- **Brahmana Texts**: Prose explanations and ritual instructions  
- **Aranyaka Texts**: Philosophical and mystical forest texts
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Flexible Data Sources**: Configurable to work with local files, remote APIs, or CDNs
- **Sanskrit Typography**: Optimized for Sanskrit text display with appropriate fonts

## Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Setup Data Source

You have several options for setting up the data:

#### Option A: Local Data Directory (Recommended for Development)
```bash
# Create a symlink to your data repository
mkdir -p public
ln -sf /path/to/your/data/repository public/data
```

#### Option B: Copy Data Files
```bash
# Copy the data directory to public folder
cp -r /path/to/data public/data
```

#### Option C: Remote Data Source
Edit `src/config/dataConfig.ts` to point to a remote URL:

```typescript
export const dataConfig: DataSourceConfig = {
  type: 'remote',
  baseUrl: 'https://your-cdn-or-api.com',
  endpoints: {
    corpus: '/taittiriya/web_complete/taittiriya_complete_corpus.json',
    samhita: '/taittiriya/web_enhanced/chapters',
    brahmana: '/taittiriya/web_brahmana_aranyaka/brahmana',
    aranyaka: '/taittiriya/web_brahmana_aranyaka/aranyaka'
  }
}
```

### 3. Run Development Server

```bash
pnpm run dev
```

The app will be available at:
- **Desktop**: [http://localhost:3000](http://localhost:3000)
- **Mobile**: Use the Network URL shown in terminal (e.g., `http://192.168.1.x:3000`)

## Mobile Usage

VedaVid is designed as a **mobile-first Single Page Application (SPA)** optimized for Sanskrit study on phones:

- **Touch-optimized interface** with larger tap targets
- **Responsive Sanskrit typography** that scales with screen size  
- **Sticky navigation** for easy access while scrolling
- **Mobile-friendly verse layout** with collapsible sections
- **Offline-capable** when built and served statically

### Mobile Development

To test on your phone during development:

1. Ensure your phone and computer are on the same network
2. Run `pnpm run dev` 
3. Use the Network URL from the terminal output on your phone
4. For HTTPS (required for some mobile features), use a tunnel service like ngrok

## Project Structure

```
vedavid/
├── src/
│   ├── components/          # Reusable Vue components
│   │   ├── VedaNavigation.vue
│   │   ├── SamhitaVerse.vue
│   │   ├── BrahmanaSection.vue
│   │   └── ChapterSelector.vue
│   ├── views/              # Page components
│   │   ├── HomeView.vue
│   │   ├── SamhitaView.vue
│   │   ├── BrahmanaView.vue
│   │   └── AranyakaView.vue
│   ├── stores/             # Pinia state management
│   │   └── vedaStore.ts
│   ├── services/           # API and data services
│   │   └── vedaService.ts
│   ├── types/              # TypeScript type definitions
│   │   └── veda.ts
│   ├── config/             # Configuration files
│   │   └── dataConfig.ts
│   └── router/             # Vue Router configuration
│       └── index.ts
├── public/                 # Static assets
│   └── data/              # Data files (symlinked or copied)
└── dist/                  # Built application
```

## Data Structure

VedaVid is designed to work with the standardized Vedic text format:

- **Samhita**: JSON files with verse objects containing `padam` and `samhita` fields
- **Brahmana/Aranyaka**: JSON files with section objects containing prose text
- **Metadata**: Corpus-level information and statistics

The app is flexible enough to adapt to different Veda structures in the future by updating the type definitions and data configuration.

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Development Commands

- `pnpm run dev` - Start development server with mobile network access
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build with mobile network access
- `pnpm run lint` - Run ESLint
- `pnpm run type-check` - Run TypeScript type checking
- `pnpm run setup` - Run data setup script

## Technology Stack

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool
- **Pinia** - State management
- **Vue Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Headless UI** - Unstyled accessible UI components

## Contributing

VedaVid is designed to be extensible for other Vedic traditions. The modular architecture allows for:

- Adding new text types
- Supporting different data formats  
- Implementing search and annotation features
- Integrating with external APIs

## License

[Add your license information here]