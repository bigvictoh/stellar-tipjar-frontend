# Profile Completion Indicator

## Overview

The Profile Completion Indicator helps creators understand what's missing from their profile and why it matters for discoverability. It displays on the dashboard and provides a visual progress bar with actionable next steps.

## Features

### 1. **Completion Percentage**

- Calculated based on filled profile fields
- Updates in real-time as creators fill in their profile
- Shows 0-100% progress

### 2. **Progress Bar**

- Visual representation with animated fill
- Color-coded: sunrise/warning color for incomplete, moss/success for complete
- Smooth animations when percentage changes

### 3. **Incomplete Items List**

- Expandable section showing unfilled profile fields
- Each item includes:
  - Field name and description
  - Why it matters (for discoverability)
  - Direct link to edit that field
  - Dismiss button to hide completed items

### 4. **Dismissable Items**

- Users can dismiss incomplete items if they choose not to fill them
- Dismissed items are stored in localStorage
- "Dismiss" button with smooth exit animation
- Can be restored by clearing browser storage

### 5. **Celebration State**

- Shows "Profile Complete!" message at 100%
- Celebratory tone with emoji and success styling
- Encourages maintaining profile updates

## File Structure

```
src/
├── store/
│   └── profileCompletionStore.ts      # Zustand store for completion state
├── components/
│   └── ProfileCompletionIndicator.tsx # Main indicator component
├── hooks/
│   └── useProfileCompletion.ts        # Hook to sync user profile data
└── components/Dashboard/
    └── index.tsx                       # Dashboard with integrated indicator
```

## Store: `profileCompletionStore.ts`

### State

- `dismissedItems`: Set of field IDs that users have hidden
- `fields`: Array of profile fields with completion status

### Actions

- `setFields(fields)`: Update profile fields (sync from user data)
- `dismissItem(itemId)`: Mark field as dismissed
- `restoreItem(itemId)`: Show dismissed field again
- `getCompletionPercentage()`: Calculate completion %
- `getIncompleteFields()`: Get incomplete, non-dismissed fields sorted by importance
- `hasDismissedAll()`: Check if all incomplete items are hidden

### Selectors

- `useCompletionPercentage()`: Get % progress
- `useIncompleteFields()`: Get list of unfilled fields
- `useProfileFields()`: Get all fields
- `useHasProfileDismissedAll()`: Check if all dismissed

## Component: `ProfileCompletionIndicator`

### Features

- Displays completion percentage prominently
- Expandable/collapsible details section
- Shows incomplete items with descriptions and direct links
- Dismiss buttons for each item
- Celebration state at 100% completion

### Props

None - uses Zustand store directly

### Usage

```tsx
import { ProfileCompletionIndicator } from "@/components/ProfileCompletionIndicator";

export function Dashboard() {
  return (
    <div>
      <ProfileCompletionIndicator />
      {/* rest of dashboard */}
    </div>
  );
}
```

## Hook: `useProfileCompletion`

Synchronizes user profile data with the completion tracker.

### Usage

```tsx
import { useProfileCompletion } from "@/hooks/useProfileCompletion";

export function Dashboard() {
  useProfileCompletion(); // Call once in a parent component
  // ...
}
```

### Current Implementation

Currently tracks:

- `avatar`: From `user.avatarUrl`
- `displayName`: From `user.displayName`
- `bio`: Placeholder (needs API integration)
- `tags`: Placeholder (needs API integration)
- `website`: Placeholder (needs API integration)
- `social`: Placeholder (needs API integration)

### Future: API Integration

To fully track all profile fields, you'll need to:

1. Add profile data to the `User` interface in `userStore.ts`:

```tsx
export interface User {
  // ... existing fields
  bio?: string;
  tags?: string[];
  website?: string;
  twitter?: string;
  github?: string;
}
```

2. Fetch full profile on app initialization
3. Update `useProfileCompletion` hook to sync all fields

## Profile Fields

Default fields tracked:

| Field             | Importance | Reason                                        |
| ----------------- | ---------- | --------------------------------------------- |
| Avatar            | High       | Makes profile memorable and trustworthy       |
| Display Name      | High       | Professional identity                         |
| Bio               | High       | Helps supporters understand what you do       |
| Tags & Categories | Medium     | Improves search discoverability               |
| Website/Portfolio | Medium     | Establishes credibility and external presence |
| Social Links      | Low        | Builds community connection                   |

## Customization

### Change Tracked Fields

Edit `profileCompletionStore.ts` `defaultFields` array:

```tsx
const defaultFields: ProfileField[] = [
  {
    id: "custom-field",
    label: "Custom Field Name",
    description: "Why this matters for creators",
    link: "/profile#custom-field",
    filled: false,
    importance: "high", // "high" | "medium" | "low"
  },
  // ...
];
```

### Change Colors

Edit `ProfileCompletionIndicator.tsx`:

- Border color: `border-sunrise/20` → any color + opacity
- Background: `bg-gradient-to-r from-sunrise/5 to-wave/5` → different gradient
- Progress color: Pass `color` prop to `<ProgressBar />`
- Completion color: `text-moss` → any color

### Change Animations

Framer Motion properties:

- `initial`: Starting state
- `animate`: End state
- `exit`: When removed from DOM
- `transition`: Duration, easing

## Styling

Uses Tailwind CSS with project's custom color system:

- `ink` / `canvas`: Text colors
- `sunrise`: Primary accent (incomplete warning)
- `moss`: Success color (complete state)
- `wave`: Secondary accent
- `/5` `/10` `/40` etc.: Opacity levels

## Testing

### Manual Testing Steps

1. **Check Initial State**
   - Visit dashboard with empty profile
   - Should see 0% with all items listed

2. **Expand/Collapse**
   - Click chevron to expand details
   - Click again to collapse

3. **Dismiss Items**
   - Click X button on a field
   - Item should disappear with animation
   - Should be removed from list

4. **Update Profile**
   - Fill in displayName in user store
   - Component should update percentage
   - Avatar field should show as completed

5. **Completion State**
   - Mark all fields as filled
   - Should show "Profile Complete!" message
   - Progress bar should be 100%

6. **Browser Storage**
   - Check `localStorage.getItem('profile-completion-storage')`
   - Should contain `dismissedItems` array

## Performance

- Store uses Zustand with selectors to prevent unnecessary re-renders
- Only re-renders on specific state changes
- Animations use Framer Motion's optimized transforms
- List items use React.memo internally (via Framer Motion)

## Accessibility

- Buttons have proper `title` attributes
- Progress bar has semantic structure
- Color not sole indicator (includes text labels)
- Expandable content with clear visual state
- Keyboard navigable (links and buttons)

## Future Enhancements

1. **Profile Streak**
   - Track consecutive days of profile updates
   - Show streak counter on indicator

2. **Smart Suggestions**
   - AI-powered recommendations on what to add next
   - Based on category/creator type

3. **Analytics Integration**
   - Show correlation between profile completion and tip revenue
   - A/B test different profile setups

4. **Social Proof**
   - "X% of top creators have this filled"
   - Encourage completion through competition

5. **Milestone Rewards**
   - Unlock badges at 25%, 50%, 75%, 100%
   - Share achievements socially
