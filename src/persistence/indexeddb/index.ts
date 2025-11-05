/**
 * IndexedDB implementation of the persistence layer.
 * 
 * This module provides the concrete IndexedDB implementation of the database
 * and repository interfaces.
 */

import type { IDatabase } from '../interfaces.js';
import { initializeDatabase, closeDatabase } from './database.js';
import { CategoryRepository } from './category-repository.js';
import { UnitRepository } from './unit-repository.js';
import { ItemRepository } from './item-repository.js';
import { RecipeRepository } from './recipe-repository.js';
import { MealRepository } from './meal-repository.js';

/**
 * IndexedDB implementation of the IDatabase interface.
 * 
 * Provides centralized access to all repositories and manages the database
 * connection lifecycle.
 */
export class IndexedDBDatabase implements IDatabase {
  private db: IDBDatabase | null = null;
  private categoryRepo: CategoryRepository | null = null;
  private unitRepo: UnitRepository | null = null;
  private itemRepo: ItemRepository | null = null;
  private recipeRepo: RecipeRepository | null = null;
  private mealRepo: MealRepository | null = null;

  /**
   * Access the Category repository.
   * 
   * @throws Error if database has not been initialized
   */
  get categories(): CategoryRepository {
    if (!this.categoryRepo) {
      throw new Error('Database not initialized. Call initialize() first.');
    }
    return this.categoryRepo;
  }

  /**
   * Access the Unit repository.
   * 
   * @throws Error if database has not been initialized
   */
  get units(): UnitRepository {
    if (!this.unitRepo) {
      throw new Error('Database not initialized. Call initialize() first.');
    }
    return this.unitRepo;
  }

  /**
   * Access the Item repository.
   * 
   * @throws Error if database has not been initialized
   */
  get items(): ItemRepository {
    if (!this.itemRepo) {
      throw new Error('Database not initialized. Call initialize() first.');
    }
    return this.itemRepo;
  }

  /**
   * Access the Recipe repository.
   * 
   * @throws Error if database has not been initialized
   */
  get recipes(): RecipeRepository {
    if (!this.recipeRepo) {
      throw new Error('Database not initialized. Call initialize() first.');
    }
    return this.recipeRepo;
  }

  /**
   * Access the Meal repository.
   * 
   * @throws Error if database has not been initialized
   */
  get meals(): MealRepository {
    if (!this.mealRepo) {
      throw new Error('Database not initialized. Call initialize() first.');
    }
    return this.mealRepo;
  }

  /**
   * Initialize the database connection and schema.
   * 
   * Creates the database if it doesn't exist and sets up all object stores
   * and indices. This method must be called before accessing any repositories.
   * 
   * @returns A promise that resolves when the database is ready
   * @throws Error if initialization fails
   */
  async initialize(): Promise<void> {
    if (this.db) {
      // Already initialized
      return;
    }

    this.db = await initializeDatabase();
    
    // Initialize all repositories
    this.categoryRepo = new CategoryRepository(this.db);
    this.unitRepo = new UnitRepository(this.db);
    this.itemRepo = new ItemRepository(this.db);
    this.recipeRepo = new RecipeRepository(this.db);
    this.mealRepo = new MealRepository(this.db);
  }

  /**
   * Close the database connection and clean up resources.
   * 
   * After calling this method, the database instance cannot be used until
   * initialize() is called again.
   * 
   * @returns A promise that resolves when cleanup is complete
   */
  async close(): Promise<void> {
    if (this.db) {
      closeDatabase(this.db);
      this.db = null;
      this.categoryRepo = null;
      this.unitRepo = null;
      this.itemRepo = null;
      this.recipeRepo = null;
      this.mealRepo = null;
    }
  }
}

/**
 * Export all repository implementations for potential direct use.
 */
export { CategoryRepository } from './category-repository.js';
export { UnitRepository } from './unit-repository.js';
export { ItemRepository } from './item-repository.js';
export { RecipeRepository } from './recipe-repository.js';
export { MealRepository } from './meal-repository.js';
