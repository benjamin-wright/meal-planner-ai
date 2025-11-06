[back](../todo.md)

# Task: Refactor Manage Page to Hub Layout

## Overview

The UI flow design has been updated to transform the Manage section from a tab-based interface into a hub-style layout with navigation cards. This change provides better mobile usability and clearer navigation to dedicated resource management pages.

## Current State

The `ManagePage` currently uses:
- A tab-based navigation bar with links to Categories, Units, Items, and Recipes
- An `<Outlet />` component that renders nested route content
- Tab navigation via `NavLink` components styled with active states

## Target State

According to the updated UI flow (`docs/design/ui-flow.md`), the Manage Hub should display:

**Elements**:
- Page header: "Manage"
- (Optional) Summary cards at the top showing:
  - Total categories count
  - Total units count
  - Total items count
  - Total recipes count
- Grid of navigation cards, each displaying:
  - Icon representing the resource type
  - Resource type name (Categories, Units, Items, Recipes)
  - Count of resources (e.g., "12 categories")
  - Arrow or chevron indicating it's a link
- Cards should be large, touch-friendly buttons optimized for mobile

**Navigation**:
- Tap a card to navigate to the corresponding dedicated management page:
  - Categories → Categories List Screen
  - Units → Units List Screen
  - Items → Items List Screen
  - Recipes → Recipes List Screen

## Required Changes

### 1. Update ManagePage Component

Transform `src/ui/pages/ManagePage.tsx` from a layout component with tabs to a hub page with navigation cards:

- Remove the tab-based navigation (`manage-tabs`)
- Remove the `<Outlet />` component (since this is now a destination page, not a layout)
- Create a grid of navigation cards for Categories, Units, Items, and Recipes
- Each card should:
  - Display an icon (use existing Icons component or create new icons if needed)
  - Show the resource type name
  - Display a count of resources (will need to fetch from persistence layer)
  - Include a visual indicator (arrow/chevron) that it's clickable
  - Be styled as a large, touch-friendly button
  - Navigate to the appropriate route when clicked

### 2. Update Routing Structure

Update `src/App.tsx` routing configuration:

- Change the `/manage` route from a layout with nested routes to a simple route
- Move the Categories, Units, Items, and Recipes routes to be direct children of MainLayout
- Ensure proper routing paths:
  - `/manage` → Manage Hub page
  - `/manage/categories` → Categories List Screen
  - `/manage/units` → Units List Screen
  - `/manage/items` → Items List Screen
  - `/manage/recipes` → Recipes List Screen
  - `/manage/recipes/:id` → Recipe Detail Page (keep as nested under recipes)

### 3. Update Individual Resource Pages

Update the individual resource list pages (`CategoriesPage`, `UnitsPage`, `ItemsPage`, `RecipesPage`) to include:

- A "Back" button that returns to the Manage Hub (`/manage`)
- Page headers that clearly identify the resource type
- Keep all existing functionality intact

### 4. Styling Updates

Update `src/ui/pages/ManagePage.css`:

- Remove tab-related styles
- Add styles for the navigation card grid
- Ensure cards are touch-friendly (minimum 44x44px touch targets)
- Use appropriate spacing and visual hierarchy
- Consider mobile-first responsive design

### 5. Optional: Resource Counts

If feasible, display resource counts on each navigation card:
- Fetch counts from the persistence layer
- Display asynchronously (show loading state if needed)
- Handle errors gracefully

If implementing counts adds significant complexity, this can be deferred as a future enhancement.

## Acceptance Criteria

- [ ] ManagePage displays as a hub with navigation cards instead of tabs
- [ ] Each card navigates to the correct resource management page
- [ ] Individual resource pages have a back button to return to the hub
- [ ] Routing structure properly supports the new navigation pattern
- [ ] UI is mobile-friendly with appropriate touch targets
- [ ] All existing functionality on resource pages remains intact
- [ ] No console errors or warnings
- [ ] Changes align with front-end standards in `docs/standards.md`

## References

- UI Flow Design: `docs/design/ui-flow.md` (Section 2: Manage Hub)
- Current Implementation: `src/ui/pages/ManagePage.tsx`
- Routing Configuration: `src/App.tsx`
- Icons Component: `src/ui/components/Icons.tsx`
