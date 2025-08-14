# Getting Started

To run this application:

```bash
bun install
bun run start  
```

# Building For Production

To build this application for production:

```bash
bun run build
```

## Testing

This project uses [Vitest](https://vitest.dev/) for testing. You can run the tests with:

```bash
bun run test
```

## Styling

[Tailwind CSS](https://tailwindcss.com/)


## Store

[Jotai](https://jotai.org)

## Data Synchronization

This application implements a sophisticated auto-save system that provides seamless data synchronization between the client and backend.

### Overview

The synchronization system uses a combination of Jotai atoms for local state management and TanStack Query for server state, providing:

- **Instant UI updates** - Changes are immediately reflected in the interface
- **Automatic background sync** - Modified data is automatically saved to the server
- **Debounced requests** - Multiple changes are batched to reduce server load
- **Optimistic updates** - UI updates immediately, with server sync happening in the background

### Architecture

```
User Input → Jotai Atoms → Auto-Save Detection → Debounced Sync → Backend API
     ↑                                                                    ↓
     └── Immediate UI Update                        Server Response ──────┘
```

### Key Components

#### 1. Task Atoms (`taskAtoms`)
- Each task is stored as a separate Jotai atom using `focusAtom`
- Direct updates to specific properties (title, desc, priority, labels)
- Granular reactivity - only affected components re-render

#### 2. Auto-Save System (`useTaskAutoSave`)
- Monitors all task atoms for changes every 200ms
- Compares current state with previous state to detect modifications
- Ignores initial data loading to prevent unnecessary sync
- Triggers debounced synchronization for changed tasks

#### 3. Sync Management (`useAutoSync`)
- **Debounce Logic**: 1-second delay after the last change
- **Batch Updates**: Multiple task changes are sent in a single request
- **Smart Queuing**: Latest version of each task overwrites previous pending updates
- **Mutation Handling**: Uses TanStack Query mutations for reliable server communication

### How It Works

1. **User starts typing** in a task title or description
   ```
   User types "Hello" → title atom updates → UI shows "Hello" immediately
   ```

2. **Auto-save detection** notices the change
   ```
   useTaskAutoSave detects title change → schedules sync for task
   ```

3. **Debounce timer** starts
   ```
   1-second countdown begins → if user types more, timer resets
   ```

4. **Batch sync** to server
   ```
   Timer expires → all pending changes sent to POST /api/tasks/{id}
   ```

5. **Success handling**
   ```
   Server responds → cache invalidated → sync indicator disappears
   ```

### Features

#### Intelligent Change Detection
```typescript
// Only syncs when actual content changes
if (task1.title.trim() !== task2.title.trim()) {
  scheduleSync(task);
}
```

#### Visual Feedback
- Sync indicator appears in header during background saves
- Pulsing blue dot shows when data is being synchronized

#### Error Resilience
- Failed requests are handled by TanStack Query retry logic
- UI remains responsive even if backend is unavailable
- No data loss - changes persist in local atoms until successful sync

### Configuration

The sync system can be customized:

```typescript
// Adjust debounce delay
const { scheduleSync } = useAutoSync({ 
  debounceMs: 1000 // Default: 1 second
});

// Monitor interval for change detection  
const MONITOR_INTERVAL = 200; // milliseconds
```

### Performance Optimizations

1. **Debouncing** - Prevents excessive API calls during rapid typing
2. **Batching** - Multiple task updates sent in single request
3. **Smart Comparison** - Only syncs when actual content differs
4. **Granular Updates** - Only changed fields trigger re-renders
5. **Memory Efficient** - Previous state stored in refs, not reactive state

### Usage Examples

#### Automatic Sync
```typescript
// Just use the task editing components - sync happens automatically
<Title atom={taskAtom} isOpen={true} />
<Desc atom={taskAtom} isOpen={true} />
```

#### Manual Sync
```typescript
const { syncNow } = useTaskAutoSave();

// Force immediate synchronization
const handleSave = () => {
  syncNow();
};
```

#### Sync Status
```typescript
const { isPending } = useTaskAutoSave();

// Show loading indicator
{isPending && <SyncIndicator />}
```

This system ensures a smooth user experience with reliable data persistence, making the application feel responsive and trustworthy.
