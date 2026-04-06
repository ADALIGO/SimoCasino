# UserProgressHeader Component Documentation

A gamified user progress header component for casino websites featuring level progression, XP tracking, and smooth animations.

## Features

✨ **Modern Design**
- Glassmorphism effect with backdrop blur
- Gradient accents and glow effects
- Dark theme optimized for casino aesthetic
- Smooth animations and transitions

🎮 **Gamification Elements**
- Level badge with dynamic colors (Bronze → Silver → Gold)
- Trophy icon with bounce animation
- Point and XP display
- Animated progress bar with shimmer effect
- Next level threshold indicator

📱 **Responsive**
- Desktop, tablet, and mobile optimized
- Flexible layout that adapts to screen size
- Touch-friendly controls

## Installation

The component is already installed in your project:
- **Component:** `components/UserProgressHeader.tsx`
- **Styles:** `components/UserProgressHeader.module.scss`
- **Demo:** `app/demo/user-progress/page.tsx`

## Usage

### Basic Usage

```tsx
import UserProgressHeader from '@/components/UserProgressHeader';

export default function MyPage() {
  return (
    <UserProgressHeader totalPoints={1250} />
  );
}
```

### With Dynamic Points

```tsx
'use client';

import { useState } from 'react';
import UserProgressHeader from '@/components/UserProgressHeader';

export default function UserDashboard() {
  const [points, setPoints] = useState(1250);

  const handleEarnPoints = (amount: number) => {
    setPoints(prev => prev + amount);
  };

  return (
    <>
      <UserProgressHeader 
        totalPoints={points}
        showAnimation={true}
        onLevelUp={(level) => console.log(`Reached level ${level}!`)}
      />
      <button onClick={() => handleEarnPoints(100)}>Earn 100 Points</button>
    </>
  );
}
```

### With Redux Integration

```tsx
import { useSelector } from 'react-redux';
import UserProgressHeader from '@/components/UserProgressHeader';
import { RootState } from '@/store/store';

export default function Header() {
  const userPoints = useSelector((state: RootState) => state.user.points);

  return <UserProgressHeader totalPoints={userPoints} />;
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `totalPoints` | `number` | `1250` | Current user points/XP |
| `onLevelUp` | `(newLevel: number) => void` | `undefined` | Callback when level changes |
| `showAnimation` | `boolean` | `true` | Enable/disable animations |

## Level System

### Level Thresholds

```
Level 0: 0 points      (Starting level)
Level 1: 100 points    (Bronze)
Level 2: 300 points
Level 3: 600 points
Level 4: 1000 points   (Silver)
Level 5: 1500 points
Level 6: 2100 points   (Silver)
Level 7: 2800 points
Level 8: 3600 points   (Gold)
Level 9: 4500 points   (Gold)
Level 10: 5500 points  (Gold - Max Level)
```

### Customizing Level Thresholds

Edit the `LEVEL_THRESHOLDS` constant in `UserProgressHeader.tsx`:

```tsx
const LEVEL_THRESHOLDS = [0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500, 5500];
```

### Badge Colors

Badges change color based on level:
- **Level 0-3:** Orange (#FF6B35) - Bronze tier
- **Level 4-7:** Silver (#C0C0C0) - Silver tier
- **Level 8-10:** Gold (#FFD700) - Gold tier

Customize in the `getBadgeColor()` function:

```tsx
const getBadgeColor = (level: number): string => {
  if (level >= 8) return '#FFD700';  // Gold
  if (level >= 6) return '#C0C0C0';  // Silver
  if (level >= 4) return '#CD7F32';  // Bronze
  return '#FF6B35';                   // Orange (default)
};
```

## Utilities

### Calculate Level Data

```tsx
import { calculateLevelData } from '@/components/UserProgressHeader';

