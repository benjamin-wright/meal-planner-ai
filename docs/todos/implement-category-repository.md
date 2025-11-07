[back](../todo.md)

# Task: Implement Category Repository Layer

**Agent**: Backend Agent  
**Status**: Not Started

## Objective

Implement the persistence layer for Category entities, including the repository implementation and necessary service functions to support CRUD operations.

## Requirements

Based on the data model defined in `docs/design/data-model.md` and the UI flow described in `docs/design/ui-flow.md`, implement:

1. **Category Repository** (`src/persistence/indexeddb/category-repository.ts`)
   - Implement all methods defined in `ICategoryRepository` interface
   - Support CRUD operations (create, read, update, delete)
   - Implement `getByName()` for uniqueness validation
   - Implement `getAll()` with optional sorting by `sortOrder`
   - Ensure referential integrity (prevent deletion if items reference the category)

2. **Validation Logic**
   - Category name must be unique (case-insensitive)
   - Category name cannot be empty or whitespace only
   - Sort order must be non-negative if provided

3. **Unit Tests**
   - Write comprehensive unit tests for the category repository
   - Test all CRUD operations
   - Test validation rules
   - Test referential integrity constraints
   - Test sorting behavior

## Acceptance Criteria

- [ ] Category repository fully implements `ICategoryRepository`
- [ ] All validation rules are enforced
- [ ] Referential integrity is maintained (categories with items cannot be deleted)
- [ ] Unit tests pass with good coverage
- [ ] No linting violations (`npm run lint` passes)
- [ ] Code follows backend standards defined in `docs/standards/back-end.md`

## Notes

- The repository should use IndexedDB as the underlying persistence mechanism
- Category repository is already referenced in the persistence interfaces at `src/persistence/interfaces.ts`
- Check existing repository implementations (e.g., `unit-repository.ts`) as reference patterns
