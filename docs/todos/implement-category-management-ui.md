[back](../todo.md)

# Task: Implement Category Management UI

**Agent**: Frontend Agent  
**Status**: Not Started

## Objective

Implement the complete user interface for managing categories as described in the UI flow documentation, including list view, add/edit forms, and delete functionality.

## Requirements

Based on the UI flow defined in `docs/design/ui-flow.md` (Section 3: Category Management), implement:

1. **Categories List View** (`CategoriesPage-view.tsx`)
   - Page header with back button (already exists)
   - "Add Category" button
   - Sortable/draggable list of categories showing:
     - Category name
     - Item count (number of items in category)
     - Edit and delete action buttons
   - Support drag-and-drop reordering (updates `sortOrder` field)
   - Empty state when no categories exist

2. **Add/Edit Category Form Component**
   - Modal or inline form with:
     - Name input (required)
     - Sort order input (optional, numeric)
     - Save and Cancel buttons
   - Form validation:
     - Name cannot be empty or whitespace only
     - Name must be unique
   - Display validation errors clearly
   - Pre-populate data when editing

3. **Delete Confirmation**
   - Show confirmation dialog before deletion
   - Prevent deletion if items reference the category (with clear error message)

4. **Integration** (`CategoriesPage.tsx`)
   - Load categories from repository
   - Handle add/edit/delete operations
   - Handle reordering with drag-and-drop
   - Show success/error messages for operations

5. **Storybook Stories**
   - Create stories for the CategoriesPage-view component showing:
     - Empty state
     - List with multiple categories
     - Add form state
     - Edit form state
     - Delete confirmation state

## Dependencies

- Requires completed backend implementation of category repository (see `implement-category-repository.md`)
- Wait for backend task completion before implementing data operations

## Acceptance Criteria

- [ ] Categories list displays all categories with correct information
- [ ] Add category form validates and creates new categories
- [ ] Edit category form pre-populates and updates existing categories
- [ ] Delete functionality works with proper confirmation
- [ ] Drag-and-drop reordering updates sort order correctly
- [ ] Empty state is shown when no categories exist
- [ ] All validation rules are enforced in the UI
- [ ] Storybook stories are created for all visual states
- [ ] Components follow front-end standards defined in `docs/standards/front-end.md`
- [ ] Navigation works correctly (back button returns to Manage hub)
- [ ] UI is mobile-optimized and touch-friendly

## Notes

- Use Framer Motion Reorder component for drag-and-drop functionality
- Follow the component structure pattern used in other management pages
- Ensure all interactive elements have proper aria-labels for accessibility
- Keep the implementation simple and focused on the requirements
