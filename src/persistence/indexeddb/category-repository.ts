/**
 * IndexedDB implementation of the Category repository.
 * 
 * Provides data access operations for Category entities using IndexedDB.
 */

import type { Category } from '../../models/index.js';
import type { ICategoryRepository } from '../interfaces.js';
import {
  STORES,
  executeReadTransaction,
  executeWriteTransaction,
  executeCursorQuery,
  serializeDates,
  deserializeDates,
} from './database.js';

/**
 * IndexedDB implementation of ICategoryRepository.
 */
export class CategoryRepository implements ICategoryRepository {
  private db: IDBDatabase;

  constructor(db: IDBDatabase) {
    this.db = db;
  }

  /**
   * Create a new category in the database.
   * 
   * @param category - The category to create
   * @returns A promise resolving to the created category
   * @throws Error if validation fails or a category with the same name already exists
   */
  async create(category: Category): Promise<Category> {
    // Validate name
    if (!category.name || category.name.trim().length === 0) {
      throw new Error('Category name cannot be empty or whitespace only');
    }

    // Validate sortOrder
    if (category.sortOrder !== undefined && category.sortOrder < 0) {
      throw new Error('Category sortOrder must be non-negative');
    }

    // Coerce name to lowercase
    const normalizedCategory: Category = {
      ...category,
      name: category.name.toLowerCase(),
    };

    // Check if name already exists
    const existing = await this.getByName(normalizedCategory.name);
    if (existing) {
      throw new Error(`Category with name "${normalizedCategory.name}" already exists`);
    }

    const serialized = serializeDates(normalizedCategory as unknown as Record<string, unknown>);
    await executeWriteTransaction(
      this.db,
      STORES.CATEGORIES,
      (store) => store.add(serialized)
    );

    return normalizedCategory;
  }

  /**
   * Retrieve a category by its unique identifier.
   * 
   * @param id - The unique identifier of the category
   * @returns A promise resolving to the category if found, null otherwise
   */
  async getById(id: string): Promise<Category | null> {
    const result = await executeReadTransaction(
      this.db,
      STORES.CATEGORIES,
      (store) => store.get(id)
    );

    if (!result) {
      return null;
    }

    return deserializeDates<Category>(result, ['createdAt', 'updatedAt']);
  }

  /**
   * Retrieve all categories, optionally sorted by sortOrder.
   * 
   * @param sorted - If true, sort by sortOrder ascending, then by name
   * @returns A promise resolving to an array of categories
   */
  async getAll(sorted = false): Promise<Category[]> {
    const results = await executeCursorQuery<Record<string, unknown>>(
      this.db,
      STORES.CATEGORIES,
      (store) => store.openCursor()
    );

    const categories = results.map((result) =>
      deserializeDates<Category>(result, ['createdAt', 'updatedAt'])
    );

    if (sorted) {
      return categories.sort((a, b) => {
        // Sort by sortOrder first (undefined sorts to end)
        const orderA = a.sortOrder ?? Number.MAX_SAFE_INTEGER;
        const orderB = b.sortOrder ?? Number.MAX_SAFE_INTEGER;

        if (orderA !== orderB) {
          return orderA - orderB;
        }

        // Then by name
        return a.name.localeCompare(b.name);
      });
    }

    return categories;
  }

  /**
   * Count the total number of categories.
   * 
   * @returns A promise resolving to the count of categories
   */
  async count(): Promise<number> {
    return await executeReadTransaction(
      this.db,
      STORES.CATEGORIES,
      (store) => store.count()
    );
  }

  /**
   * Update an existing category in the database.
   * 
   * @param category - The category with updated values
   * @returns A promise resolving to the updated category
   * @throws Error if validation fails, the category does not exist, or name conflicts with another category
   */
  async update(category: Category): Promise<Category> {
    // Validate name
    if (!category.name || category.name.trim().length === 0) {
      throw new Error('Category name cannot be empty or whitespace only');
    }

    // Validate sortOrder
    if (category.sortOrder !== undefined && category.sortOrder < 0) {
      throw new Error('Category sortOrder must be non-negative');
    }

    // Check if category exists
    const existing = await this.getById(category.id);
    if (!existing) {
      throw new Error(`Category with id "${category.id}" does not exist`);
    }

    // Coerce name to lowercase
    const normalizedCategory: Category = {
      ...category,
      name: category.name.toLowerCase(),
    };

    // Check if name conflicts with a different category
    const nameConflict = await this.getByName(normalizedCategory.name);
    if (nameConflict && nameConflict.id !== category.id) {
      throw new Error(`Category with name "${normalizedCategory.name}" already exists`);
    }

    const serialized = serializeDates(normalizedCategory as unknown as Record<string, unknown>);
    await executeWriteTransaction(
      this.db,
      STORES.CATEGORIES,
      (store) => store.put(serialized)
    );

    return normalizedCategory;
  }

  /**
   * Delete a category from the database.
   * 
   * Enforces referential integrity by preventing deletion if any items reference this category.
   * 
   * @param id - The unique identifier of the category to delete
   * @returns A promise resolving to true if deleted, false if not found
   * @throws Error if items reference this category
   */
  async delete(id: string): Promise<boolean> {
    const existing = await this.getById(id);
    if (!existing) {
      return false;
    }

    // Check referential integrity - prevent deletion if items reference this category
    const itemCount = await this.countItemsByCategory(id);
    if (itemCount > 0) {
      throw new Error(
        `Cannot delete category "${existing.name}" because ${itemCount} item(s) reference it`
      );
    }

    await executeWriteTransaction(
      this.db,
      STORES.CATEGORIES,
      (store) => store.delete(id)
    );

    return true;
  }

  /**
   * Retrieve a category by its name.
   * 
   * @param name - The category name to search for (should be lowercase)
   * @returns A promise resolving to the category if found, null otherwise
   */
  async getByName(name: string): Promise<Category | null> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(STORES.CATEGORIES, 'readonly');
      const store = transaction.objectStore(STORES.CATEGORIES);
      const index = store.index('name');
      const request = index.get(name);

      request.onsuccess = () => {
        if (!request.result) {
          resolve(null);
        } else {
          resolve(deserializeDates<Category>(request.result, ['createdAt', 'updatedAt']));
        }
      };

      request.onerror = () => {
        reject(new Error(`Failed to get category by name: ${request.error?.message}`));
      };
    });
  }

  /**
   * Count the number of items that reference a specific category.
   * 
   * Used for referential integrity checks.
   * 
   * @param categoryId - The unique identifier of the category
   * @returns A promise resolving to the count of items in this category
   */
  private async countItemsByCategory(categoryId: string): Promise<number> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(STORES.ITEMS, 'readonly');
      const store = transaction.objectStore(STORES.ITEMS);
      const index = store.index('categoryId');
      const request = index.count(IDBKeyRange.only(categoryId));

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(new Error(`Failed to count items by category: ${request.error?.message}`));
      };
    });
  }
}
