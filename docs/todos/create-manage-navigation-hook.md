[back](../todo.md)

# Task: Create useManageNavigation Hook

## Objective
Create a custom React hook to eliminate duplication in the smart page components that navigate back to the manage hub.

## Background
Four smart page components (`CategoriesPage.tsx`, `UnitsPage.tsx`, `ItemsPage.tsx`, `RecipesPage.tsx`) contain identical logic for handling navigation back to `/manage`. This pattern should be abstracted into a reusable hook.

## Requirements
1. Create a new custom hook `src/ui/hooks/useManageNavigation.ts` that:
   - Uses `useNavigate` from react-router-dom internally
   - Returns an object with a `navigateBack` function that navigates to `/manage`
   - Could be extended in the future for additional navigation helpers

2. Create a hooks directory if it doesn't exist: `src/ui/hooks/`

3. Update all four affected smart page components to use the new hook:
   - Replace `useNavigate` and `navigate('/manage')` pattern
   - Use the hook's `navigateBack` function

4. Export the hook from `src/ui/hooks/index.ts`

## Files to Create/Modify
- Create: `src/ui/hooks/useManageNavigation.ts`
- Create: `src/ui/hooks/index.ts`
- Update: `src/ui/pages/CategoriesPage/CategoriesPage.tsx`
- Update: `src/ui/pages/UnitsPage/UnitsPage.tsx`
- Update: `src/ui/pages/ItemsPage/ItemsPage.tsx`
- Update: `src/ui/pages/RecipesPage/RecipesPage.tsx`

## Technical Notes
- The hook should follow React hooks conventions (start with `use`)
- Keep it simple - no need to make it overly generic at this stage
- The hook can be extended later if other manage-related navigation patterns emerge

## Success Criteria
- All four smart page components use the new hook
- Navigation functionality works identically to before
- Code is more maintainable with reduced duplication
- All existing tests continue to pass
- Linting passes with no errors
