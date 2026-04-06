# Simocasino - Next.js Fullstack Casino Platform

A modern, scalable Next.js 13+ fullstack application for discovering and comparing online casinos. Built with Turbopack, Prisma, MongoDB, Redux Toolkit, and comprehensive component architecture.

## 🚀 Features

- **Next.js 13+ App Router** - Latest React and Next.js features
- **Turbopack Integration** - Lightning-fast development builds
- **Prisma ORM** - Type-safe database access with MongoDB
- **Redux Toolkit** - Global state management
- **Modular SCSS** - Component-scoped styling with SCSS modules
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **AOS (Animate On Scroll)** - Scroll animations
- **React Hook Form** - Efficient form handling
- **i18next** - Multi-language support (EN, FR, DE)
- **Axios** - HTTP client for API requests
- **React Toastify** - Toast notifications
- **TypeScript** - Full type safety

## 📁 Project Structure

```
simocasino/
├── app/                          # Next.js App Router
│   ├── layouts/
│   │   └── HOMELayouts.tsx       # Main layout component
│   ├── casino/
│   │   └── [country]/
│   │       ├── page.tsx           # Dynamic country page
│   │       ├── client.tsx         # Client component
│   │       └── casino.module.scss
│   ├── blog/
│   │   ├── page.tsx              # Blog index
│   │   └── [slug]/               # Dynamic blog posts
│   ├── guides/
│   │   ├── page.tsx              # Guides index
│   │   └── [slug]/               # Dynamic guides
│   ├── auth/
│   │   ├── login/
│   │   └── register/
│   ├── api/
│   │   ├── casinos/route.ts
│   │   └── bonuses/route.ts
│   ├── page.tsx                  # Home page
│   ├── layout.tsx                # Root layout
│   └── globals.scss              # Global styles
├── components/
│   ├── HOMEcomponents/
│   │   ├── HOMEheader.tsx
│   │   ├── HOMESleftsidebare.tsx
│   │   ├── HOMEcontent.tsx
│   │   └── HOMEfooter.tsx
│   ├── CasinoCard.tsx
│   ├── BonusCard.tsx
│   └── TopLoadingBar.tsx
├── hooks/
│   └── useFetch.ts               # Custom fetch hook
├── store/
│   └── store.ts                  # Redux store configuration
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── seed.ts                   # Database seeding
├── public/                       # Static assets
├── styles/                       # Optional global styles
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
└── README.md
```

## ⚡ Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- MongoDB (local or cloud instance)

### Installation

1. **Clone and navigate to the project:**
   ```bash
   cd simocasino
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root directory:
   ```env
   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/simocasino?retryWrites=true&w=majority"
   NEXT_PUBLIC_API_URL="http://localhost:3000"
   NODE_ENV="development"
   ```

4. **Generate Prisma client:**
   ```bash
   npm run prisma:generate
   ```

5. **Run database migrations:**
   ```bash
   npm run prisma:migrate
   ```

6. **Seed the database (optional):**
   ```bash
   npm run prisma:seed
   ```

### Development

Start the development server with Turbopack:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

Build the application:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run prisma:generate` | Generate Prisma client |
| `npm run prisma:migrate` | Run database migrations |
| `npm run prisma:seed` | Seed database with sample data |
| `npm run prisma:studio` | Open Prisma Studio |

## 🗄️ Database Schema

### Casino Model
```typescript
model Casino {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  name        String
  country     String
  bonus       String
  rating      Float    @default(0)
  revenueRank Int?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### User Model
```typescript
model User {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  email     String   @unique
  password  String
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Blog & Guide Models
```typescript
model Blog {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  slug      String   @unique
  title     String
  content   String
  excerpt   String?
  published Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🎮 Key Components

### HOMELayouts
Main layout wrapper that includes header, sidebar, content area, and footer. Automatically hides sidebar on auth pages.

### CasinoCard
Displays casino information with rating, bonus, and visit button. Includes hover animations with Framer Motion.

### BonusCard
Showcases bonus offers with gradient backgrounds and smooth animations.

### TopLoadingBar
Fixed position loading indicator that displays during page transitions.

## 🌍 Multi-Language Support

The application supports English, French, and German out of the box via i18next. Add more languages by updating the i18n configuration in `app/i18n.ts`.

## 🎨 Styling Approach

- **SCSS Modules** - Each component has its own scoped SCSS file
- **Tailwind CSS** - Available for quick utilities
- **CSS Variables** - Defined in `globals.scss` for easy theming
- **No Global Mixins** - Each component is self-contained

## 🔗 API Routes

### GET `/api/casinos`
Fetch casinos by country
```
Query: ?country=United States
Response: Casino[]
```

### GET `/api/bonuses`
Fetch top bonuses
```
Response: { casinoId, casinoName, bonus }[]
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Docker

Docker support can be added by creating a `Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔐 Security Considerations

- **CORS** - Configure CORS headers for API routes
- **JWT** - Implement secure authentication
- **Environment Variables** - Keep sensitive data in `.env.local`
- **Input Validation** - Use react-hook-form for validation
- **Rate Limiting** - Add rate limiting to API routes

## 📱 Responsive Design

All components are fully responsive and tested on:
- Mobile (320px - 480px)
- Tablet (481px - 768px)
- Desktop (769px+)

## 🛠️ Development Tools

- **VS Code** - Recommended editor
- **ESLint** - Code quality
- **Prettier** - Code formatting
- **TypeScript** - Type safety
- **Prisma Studio** - Database management UI

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

ISC License - Feel free to use this project for personal or commercial purposes.

## 🆘 Support

For issues, questions, or suggestions:
- Create an issue on GitHub
- Contact: support@simocasino.com

## 🎯 Future Enhancements

- [ ] Payment gateway integration (Stripe, PayPal)
- [ ] User authentication system
- [ ] Admin dashboard
- [ ] Analytics integration
- [ ] Email notifications
- [ ] Mobile app version
- [ ] Advanced search filters
- [ ] User reviews and ratings

---

**Built with ❤️ using Next.js 13+, Turbopack, and modern web technologies**
