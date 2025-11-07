[back](../todo.md)

# Task: Refactor Icon Components to Reduce Boilerplate

## Objective
Create a base icon component or utility to reduce boilerplate code across all icon components while maintaining their current API.

## Background
All 9 icon components (`ArrowLeftIcon`, `CalendarIcon`, `CategoryIcon`, `ChevronRightIcon`, `ItemIcon`, `RecipeIcon`, `SettingsIcon`, `ShoppingCartIcon`, `UnitIcon`) share identical boilerplate:
- Same `IconProps` interface definition
- Same SVG wrapper attributes (width, height, viewBox, stroke attributes, aria-hidden)
- Only the internal SVG paths differ

This duplication makes it harder to update icon properties consistently (e.g., if we want to change default size or add new props).

## Requirements
1. Create a base component `src/ui/components/icons/Icon.tsx` that:
   - Accepts common props: `className`, `size` (default: 24)
   - Accepts `children` for the SVG path content
   - Provides consistent SVG wrapper with standard attributes
   - Maintains current styling and accessibility

2. Refactor all existing icon components to use the base component:
   - Each icon should only define its unique SVG path content
   - Maintain current exports and API (no breaking changes)
   - Icons should still be individually importable

3. Update the shared `IconProps` interface to a single location

4. Ensure all icons continue to work in:
   - BottomNav component
   - Page headers
   - NavigationCard components
   - Storybook stories

## Files to Create/Modify
- Create: `src/ui/components/icons/Icon.tsx`
- Update: All icon files in `src/ui/components/icons/`:
  - `ArrowLeftIcon.tsx`
  - `CalendarIcon.tsx`
  - `CategoryIcon.tsx`
  - `ChevronRightIcon.tsx`
  - `ItemIcon.tsx`
  - `RecipeIcon.tsx`
  - `SettingsIcon.tsx`
  - `ShoppingCartIcon.tsx`
  - `UnitIcon.tsx`
- Consider updating: `src/ui/components/icons/Icons.stories.tsx` if needed

## Technical Notes
- This is a refactoring task - no visual or functional changes should occur
- All existing icon usage should remain unchanged
- Consider making the base Icon component private (not exported from index.ts)

## Success Criteria
- All icon components use the new base Icon component
- No duplication of SVG wrapper code or IconProps interface
- All icons render identically to before
- All components using icons continue to work
- All existing tests continue to pass
- Linting passes with no errors
- Storybook stories still work correctly
