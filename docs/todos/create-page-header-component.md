[back](../todo.md)

# Task: Create PageHeader Component

## Objective
Create a reusable `PageHeader` component to eliminate duplication across the manage sub-pages (Categories, Units, Items, Recipes).

## Background
Currently, four page view components (`CategoriesPage-view.tsx`, `UnitsPage-view.tsx`, `ItemsPage-view.tsx`, `RecipesPage-view.tsx`) contain identical page header markup with a back button and title. This duplication makes maintenance difficult and increases the risk of inconsistencies.

## Requirements
1. Create a new reusable component `src/ui/components/PageHeader.tsx` that encapsulates:
   - A back button with `ArrowLeftIcon`
   - A configurable title (h1)
   - Proper accessibility attributes (aria-label)
   - CSS class `page-header` wrapper

2. Component should accept props:
   - `title: string` - The page title to display
   - `onBack: () => void` - The back navigation handler
   - Optional: `backLabel?: string` - Custom aria-label for the back button (default: "Back to Manage")

3. Update all four affected page view components to use the new `PageHeader` component

4. Export the component from `src/ui/components/index.ts`

5. Create a Storybook story (`PageHeader.stories.tsx`) demonstrating:
   - Default state
   - With custom back label
   - Different title lengths

## Files to Modify
- Create: `src/ui/components/PageHeader.tsx`
- Create: `src/ui/components/PageHeader.stories.tsx`
- Update: `src/ui/components/index.ts`
- Update: `src/ui/pages/CategoriesPage/CategoriesPage-view.tsx`
- Update: `src/ui/pages/UnitsPage/UnitsPage-view.tsx`
- Update: `src/ui/pages/ItemsPage/ItemsPage-view.tsx`
- Update: `src/ui/pages/RecipesPage/RecipesPage-view.tsx`

## Success Criteria
- No code duplication for page headers across manage sub-pages
- All four pages render identically to before
- Component is properly documented with Storybook
- All existing tests continue to pass
- Linting passes with no errors
