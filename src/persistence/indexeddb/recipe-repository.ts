/**
 * IndexedDB implementation of the Recipe repository.
 * 
 * Provides data access operations for Recipe entities using IndexedDB.
 */

import type { Recipe, DishType, CourseType } from '../../models/index.js';
import type { IRecipeRepository } from '../interfaces.js';
import {
  STORES,
  executeReadTransaction,
  executeWriteTransaction,
  executeCursorQuery,
  serializeDates,
  deserializeDates,
} from './database.js';

/**
 * IndexedDB implementation of IRecipeRepository.
 */
export class RecipeRepository implements IRecipeRepository {
  private db: IDBDatabase;

  constructor(db: IDBDatabase) {
    this.db = db;
  }

  /**
   * Create a new recipe in the database.
   * 
   * @param recipe - The recipe to create
   * @returns A promise resolving to the created recipe
   * @throws Error if validation fails
   */
  async create(recipe: Recipe): Promise<Recipe> {
    const serialized = serializeDates(recipe as unknown as Record<string, unknown>);
    await executeWriteTransaction(
      this.db,
      STORES.RECIPES,
      (store) => store.add(serialized)
    );

    return recipe;
  }

  /**
   * Retrieve a recipe by its unique identifier.
   * 
   * @param id - The unique identifier of the recipe
   * @returns A promise resolving to the recipe if found, null otherwise
   */
  async getById(id: string): Promise<Recipe | null> {
    const result = await executeReadTransaction(
      this.db,
      STORES.RECIPES,
      (store) => store.get(id)
    );

    if (!result) {
      return null;
    }

    return deserializeDates<Recipe>(result, ['createdAt', 'updatedAt']);
  }

  /**
   * Retrieve all recipes.
   * 
   * @returns A promise resolving to an array of recipes
   */
  async getAll(): Promise<Recipe[]> {
    const results = await executeCursorQuery<Record<string, unknown>>(
      this.db,
      STORES.RECIPES,
      (store) => store.openCursor()
    );

    return results.map((result) =>
      deserializeDates<Recipe>(result, ['createdAt', 'updatedAt'])
    );
  }

  /**
   * Count the total number of recipes.
   * 
   * @returns A promise resolving to the count of recipes
   */
  async count(): Promise<number> {
    return await executeReadTransaction(
      this.db,
      STORES.RECIPES,
      (store) => store.count()
    );
  }

  /**
   * Update an existing recipe in the database.
   * 
   * @param recipe - The recipe with updated values
   * @returns A promise resolving to the updated recipe
   * @throws Error if the recipe does not exist
   */
  async update(recipe: Recipe): Promise<Recipe> {
    // Check if recipe exists
    const existing = await this.getById(recipe.id);
    if (!existing) {
      throw new Error(`Recipe with id "${recipe.id}" does not exist`);
    }

    const serialized = serializeDates(recipe as unknown as Record<string, unknown>);
    await executeWriteTransaction(
      this.db,
      STORES.RECIPES,
      (store) => store.put(serialized)
    );

    return recipe;
  }

  /**
   * Delete a recipe from the database.
   * 
   * Note: This implementation does not check referential integrity with Meals.
   * Future enhancement: check for Meals using this recipe and prevent deletion.
   * 
   * @param id - The unique identifier of the recipe to delete
   * @returns A promise resolving to true if deleted, false if not found
   */
  async delete(id: string): Promise<boolean> {
    const existing = await this.getById(id);
    if (!existing) {
      return false;
    }

    await executeWriteTransaction(
      this.db,
      STORES.RECIPES,
      (store) => store.delete(id)
    );

    return true;
  }

  /**
   * Retrieve a recipe by its name.
   * 
   * Note: The name index is not unique, so this returns the first match found.
   * 
   * @param name - The recipe name to search for (case-insensitive)
   * @returns A promise resolving to the recipe if found, null otherwise
   */
  async getByName(name: string): Promise<Recipe | null> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(STORES.RECIPES, 'readonly');
      const store = transaction.objectStore(STORES.RECIPES);
      const index = store.index('name');
      const request = index.get(name);

      request.onsuccess = () => {
        if (!request.result) {
          resolve(null);
        } else {
          resolve(deserializeDates<Recipe>(request.result, ['createdAt', 'updatedAt']));
        }
      };

      request.onerror = () => {
        reject(new Error(`Failed to get recipe by name: ${request.error?.message}`));
      };
    });
  }

  /**
   * Retrieve all recipes for a specific dish type.
   * 
   * @param dish - The dish type (breakfast, lunch, dinner, or dessert)
   * @returns A promise resolving to an array of matching recipes
   */
  async getByDish(dish: DishType): Promise<Recipe[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(STORES.RECIPES, 'readonly');
      const store = transaction.objectStore(STORES.RECIPES);
      const index = store.index('dish');
      const request = index.openCursor(IDBKeyRange.only(dish));
      const results: Recipe[] = [];

      request.onsuccess = () => {
        const cursor = request.result;
        if (cursor) {
          results.push(deserializeDates<Recipe>(cursor.value, ['createdAt', 'updatedAt']));
          cursor.continue();
        } else {
          resolve(results);
        }
      };

      request.onerror = () => {
        reject(new Error(`Failed to get recipes by dish: ${request.error?.message}`));
      };
    });
  }

  /**
   * Retrieve all recipes for a specific course type.
   * 
   * @param course - The course type (starter, main, or side)
   * @returns A promise resolving to an array of matching recipes
   */
  async getByCourse(course: CourseType): Promise<Recipe[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(STORES.RECIPES, 'readonly');
      const store = transaction.objectStore(STORES.RECIPES);
      const index = store.index('course');
      const request = index.openCursor(IDBKeyRange.only(course));
      const results: Recipe[] = [];

      request.onsuccess = () => {
        const cursor = request.result;
        if (cursor) {
          results.push(deserializeDates<Recipe>(cursor.value, ['createdAt', 'updatedAt']));
          cursor.continue();
        } else {
          resolve(results);
        }
      };

      request.onerror = () => {
        reject(new Error(`Failed to get recipes by course: ${request.error?.message}`));
      };
    });
  }
}
