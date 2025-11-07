[back](../todo.md)

# Task: Create Database Provider Infrastructure

**Agent**: Frontend Agent  
**Status**: Done

## Objective

Create a React Context provider to make database access available throughout the UI component tree, enabling centralized database management and improved testability.

## Context

Currently, pages like `CategoriesPage` and `ManagePage` directly instantiate `IndexedDBDatabase`, which makes testing difficult and violates separation of concerns. The updated front-end standards specify that cross-cutting concerns like database access should use the provider pattern.

This task establishes the provider infrastructure that subsequent tasks will consume.

## Requirements

Create a provider structure in `src/ui/providers/` that:
- Provides access to the database (`IDatabase` interface) via React Context
- Initializes the database when the provider mounts
- Exposes loading and error states during initialization
- Cleans up the database connection when the provider unmounts
- Exports a custom hook for components to consume the database
- Prevents usage outside the provider (hook should throw error)
- Follows the directory structure and naming conventions in front-end standards

## Acceptance Criteria

- [x] Provider directory structure created in `src/ui/providers/`
- [x] Components can access database through a context hook
- [x] Database initializes automatically when provider mounts
- [x] Database cleanup happens when provider unmounts
- [x] Loading state available while database initializes
- [x] Error state available if initialization fails
- [x] Hook throws meaningful error when used outside provider
- [x] All exports properly exposed through index file
- [x] TypeScript types properly defined
- [x] No linting violations
- [x] Code follows front-end standards

## Dependencies

- Existing `IDatabase` interface in `src/persistence/interfaces.ts`
- Existing `IndexedDBDatabase` implementation

## Reference

- See `docs/standards/front-end.md` for provider pattern guidelines
- See `src/persistence/interfaces.ts` for `IDatabase` interface
