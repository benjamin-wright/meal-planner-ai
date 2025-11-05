[back](../todo.md)

# Task: Implement Persistence Interface

---
**Agent**: Backend  
**Status**: Complete  
**Priority**: High  
**Dependencies**: Implement Core Data Models  
---

## Overview

Create the persistence layer interface for the meal planning application, establishing the contract for data storage operations without implementing the concrete IndexedDB implementation yet.

## Scope

Define TypeScript interfaces for persistence operations in `src/persistence/` directory:

1. **Repository Interfaces** - One interface per entity type (Category, Unit, Item, Recipe, Meal)
2. **Base Repository Interface** - Common CRUD operations shared across all repositories
3. **Database Interface** - Top-level interface providing access to all repositories

## Requirements

- Create interfaces in `src/persistence/interfaces.ts` (or similar structure)
- All operations must be asynchronous (return Promises)
- Follow the backend standards defined in `docs/standards/back-end.md`
- Include operations for:
  - Create (single entity)
  - Read (by ID, get all, and relevant queries per entity type)
  - Update (single entity)
  - Delete (single entity)
- Consider the query patterns outlined in the data model's "Indexing Strategy" section
- Do not implement the actual IndexedDB code - this task is interface-only

## Acceptance Criteria

- [x] Base repository interface defines common CRUD operations
- [x] Each entity has a dedicated repository interface with entity-specific query methods
- [x] All methods are asynchronous (return Promise<T>)
- [x] Repository interfaces include methods for:
  - Categories: getByName, getAll (with optional sort)
  - Units: getByName, getByType, getAll
  - Items: getByName, getByCategory, getByItemType, getAll
  - Recipes: getByName, getByDish, getByCourse, getAll
  - Meals: getByDate, getByDateRange, getAll
- [x] Database interface provides access to all repositories
- [x] JSDoc comments explain the purpose of each interface and method
- [x] Code compiles without errors

## Notes

- This establishes the contract that the IndexedDB implementation will fulfill
- Keeping this separate allows for potential future swapping of storage implementations
- The concrete implementation will be a follow-up task
