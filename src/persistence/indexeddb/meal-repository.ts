/**
 * IndexedDB implementation of the Meal repository.
 * 
 * Provides data access operations for Meal entities using IndexedDB.
 */

import type { Meal } from '../../models/index.js';
import type { IMealRepository } from '../interfaces.js';
import {
  STORES,
  executeReadTransaction,
  executeWriteTransaction,
  executeCursorQuery,
  serializeDates,
  deserializeDates,
} from './database.js';

/**
 * IndexedDB implementation of IMealRepository.
 */
export class MealRepository implements IMealRepository {
  private db: IDBDatabase;

  constructor(db: IDBDatabase) {
    this.db = db;
  }

  /**
   * Create a new meal in the database.
   * 
   * @param meal - The meal to create
   * @returns A promise resolving to the created meal
   * @throws Error if validation fails
   */
  async create(meal: Meal): Promise<Meal> {
    const serialized = serializeDates(meal as unknown as Record<string, unknown>);
    await executeWriteTransaction(
      this.db,
      STORES.MEALS,
      (store) => store.add(serialized)
    );

    return meal;
  }

  /**
   * Retrieve a meal by its unique identifier.
   * 
   * @param id - The unique identifier of the meal
   * @returns A promise resolving to the meal if found, null otherwise
   */
  async getById(id: string): Promise<Meal | null> {
    const result = await executeReadTransaction(
      this.db,
      STORES.MEALS,
      (store) => store.get(id)
    );

    if (!result) {
      return null;
    }

    return deserializeDates<Meal>(result, ['createdAt', 'updatedAt']);
  }

  /**
   * Retrieve all meals.
   * 
   * @returns A promise resolving to an array of meals
   */
  async getAll(): Promise<Meal[]> {
    const results = await executeCursorQuery<Record<string, unknown>>(
      this.db,
      STORES.MEALS,
      (store) => store.openCursor()
    );

    return results.map((result) =>
      deserializeDates<Meal>(result, ['createdAt', 'updatedAt'])
    );
  }

  /**
   * Count the total number of meals.
   * 
   * @returns A promise resolving to the count of meals
   */
  async count(): Promise<number> {
    return await executeReadTransaction(
      this.db,
      STORES.MEALS,
      (store) => store.count()
    );
  }

  /**
   * Update an existing meal in the database.
   * 
   * @param meal - The meal with updated values
   * @returns A promise resolving to the updated meal
   * @throws Error if the meal does not exist
   */
  async update(meal: Meal): Promise<Meal> {
    // Check if meal exists
    const existing = await this.getById(meal.id);
    if (!existing) {
      throw new Error(`Meal with id "${meal.id}" does not exist`);
    }

    const serialized = serializeDates(meal as unknown as Record<string, unknown>);
    await executeWriteTransaction(
      this.db,
      STORES.MEALS,
      (store) => store.put(serialized)
    );

    return meal;
  }

  /**
   * Delete a meal from the database.
   * 
   * @param id - The unique identifier of the meal to delete
   * @returns A promise resolving to true if deleted, false if not found
   */
  async delete(id: string): Promise<boolean> {
    const existing = await this.getById(id);
    if (!existing) {
      return false;
    }

    await executeWriteTransaction(
      this.db,
      STORES.MEALS,
      (store) => store.delete(id)
    );

    return true;
  }

  /**
   * Retrieve all meals planned for a specific date.
   * 
   * @param date - The date in ISO 8601 format (YYYY-MM-DD)
   * @returns A promise resolving to an array of meals on that date
   */
  async getByDate(date: string): Promise<Meal[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(STORES.MEALS, 'readonly');
      const store = transaction.objectStore(STORES.MEALS);
      const index = store.index('date');
      const request = index.openCursor(IDBKeyRange.only(date));
      const results: Meal[] = [];

      request.onsuccess = () => {
        const cursor = request.result;
        if (cursor) {
          results.push(deserializeDates<Meal>(cursor.value, ['createdAt', 'updatedAt']));
          cursor.continue();
        } else {
          resolve(results);
        }
      };

      request.onerror = () => {
        reject(new Error(`Failed to get meals by date: ${request.error?.message}`));
      };
    });
  }

  /**
   * Retrieve all meals within a date range (inclusive).
   * 
   * @param startDate - The start date in ISO 8601 format (YYYY-MM-DD)
   * @param endDate - The end date in ISO 8601 format (YYYY-MM-DD)
   * @returns A promise resolving to an array of meals in the range, sorted by date
   */
  async getByDateRange(startDate: string, endDate: string): Promise<Meal[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(STORES.MEALS, 'readonly');
      const store = transaction.objectStore(STORES.MEALS);
      const index = store.index('date');
      const range = IDBKeyRange.bound(startDate, endDate);
      const request = index.openCursor(range);
      const results: Meal[] = [];

      request.onsuccess = () => {
        const cursor = request.result;
        if (cursor) {
          results.push(deserializeDates<Meal>(cursor.value, ['createdAt', 'updatedAt']));
          cursor.continue();
        } else {
          // Results are already sorted by the index
          resolve(results);
        }
      };

      request.onerror = () => {
        reject(new Error(`Failed to get meals by date range: ${request.error?.message}`));
      };
    });
  }
}
