# File Organization Guide

## Overview
Your project has been reorganized for better maintainability and clarity. Here's the new structure and rationale.

## Directory Structure

### 📁 `/app/` - Next.js App Router
- Contains only Next.js specific files (pages, layouts, globals.css)
- Clean and focused on routing logic

### 📁 `/components/` - React Components (Organized by Purpose)

#### `/components/features/` - Feature-specific components
- **`/voting/`** - All voting-related components
  - `MatchupCard.tsx` - Individual matchup display
  - `ResultsView.tsx` - Results page
  - `SauceDisplay.tsx` - Individual sauce display

#### `/components/common/` - App-specific reusable components
- `Navigation.tsx` - App navigation
- `CompletionAnimation.tsx` - Celebration animation
- `ProgressBar.tsx` - Custom progress bars
- `VoteButton.tsx` - Voting buttons

#### `/components/layout/` - Layout components
- `AppContainer.tsx` - Main app wrapper
- `Header.tsx` - App header

#### `/components/ui/` - Generic UI library (shadcn/ui)
- Contains all shadcn/ui components
- Generic, reusable across any project
- Includes utility hooks (`use-mobile.tsx`, `use-toast.ts`)

### 📁 `/config/` - Configuration Files
- **`/firebase/`** - All Firebase-related configuration
  - `firebase.json` - Firebase hosting config
  - `FIREBASE_SETUP.md` - Setup documentation
  - `firebase-admin-key.json` - Admin credentials

### 📁 `/hooks/` - Custom React Hooks
- Domain-specific hooks only
- `useMatchups.ts`, `useResults.ts`, `useSession.ts`, `useVoting.ts`

### 📁 `/lib/` - Utility Libraries
- `constants.ts` - App constants
- `firebase.ts` - Firebase client setup
- `session.ts` - Session management
- `utils.ts` - General utilities

### 📁 `/services/` - External Service Integrations
- `database.ts` - Database operations
- `firebase.ts` - Firebase service layer
- `mockData.ts` - Mock data for development

### 📁 `/types/` - TypeScript Type Definitions
- `index.ts` - All app type definitions

## Key Improvements Made

### ✅ Removed Duplicates
- Eliminated duplicate hook files (`use-mobile.ts`, `use-toast.ts`)
- Removed unnecessary `index.html` from root

### ✅ Better Organization
- **Feature-driven** component structure
- **Domain separation** between generic UI and app-specific components
- **Configuration consolidation** in `/config/`

### ✅ Improved .gitignore
- Added build outputs (`out/`, `.next/`)
- Added sensitive files (`firebase-admin-key.json`)
- Added IDE files (`*.code-workspace`)

### ✅ Cleaner Root Directory
- Moved workspace file to root level
- Organized config files into subdirectories
- Removed build artifacts

## Import Path Changes

Due to reorganization, some import paths were updated:

```typescript
// OLD
import { MatchupCard } from '@/components/sauce/MatchupCard'
import { Navigation } from '@/components/ui/Navigation'

// NEW
import { MatchupCard } from '@/components/features/voting/MatchupCard'
import { Navigation } from '@/components/common/Navigation'
```

## Benefits

1. **Scalability** - Easy to add new features without cluttering
2. **Maintainability** - Clear separation of concerns
3. **Developer Experience** - Easier to find and organize files
4. **Team Collaboration** - Consistent structure across team
5. **Build Optimization** - Cleaner build outputs

## Next Steps

1. Update any remaining import references if needed
2. Consider adding feature-specific documentation in relevant directories
3. Keep the organization consistent as you add new features

## Best Practices Going Forward

- **Features**: New voting-related components go in `/components/features/voting/`
- **Reusable Components**: App-specific reusable components go in `/components/common/`
- **UI Library**: Generic UI components stay in `/components/ui/`
- **Configuration**: All config files go in appropriate `/config/` subdirectories
- **Documentation**: Feature docs go with features, general docs in `/docs/`
