# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `bun run start` - Start development server (Vite dev server with API proxy to localhost:3000)
- `bun run build` - Build for production (includes TypeScript compilation)
- `bun run serve` - Preview production build
- `bun run test` - Run tests with Vitest
- `bun run lint` - Format code with Biome

### Package Manager
This project uses **Bun** as the package manager (note: bun.lock file exists).

## Architecture Overview

This is a modern React task management application built with **Feature-Sliced Design (FSD)** architecture:

```
src/
├── entities/     # Business entities (task, auth)
├── widgets/      # UI compositions (task-card, app-sidebar, edit-task)
├── shared/       # Shared utilities, UI components, hooks
└── routes/       # File-based routing with TanStack Router
```

### Key Architectural Patterns

**State Management**: Jotai atomic state management
- Tasks stored as array of primitive atoms (`taskAtoms`) for granular updates
- Authentication state in simple atoms (`accessTokenAtom`, `isAuthFailedAtom`)
- Uses `jotai-optics` for deep property focusing with `focusAtom`

**Routing**: TanStack Router with file-based routing
- `/_auth/_withSidebar/` - Protected routes with sidebar layout
- `/_nonAuth/auth/$type` - Public authentication pages
- Route-level authentication guards

**API Integration**: 
- ky HTTP client with bearer token authentication
- TanStack Query for server state management
- Automatic token refresh on 401 responses
- Development API proxy: `/api` → `http://localhost:3000`

## Technology Stack

### Core Technologies
- **React 19** with TypeScript (strict mode)
- **Vite** build tool with HMR
- **Jotai** atomic state management (with immer and optics)
- **TanStack Router** + **TanStack Query**
- **Tailwind CSS 4.0** + **Shadcn/ui** components
- **Motion (Framer Motion)** for animations

### Forms & Validation
- **React Hook Form** with **Zod** validation
- Schema-first approach with TypeScript integration

## Important Code Patterns

### Task Entity Structure
```typescript
type Task = {
    id: string;
    checked: boolean;
    title: string;
    desc: string;
    schedule?: Schedule;     // Complex scheduling with repeat patterns
    labels: string[];
    priority: Priority;     // Enum: high(1), medium(2), low(3), none(4)
    subTasksIds: string[];
};
```

### Atomic State Pattern for Tasks
Tasks are managed as an array of primitive atoms:
```typescript
const [tasks, setTasks] = useAtom(taskAtoms);
// Add: setTasks(prev => [...prev, atom(newTask)])
// Remove: setTasks(prev => prev.filter(atom => store.get(atom).id !== id))
```

### Authentication Flow
1. Login stores access token in `accessTokenAtom`
2. API calls automatically include Bearer token
3. 401 responses trigger refresh token attempt
4. Failed refresh sets `isAuthFailedAtom` → redirects to login

### Component Patterns
- **Shadcn/ui components** in `/shared/ui/` following Radix UI patterns
- **FadeCard** component for smooth content transitions
- **Expandable task cards** with inline editing capabilities
- **Filter system** with Select components for label/priority/sort filtering

### Route Structure
- `/_auth/_withSidebar/index.tsx` - Main task list with filters
- `/_auth/_withSidebar/labels/` - Label management
- Authentication routes use dynamic `$type` parameter

## Development Notes

- Path aliases configured: `@/*` maps to `./src/*`
- All components use TypeScript with strict mode
- Biome handles code formatting and linting
- Motion/Framer Motion used for task card animations and transitions
- TanStack Router provides full type safety for routes