const levelData = calculateLevelData(1250);
console.log(levelData);
// Output:
// {
//   currentLevel: 3,
//   currentLevelXP: 600,
//   nextLevelXP: 1000,
//   xpProgress: 650,
//   xpToNextLevel: 400,
//   progressPercentage: 62.5,
//   isMaxLevel: false
// }
```

### Access Level Thresholds

```tsx
import { LEVEL_THRESHOLDS, MAX_LEVEL } from '@/components/UserProgressHeader';

console.log(LEVEL_THRESHOLDS);  // [0, 100, 300, ...]
console.log(MAX_LEVEL);          // 10
```

## Customization

### Theme Colors

Edit `UserProgressHeader.module.scss` to customize colors:

```scss
// Primary accent color
color: #FF6B35;

// Secondary accent (gold/points)
color: #FFD700;

// Background colors
background: rgba(20, 20, 30, 0.6);
```

### Animation Speed

Modify animation durations:

```scss
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

// Change from "2s" to adjust speed:
animation: shimmer 2s infinite;  // <- Edit this value
```

### Glassmorphism Effect

Adjust the blur effect and transparency:

```scss
.container {
  background: rgba(20, 20, 30, 0.6);    // <- Adjust alpha (0.4-0.8)
  backdrop-filter: blur(16px);          // <- Adjust blur (8px-32px)
  border: 1px solid rgba(255, 107, 53, 0.2);
}
```

## Responsive Breakpoints

The component responds to three breakpoints:

- **Desktop:** 769px+ (full layout with decorative stars)
- **Tablet:** 431px - 768px (compact layout)
- **Mobile:** ≤430px (vertical stack, no stars)

Customize in the SCSS file:

```scss
@media (max-width: 768px) {
  // Tablet styles
}

@media (max-width: 480px) {
  // Mobile styles
}
```

## Integration Examples

### In Header Component

```tsx
// components/HOMEcomponents/HOMEheader.tsx
import UserProgressHeader from '@/components/UserProgressHeader';

export default function HOMEheader() {
  const userPoints = useSelector(state => state.user.points);

  return (
    <>
      <header>
        {/* existing header code */}
      </header>
      {isAuthenticated && <UserProgressHeader totalPoints={userPoints} />}
    </>
  );
}
```

### In Dashboard

```tsx
// app/dashboard/page.tsx
import UserProgressHeader from '@/components/UserProgressHeader';

export default function Dashboard() {
  return (
    <main>
      <UserProgressHeader totalPoints={2500} />
      {/* rest of dashboard */}
    </main>
  );
}
```

### In User Profile Card

```tsx
// components/UserCard.tsx
import UserProgressHeader from '@/components/UserProgressHeader';

export default function UserCard({ user }) {
  return (
    <div>
      <h1>{user.name}</h1>
      <UserProgressHeader totalPoints={user.totalPoints} />
    </div>
  );
}
```

## Performance Optimization

- Uses `useMemo` to prevent unnecessary recalculations
- Component is lightweight and doesn't require heavy dependencies
- Animations use CSS transforms for smooth 60fps performance
- Responsive design adapts efficiently across devices

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Icons Used

The component uses Lucide React icons (already installed in your project):
- `Trophy` - Level badge
- `Star` - Points display & decorative elements
- `Zap` - XP indicator

## Troubleshooting

### Component not showing points correctly?

Ensure you're passing the `totalPoints` prop:
```tsx
<UserProgressHeader totalPoints={userPoints} />  // ✅ Correct
<UserProgressHeader />  // ❌ Will use default (1250)
```

### Animations not smooth?

Check that `showAnimation={true}` (default). Disable on low-end devices:
```tsx
<UserProgressHeader totalPoints={points} showAnimation={false} />
```

### Colors not matching your theme?

Customize the SCSS variables and colors directly in `UserProgressHeader.module.scss`.

## Future Enhancements

- [ ] Add achievement badges
- [ ] Sound effects on level up
- [ ] Confetti animation
- [ ] Multiple progress tracks
- [ ] Leaderboard integration
- [ ] Progress history graph

## Support

For issues or questions, check the demo page at `/demo/user-progress`
