# Noodules Implementation Guide

## Getting Started

### 1. Installation

```bash
# Clone or download the project
cd noodules

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Running the Application

### Development
```bash
npm run dev
```
The app runs on `http://localhost:3000`

### Production Build
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## Project Navigation

### Landing Page
- **Route**: `/`
- **Features**: Hero section, features overview, CTA
- **Components**: Card, Button components

### Authentication
- **Sign Up**: `/auth/signup`
- **Sign In**: `/auth/login`
- **Note**: Currently uses placeholder auth (implement Supabase)

### Dashboard
- **Main Dashboard**: `/dashboard`
- **3D Viewer**: `/dashboard/viewer`
- **Flashcards**: `/dashboard/flashcards`
- **Quizzes**: `/dashboard/quizzes`
- **Analytics**: `/dashboard/analytics`
- **Study Groups**: `/dashboard/study-groups`
- **Forums**: `/dashboard/forums`
- **Settings**: `/dashboard/settings`

## Feature Implementation Status

### Completed ✅
- Web UI foundation with Tailwind CSS
- Landing page
- Authentication pages (UI only)
- Dashboard structure
- 3D parasite viewer with React Three Fiber
- Flashcard system with flip animation
- Quiz engine with scoring
- Progress tracking dashboard
- Analytics with charts
- Forums & study groups
- Offline support (Service Worker)
- Multi-tab synchronization hooks

### Needs Backend Integration
- User authentication
- Database persistence
- Real-time collaboration
- Progress sync
- Forum moderation

### Future Features
- VR/AR integration
- AI study assistant
- Premium features
- Mobile app
- Desktop app

## Adding New Features

### New Learning Module

1. Create page in `/app/dashboard/new-module/page.tsx`
2. Add sidebar navigation in `/components/dashboard/sidebar.tsx`
3. Create components in `/components/learning/`
4. Connect data fetching with SWR

Example:
```typescript
// app/dashboard/new-module/page.tsx
'use client'
import { Card } from '@/components/ui/card'

export default function NewModulePage() {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-border/40 bg-card/40 px-8 py-6">
        <h1 className="text-2xl font-bold text-foreground">New Module</h1>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <Card className="p-6 border border-border/40 bg-card/50">
          {/* Module content */}
        </Card>
      </div>
    </div>
  )
}
```

### New 3D Model

1. Create model component in `/components/viewer/`
2. Add to `ParasiteModel` switch statement
3. Update `PARASITES` array in viewer page

Example:
```typescript
// components/viewer/parasite-models.tsx
function NewParasiteModel() {
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshPhongMaterial color="#0088FF" />
    </mesh>
  )
}
```

## Database Schema (For Implementation)

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  full_name VARCHAR NOT NULL,
  role VARCHAR DEFAULT 'student',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Parasites
CREATE TABLE parasites (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  category VARCHAR NOT NULL,
  description TEXT,
  model_url VARCHAR,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Flashcards
CREATE TABLE flashcards (
  id SERIAL PRIMARY KEY,
  parasite_id INTEGER REFERENCES parasites(id),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Progress tracking
CREATE TABLE user_progress (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  parasite_id INTEGER REFERENCES parasites(id),
  progress DECIMAL DEFAULT 0,
  completed_items INTEGER DEFAULT 0,
  total_items INTEGER,
  last_accessed TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Forums
CREATE TABLE forum_posts (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  title VARCHAR NOT NULL,
  content TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Forum comments
CREATE TABLE forum_comments (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES forum_posts(id),
  user_id UUID REFERENCES users(id),
  content TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## API Routes (To Implement)

```typescript
// app/api/auth/route.ts
// POST /api/auth/signup - Create new user
// POST /api/auth/login - User login
// POST /api/auth/logout - User logout

// app/api/parasites/route.ts
// GET /api/parasites - Get all parasites
// GET /api/parasites/[id] - Get specific parasite

// app/api/progress/route.ts
// GET /api/progress - Get user progress
// POST /api/progress - Update progress
// POST /api/progress/sync - Sync offline changes

// app/api/forums/route.ts
// GET /api/forums - Get forum posts
// POST /api/forums - Create new post
// GET /api/forums/[id] - Get post with comments
// POST /api/forums/[id]/comments - Add comment
```

## Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
```

## Testing

### Manual Testing Checklist
- [ ] Landing page loads correctly
- [ ] Auth pages render properly
- [ ] Dashboard navigation works
- [ ] 3D viewer renders all parasite models
- [ ] Flashcards flip on click
- [ ] Quiz scoring works correctly
- [ ] Offline mode functionality
- [ ] Multi-tab sync messages broadcast
- [ ] Responsive design on mobile/tablet
- [ ] Charts display data correctly

### Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari 13+
- Mobile browsers (iOS Safari, Chrome Android)

## Deployment

### Vercel (Recommended)
```bash
# Connect GitHub repo to Vercel
# Set environment variables in Vercel dashboard
# Deploy with git push
```

### Self-hosted
```bash
# Build
npm run build

# Set environment variables
export NEXT_PUBLIC_SUPABASE_URL=...
export NODE_ENV=production

# Start
npm start
```

## Troubleshooting

### 3D Models Not Showing
- Check Three.js/React Three Fiber imports
- Verify canvas container has proper height
- Check browser console for WebGL errors

### Offline Features Not Working
- Browser must support Service Workers
- Check if HTTPS is enabled (required for SW)
- Clear cache and re-register SW

### Multi-tab Sync Not Working
- Browser must support BroadcastChannel API
- Check browser console for errors
- Verify same origin for all tabs

## Performance Tips

1. **Image Optimization**
   - Use Next.js Image component
   - Optimize parasite textures

2. **Code Splitting**
   - Use dynamic imports for heavy components
   - Lazy load 3D models

3. **Caching**
   - Configure Service Worker caching
   - Use SWR for API calls

4. **Database**
   - Add indexes on frequently queried columns
   - Implement pagination for large datasets

## Next Development Priorities

1. **Backend Setup** - Implement Supabase integration
2. **Authentication** - Connect to real auth system
3. **Database** - Implement schema and operations
4. **API Routes** - Build REST endpoints
5. **Real-time Features** - Add WebSocket support
6. **Mobile App** - Create React Native version
7. **Desktop App** - Build Electron version

## Resources

- [Next.js 16 Docs](https://nextjs.org)
- [React Three Fiber](https://r3f.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn/UI](https://ui.shadcn.com)
- [Three.js](https://threejs.org)
- [Supabase](https://supabase.com)

## Support

For issues or questions:
1. Check ARCHITECTURE.md for system design
2. Review component source code
3. Check browser console for errors
4. Enable debug logging with console.log("[v0] ...")
