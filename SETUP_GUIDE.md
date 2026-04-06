# Simocasino Project Setup Guide

## ✅ Project Generated Successfully!

Your complete Next.js 13+ fullstack casino platform is ready to use. This guide will help you get started.

## 🚀 Quick Start

### 1. MongoDB Connection

First, update your `.env.local` file with a valid MongoDB connection string:

```env
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/simocasino?retryWrites=true&w=majority"
NEXT_PUBLIC_API_URL="http://localhost:3000"
NODE_ENV="development"
```

**Get a free MongoDB database:**
1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a cluster
4. Get your connection string
5. Replace username and password in the connection string

### 2. Start Development Server

```bash
npm run dev
```

The application will start at `http://localhost:3000`

### 3. Seed Database (Optional)

To populate sample casino data:

```bash
npm run prisma:seed
```

## 📚 Project Structure Overview

```
simocasino/
├── app/                           # Next.js App Router
│   ├── page.tsx                   # Homepage
│   ├── layout.tsx                 # Root layout
│   ├── casino/[country]/          # Dynamic casino pages
│   ├── blog/[slug]/               # Blog posts
│   ├── guides/[slug]/             # Guides
│   ├── auth/login & register/     # Authentication pages
│   └── api/                       # API routes
├── components/                    # React components
│   ├── HOMEcomponents/            # Layout components
│   ├── CasinoCard.tsx             # Casino display
│   ├── BonusCard.tsx              # Bonus display
│   └── TopLoadingBar.tsx          # Loading indicator
├── hooks/                         # Custom React hooks
├── store/                         # Redux store
├── prisma/                        # Database
│   ├── schema.prisma              # Schema definition
│   └── seed.ts                    # Sample data
└── public/                        # Static assets
```

## 🎯 Key Features Explained

### Modular SCSS
Each component has its own scoped SCSS file:
```scss
// components/CasinoCard.module.scss
.casino-card {
  padding: 20px;
  border-radius: 12px;
}
```

### Redux State Management
Global state for:
- Casino listings (`casino` slice)
- Authentication (`auth` slice)
- UI state (`ui` slice)

### API Routes
```
/api/casinos?country=United%20States  → Get casinos by country
/api/bonuses                          → Get top bonuses
```

### Prisma Models
- **Casino** - Casino listings with ratings and bonuses
- **User** - User accounts
- **Blog** - Blog posts
- **Guide** - Educational guides

## 🔧 Common Tasks

### Add New Casino to Database

```typescript
// app/api/add-casino/route.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const data = await request.json();
  const casino = await prisma.casino.create({
    data: {
      name: data.name,
      country: data.country,
      bonus: data.bonus,
      rating: data.rating,
    },
  });
  return new Response(JSON.stringify(casino));
}
```

### Create New Page

1. Create file: `app/new-page/page.tsx`
2. Wrap with layout: Use `HOMELayouts` component
3. Add styling: Create `new-page.module.scss`

```typescript
'use client';
import HOMELayouts from '@/app/layouts/HOMELayouts';
import styles from './page.module.scss';

export default function NewPage() {
  return (
    <HOMELayouts>
      <h1 className={styles.title}>New Page</h1>
    </HOMELayouts>
  );
}
```

### Change Language

The app supports English, French, and German. Change language in:
- Header component (language selector)
- Or programmatically: `i18n.changeLanguage('fr')`

## 🎨 Styling Guide

### Color Scheme
- Primary: `#FF6B35` (Orange)
- Secondary: `#004E89` (Dark Blue)
- Accent: `#F25C54` (Coral)
- Dark: `#1a1a2e` (Very Dark Blue)

### Responsive Breakpoints
```scss
// Mobile: 320px - 480px
// Tablet: 481px - 768px
// Desktop: 769px+

@media (max-width: 768px) {
  // Mobile styles
}
```

## 🔐 Environment Variables

```env
# Required for database connection
DATABASE_URL="mongodb+srv://..."

# API configuration
NEXT_PUBLIC_API_URL="http://localhost:3000"

# Environment
NODE_ENV="development" | "production"
```

## 📦 Available Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run prisma:migrate` | Run database migrations |
| `npm run prisma:generate` | Generate Prisma client |
| `npm run prisma:seed` | Seed database |
| `npm run prisma:studio` | Open Prisma Studio UI |

## 🚀 Deployment

### To Vercel
1. Push code to GitHub
2. Connect repo to Vercel
3. Set environment variables: `DATABASE_URL`
4. Deploy!

### To Custom Server
```bash
# Build
npm run build

# Set NODE_ENV=production
export NODE_ENV=production

# Start
npm start
```

## 🐛 Troubleshooting

### MongoDB Connection Error
- Verify connection string in `.env.local`
- Check IP whitelist in MongoDB Atlas
- Ensure database name matches

### Port Already in Use
```bash
# Change port in package.json
"dev": "next dev -p 3001"
```

### Clear Cache & Rebuild
```bash
rm -rf .next node_modules
npm install
npm run build
```

## 📖 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs/)
- [Redux Toolkit Tutorial](https://redux-toolkit.js.org/tutorials/overview)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [SCSS Guide](https://sass-lang.com/documentation)

## 💡 Tips

1. **Hot Reload** - Changes save automatically during development
2. **TypeScript** - Use types for better developer experience
3. **Components** - Keep components small and focused
4. **Styling** - Use SCSS modules to avoid global conflicts
5. **API Routes** - Build REST APIs easily with Next.js

## 🆘 Getting Help

- Check the README.md for full documentation
- Review component examples in `components/` folder
- Check `app/api/` for API route examples
- Review `prisma/schema.prisma` for database structure

## 🎉 Next Steps

1. ✅ Install dependencies (Done!)
2. ✅ Generate Prisma client (Done!)
3. 📝 Configure MongoDB connection
4. 🚀 Run `npm run dev`
5. 📊 Populate database with `npm run prisma:seed`
6. 🎨 Customize colors and content
7. 🚀 Deploy to Vercel!

---

**Happy Coding! 🎰**
