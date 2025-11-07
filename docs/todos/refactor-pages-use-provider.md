[back](../todo.md)

# Task: Refactor Pages to Use Database Provider

**Agent**: Frontend Agent  
**Status**: Not Started

## Objective

Update all pages that currently create their own database instances to instead consume the shared database from `DatabaseProvider`.

## Context

Pages like `CategoriesPage` and `ManagePage` currently instantiate `IndexedDBDatabase` directly. With `DatabaseProvider` now integrated, these pages should consume the database from context instead.

## Requirements

Update the following pages to use the database provider:
- `src/ui/pages/CategoriesPage/CategoriesPage.tsx`
- `src/ui/pages/ManagePage/ManagePage.tsx`

For each page:
- Remove direct database instantiation
- Consume database from the provider's context hook
- Remove database initialization logic (already handled by provider)
- Handle loading state if database is not yet available
- Ensure all existing functionality continues to work

## Acceptance Criteria

- [ ] `CategoriesPage` uses database from provider
- [ ] `ManagePage` uses database from provider
- [ ] No direct `IndexedDBDatabase` instantiation in UI code
- [ ] All CRUD operations work correctly
- [ ] Loading state handled appropriately
- [ ] No TypeScript errors or warnings
- [ ] No linting violations
- [ ] Application functionality preserved

## Dependencies

- Requires completed `create-database-provider.md` task
- Requires completed `integrate-database-provider.md` task
- Database provider must be integrated into the application

## Reference

- See `docs/standards/front-end.md` for provider usage guidelines
- See current page implementations for existing database usage patterns
