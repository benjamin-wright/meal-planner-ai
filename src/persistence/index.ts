/**
 * Persistence layer for the Meal Planner AI application.
 * 
 * This module exports all repository and database interfaces used for
 * data access operations, as well as the default IndexedDB implementation.
 */

export type {
  IBaseRepository,
  ICategoryRepository,
  IUnitRepository,
  IItemRepository,
  IRecipeRepository,
  IMealRepository,
  IDatabase,
} from './interfaces.js';

export { IndexedDBDatabase } from './indexeddb/index.js';
