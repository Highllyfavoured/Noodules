# Noodules Setup Guide

Welcome to Noodules! This guide will walk you through setting up the application from scratch to deployment.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Environment Setup](#environment-setup)
4. [Database Setup](#database-setup)
5. [Authentication Setup](#authentication-setup)
6. [Development](#development)
7. [Building for Production](#building-for-production)
8. [Deployment](#deployment)
9. [Troubleshooting](#troubleshooting)

## Prerequisites

- **Node.js**: v18.17+ ([Download](https://nodejs.org))
- **npm or yarn**: Latest version
- **Git**: For version control
- **A code editor**: VS Code recommended
- **Supabase account** (optional but recommended): [Create free account](https://supabase.com)
- **Vercel account** (for deployment): [Create free account](https://vercel.com)

## Installation

### 1. Clone or Download the Project

```bash
# If using git
git clone <your-repository-url>
cd noodules

# Or extract the downloaded ZIP file
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

This will install all required packages including:
- **Next.js 16**: React framework
- **React Three Fiber**: 3D visualization
- **Tailwind CSS**: Styling
- **shadcn/ui**: UI components
- **Supabase**: Backend as a service
- **SWR**: Data fetching

## Environment Setup

### 1. Create Environment Variables File

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local  # If .env.example exists
# or manually create .env.local
```

### 2. Configure Environment Variables

Add the following to `.env.local`:

```env
# Supabase Configuration (Optional but recommended)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000

# Feature Flags
NEXT_PUBLIC_ENABLE_OFFLINE=true
NEXT_PUBLIC_ENABLE_COLLABORATION=true
```

> **Note**: Variables starting with `NEXT_PUBLIC_` are exposed to the browser. Never put sensitive secrets in these.

## Database Setup

### Option A: Using Supabase (Recommended)

#### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in project details:
   - **Name**: `noodules`
   - **Database Password**: Generate strong password
   - **Region**: Choose closest to you

#### 2. Create Database Tables

Once your project is created, go to the SQL Editor and run:

```sql
-- Users table (Supabase Auth handles this)
-- But you can create a public profile table

CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Progress tracking
CREATE TABLE public.learning_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  parasite_id TEXT,
  completion_percentage INTEGER DEFAULT 0,
  last_viewed TIMESTAMP,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Quiz results
CREATE TABLE public.quiz_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  parasite_id TEXT,
  score INTEGER,
  total_questions INTEGER,
  answers JSONB,
  created_at TIMESTAMP DEFAULT now()
);

-- Forum posts
CREATE TABLE public.forum_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  parasite_id TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Forum replies
CREATE TABLE public.forum_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES public.forum_posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Study groups
CREATE TABLE public.study_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  creator_id UUID REFERENCES auth.users(id),
  members JSONB DEFAULT '[]',
  created_at TIMESTAMP DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_groups ENABLE ROW LEVEL SECURITY;

-- Add RLS policies
CREATE POLICY "Users can view their own profile"
  ON public.user_profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.user_profiles
  FOR UPDATE
  USING (auth.uid() = id);
```

#### 3. Get Your Credentials

1. Go to **Settings** → **API**
2. Copy `Project URL` and `anon public key`
3. Add them to `.env.local`

### Option B: Using Neon (PostgreSQL)

1. Create account at [neon.tech](https://neon.tech)
2. Create a project
3. Get connection string
4. Update `.env.local` with database URL

## Authentication Setup

### Using Supabase Auth

1. **Enable Email Auth**:
   - Go to **Authentication** → **Providers**
   - Ensure Email is enabled
   - Configure email settings if needed

2. **Configure Auth Redirect URLs**:
   - Go to **Authentication** → **URL Configuration**
   - Add redirect URLs:
     - `http://localhost:3000/auth/callback` (development)
     - `https://yourdomain.com/auth/callback` (production)

3. **Update Auth Hook**:

Create `lib/auth.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl!, supabaseKey!)
```

## Development

### Run Development Server

```bash
npm run dev
# or
yarn dev
```

The app will be available at `http://localhost:3000`

### Key Development URLs

- **Home**: http://localhost:3000
- **Dashboard**: http://localhost:3000/dashboard
- **3D Viewer**: http://localhost:3000/dashboard/viewer
- **Flashcards**: http://localhost:3000/dashboard/flashcards
- **Quizzes**: http://localhost:3000/dashboard/quizzes
- **Analytics**: http://localhost:3000/dashboard/analytics
- **Study Groups**: http://localhost:3000/dashboard/study-groups
- **Forums**: http://localhost:3000/dashboard/forums

### File Structure Overview

```
noodules/
├── app/                           # Next.js App Router
│   ├── page.tsx                  # Landing page
│   ├── auth/                     # Authentication pages
│   ├── dashboard/                # Protected dashboard
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   ├── dashboard/                # Dashboard components
│   ├── viewer/                   # 3D viewer components
│   ├── learning/                 # Learning tool components
│   └── forums/                   # Forum components
├── hooks/                        # Custom React hooks
├── lib/                          # Utilities and helpers
├── public/                       # Static assets
├── tailwind.config.ts            # Tailwind configuration
└── package.json                  # Dependencies
```

## Building for Production

### 1. Build the Application

```bash
npm run build
# or
yarn build
```

This creates an optimized production build in `.next` directory.

### 2. Test Production Build Locally

```bash
npm start
# or
yarn start
```

### 3. Environment Variables for Production

Create `.env.production.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_supabase_anon_key
NEXT_PUBLIC_API_URL=https://yourdomain.com
```

## Deployment

### Option A: Deploy to Vercel (Recommended)

Vercel is the creator of Next.js and provides seamless deployment.

#### 1. Push Code to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/noodules.git
git push -u origin main
```

#### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project settings:
   - **Framework**: Next.js
   - **Root Directory**: `.`
5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_API_URL`
6. Click "Deploy"

#### 3. Configure Custom Domain

1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Update DNS records as instructed

### Option B: Deploy to Other Platforms

#### Docker Deployment

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and deploy:

```bash
docker build -t noodules .
docker run -p 3000:3000 noodules
```

#### Traditional VPS Deployment

```bash
# On your VPS
git clone <your-repo>
cd noodules
npm install
npm run build
npm start
```

Use PM2 to keep the app running:

```bash
npm install -g pm2
pm2 start npm --name "noodules" -- start
pm2 startup
pm2 save
```

## Troubleshooting

### Port 3000 Already in Use

```bash
# On macOS/Linux
lsof -i :3000
kill -9 <PID>

# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Supabase Connection Issues

1. Check environment variables are set correctly
2. Verify Supabase project is active
3. Test connection:

```bash
npm run test:db
```

### Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

### 3D Models Not Loading

1. Check public folder permissions
2. Verify model file paths
3. Check browser console for errors (F12)

### Authentication Not Working

1. Verify Supabase credentials in `.env.local`
2. Check Supabase URL configuration
3. Clear browser cookies and try again
4. Check auth logs in Supabase dashboard

## Performance Optimization

### Enable Image Optimization

Install `sharp`:

```bash
npm install sharp
```

### Enable CSS Optimization

Already configured in `tailwind.config.ts`

### Enable Compression

Add to `next.config.mjs`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  swcMinify: true,
  cacheComponents: true,
}

export default nextConfig
```

## Security Checklist

- [ ] Never commit `.env.local` to git (add to `.gitignore`)
- [ ] Use HTTPS in production
- [ ] Enable CORS properly in Supabase
- [ ] Implement RLS policies
- [ ] Validate all user inputs
- [ ] Use secure password hashing
- [ ] Enable rate limiting
- [ ] Keep dependencies updated

## Next Steps

1. **Customize Content**: Add your parasite species data
2. **Branding**: Update logos and colors
3. **Mobile App**: Build React Native version using shared code
4. **AI Integration**: Add AI-powered study assistant
5. **Analytics**: Integrate analytics platform
6. **Testing**: Add unit and integration tests

## Support and Resources

- **Documentation**: See `ARCHITECTURE.md` and `IMPLEMENTATION_GUIDE.md`
- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **React Three Fiber**: https://docs.pmnd.rs/react-three-fiber

## License

This project is open source. See LICENSE file for details.

---

**Happy coding! If you have questions, check the troubleshooting section or open an issue on GitHub.**
