# Noodules Architecture

## Overview

Noodules is a full-stack educational platform designed for cross-platform deployment (Web, Mobile, Desktop). The MVP focuses on web implementation with a modular architecture that enables seamless expansion to other platforms.

## Technology Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **UI**: Shadcn/UI + Tailwind CSS
- **3D Rendering**: React Three Fiber + Three.js
- **Data Fetching**: SWR for client-side state
- **State Management**: React Context + Hooks

### Backend (Ready for Implementation)
- **Authentication**: Email/OAuth (Supabase recommended)
- **Database**: PostgreSQL (Supabase/Neon)
- **Real-time**: WebSockets for live collaboration
- **Offline Sync**: Service Workers + IndexedDB

## Architecture Layers

### 1. **Presentation Layer** (`/app`, `/components`)
- Landing page (`/app/page.tsx`)
- Authentication flows (`/app/auth/*`)
- Dashboard system (`/app/dashboard/*`)
- Responsive UI for all screen sizes

### 2. **3D Rendering Layer** (`/components/viewer`)
- `ParasiteViewer`: Main 3D canvas
- `RoundwormModel`, `TapewormModel`, `HookwormModel`: Procedural models
- Interactive controls: Rotate, Zoom, Pan
- Auto-rotate and inspection features

### 3. **Learning Features Layer** (`/app/dashboard`)
- **Flashcards** (`/flashcards`): Spaced repetition system
- **Quizzes** (`/quizzes`): Immediate feedback mechanism
- **3D Viewer** (`/viewer`): Model exploration
- **Analytics** (`/analytics`): Progress tracking with charts

### 4. **Collaboration Layer** (`/app/dashboard`)
- **Forums** (`/forums`): Discussion boards
- **Study Groups** (`/study-groups`): Real-time group study
- **Forum Threads** (`/components/forums`): Threaded discussions

### 5. **Offline & Sync Layer** (`/hooks`, `/public`)
- **Service Worker** (`/public/service-worker.js`): Caching strategy
- **Offline Storage** (`/hooks/use-offline-storage.ts`): Local persistence
- **Multi-tab Sync** (`/hooks/use-multi-tab-sync.ts`): Cross-tab communication

## Key Features

### Core MVP
✅ Interactive 3D parasite models
✅ Flashcard system
✅ Quiz engine with scoring
✅ Progress tracking & analytics
✅ Forums & study groups
✅ Offline capability
✅ Multi-tab synchronization

### Future Enhancements
- Real-time collaboration (like Figma)
- Dockable/resizable panels
- Multiple tab support for simultaneous features
- VR/AR integration
- AI-powered study assistant
- Gamification (badges, leaderboards)

## File Structure

```
/app
  /auth                 # Authentication pages
  /dashboard            # Main dashboard
    /viewer            # 3D viewer page
    /flashcards        # Flashcard system
    /quizzes           # Quiz system
    /analytics         # Progress analytics
    /study-groups      # Study group management
    /forums            # Forum discussions
    /settings          # User settings
  layout.tsx
  page.tsx             # Landing page
  globals.css          # Global styles

/components
  /ui                  # Shadcn UI components
  /dashboard           # Dashboard layout components
  /viewer              # 3D viewer components
  /learning            # Learning feature components
  /forums              # Forum components
  offline-status.tsx   # Offline indicator
  service-worker-init.tsx

/hooks
  use-offline-storage.ts    # Offline data persistence
  use-multi-tab-sync.ts     # Cross-tab communication

/public
  /fonts               # Custom fonts
  offline.html         # Offline fallback
  service-worker.js    # Service worker script

/lib
  utils.ts             # Utility functions
```

## Data Flow

### Learning Flow
1. User views 3D model (ParasiteViewer)
2. Selects learning material
3. Studies flashcards (spaced repetition)
4. Takes quizzes (immediate feedback)
5. Tracks progress (Analytics page)
6. Syncs across tabs (useMultiTabSync)

### Collaboration Flow
1. User creates forum post
2. Other users reply (threaded)
3. Real-time updates via polling/WebSockets (future)
4. Study group sessions (scheduled)
5. Live cursors & co-editing (premium feature)

### Offline Flow
1. Service Worker caches pages
2. useOfflineStorage saves data locally
3. Changes queued for sync
4. When online, automatic sync to server
5. useMultiTabSync broadcasts updates

## Responsive Design

- **Mobile** (< 640px): Single column, touch-optimized
- **Tablet** (640px - 1024px): Two columns, adaptive
- **Desktop** (> 1024px): Full layout with sidebars

All components use Tailwind's `md:` and `lg:` prefixes for responsive behavior.

## Performance Optimization

- Server-side rendering for initial load
- Image optimization (next/image)
- Code splitting via dynamic imports
- Service worker caching
- SWR for deduplication & revalidation
- Canvas rendering optimization (3D)

## Security Considerations

- HTTPS enforcement
- Secure session management (HTTP-only cookies)
- Input validation & sanitization
- CSRF protection
- Rate limiting (future)
- Row-level security on database

## Deployment

### Current
- Web: Vercel (Next.js optimized)
- Database: Supabase/Neon
- Storage: Vercel Blob for media

### Future
- Mobile: React Native/Expo
- Desktop: Electron or Tauri
- Shared components via monorepo

## Next Steps for Full Implementation

1. **Backend Setup**
   - Create authentication system (Supabase Auth)
   - Design database schema
   - Build REST/GraphQL API

2. **Database Schema**
   - Users table
   - Parasites & modules
   - Flashcards & quizzes
   - Forum posts & replies
   - Progress tracking
   - Offline sync queue

3. **API Endpoints**
   - `/api/auth/*` - Authentication
   - `/api/parasites` - Parasite data
   - `/api/progress` - User progress
   - `/api/forums` - Forum operations
   - `/api/sync` - Offline sync

4. **Real-time Features**
   - WebSocket connection for live updates
   - BroadcastChannel for multi-tab sync
   - Offline queue management

5. **Mobile/Desktop**
   - Convert web components to React Native
   - Build native app shells
   - Optimize for touch & keyboard input

## Contributing

- Follow the existing component structure
- Use Tailwind CSS for styling
- Maintain responsive design patterns
- Write meaningful commit messages
- Test across browsers and devices
