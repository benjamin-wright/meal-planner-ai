[back](../todo.md)

# Task: Test Category Management E2E

**Agent**: QA Agent  
**Status**: Not Started

## Objective

Create comprehensive end-to-end tests for the category management functionality to ensure all user workflows function correctly.

## Requirements

Based on the UI flow defined in `docs/design/ui-flow.md`, create Playwright E2E tests covering:

1. **Navigation Tests**
   - Navigate from Manage hub to Categories page
   - Back button returns to Manage hub

2. **Category CRUD Operations**
   - Create a new category with valid data
   - Create category with validation errors (empty name, duplicate name)
   - Edit an existing category
   - Delete a category (when no items reference it)
   - Attempt to delete a category with items (should be prevented)

3. **Drag and Drop Reordering**
   - Verify drag-and-drop functionality updates sort order
   - Verify categories display in correct order after reordering

4. **Empty State**
   - Verify empty state displays when no categories exist
   - Verify list populates after adding first category

5. **Data Persistence**
   - Create categories and verify they persist after page refresh
   - Edit categories and verify changes persist
   - Delete categories and verify they're removed after refresh

6. **Error Handling**
   - Verify appropriate error messages for validation failures
   - Verify error messages when operations fail

## Dependencies

- Requires completed backend implementation (see `implement-category-repository.md`)
- Requires completed frontend implementation (see `implement-category-management-ui.md`)

## Acceptance Criteria

- [ ] All E2E tests pass successfully
- [ ] Tests cover happy path and error cases
- [ ] Tests verify data persistence
- [ ] Tests follow testing standards defined in `docs/standards/testing.md`
- [ ] Tests use appropriate page objects and selectors
- [ ] No linting violations in test code
- [ ] Task marked as complete in `docs/todo.md`

## Notes

- Create a page object for the Categories page following existing patterns in `tests/page-objects/`
- Ensure tests clean up data to avoid interference between test runs
- Use meaningful test descriptions and organize tests logically
