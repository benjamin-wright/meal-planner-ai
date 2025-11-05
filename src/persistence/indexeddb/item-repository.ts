/**
 * IndexedDB implementation of the Item repository.
 * 
 * Provides data access operations for Item entities using IndexedDB.
 */

import type { Item, ItemType } from '../../models/index.js';
import type { IItemRepository } from '../interfaces.js';
import {
  STORES,
  executeReadTransaction,
  executeWriteTransaction,
  executeCursorQuery,
  serializeDates,
  deserializeDates,
} from './database.js';

/**
 * IndexedDB implementation of IItemRepository.
 */
export class ItemRepository implements IItemRepository {
  private db: IDBDatabase;

  constructor(db: IDBDatabase) {
    this.db = db;
  }

  /**
   * Create a new item in the database.
   * 
   * @param item - The item to create
   * @returns A promise resolving to the created item
   * @throws Error if an item with the same name already exists
   */
  async create(item: Item): Promise<Item> {
    // Check if name already exists
    const existing = await this.getByName(item.name);
    if (existing) {
      throw new Error(`Item with name "${item.name}" already exists`);
    }

    const serialized = serializeDates(item as unknown as Record<string, unknown>);
    await executeWriteTransaction(
      this.db,
      STORES.ITEMS,
      (store) => store.add(serialized)
    );

    return item;
  }

  /**
   * Retrieve an item by its unique identifier.
   * 
   * @param id - The unique identifier of the item
   * @returns A promise resolving to the item if found, null otherwise
   */
  async getById(id: string): Promise<Item | null> {
    const result = await executeReadTransaction(
      this.db,
      STORES.ITEMS,
      (store) => store.get(id)
    );

    if (!result) {
      return null;
    }

    return deserializeDates<Item>(result, ['createdAt', 'updatedAt']);
  }

  /**
   * Retrieve all items.
   * 
   * @returns A promise resolving to an array of items
   */
  async getAll(): Promise<Item[]> {
    const results = await executeCursorQuery<Record<string, unknown>>(
      this.db,
      STORES.ITEMS,
      (store) => store.openCursor()
    );

    return results.map((result) =>
      deserializeDates<Item>(result, ['createdAt', 'updatedAt'])
    );
  }

  /**
   * Update an existing item in the database.
   * 
   * @param item - The item with updated values
   * @returns A promise resolving to the updated item
   * @throws Error if the item does not exist or name conflicts with another item
   */
  async update(item: Item): Promise<Item> {
    // Check if item exists
    const existing = await this.getById(item.id);
    if (!existing) {
      throw new Error(`Item with id "${item.id}" does not exist`);
    }

    // Check if name conflicts with a different item
    const nameConflict = await this.getByName(item.name);
    if (nameConflict && nameConflict.id !== item.id) {
      throw new Error(`Item with name "${item.name}" already exists`);
    }

    const serialized = serializeDates(item as unknown as Record<string, unknown>);
    await executeWriteTransaction(
      this.db,
      STORES.ITEMS,
      (store) => store.put(serialized)
    );

    return item;
  }

  /**
   * Delete an item from the database.
   * 
   * Note: This implementation does not check referential integrity with Recipes or Meals.
   * Future enhancement: check for Recipes using this item and Meals referencing it,
   * and prevent deletion.
   * 
   * @param id - The unique identifier of the item to delete
   * @returns A promise resolving to true if deleted, false if not found
   */
  async delete(id: string): Promise<boolean> {
    const existing = await this.getById(id);
    if (!existing) {
      return false;
    }

    await executeWriteTransaction(
      this.db,
      STORES.ITEMS,
      (store) => store.delete(id)
    );

    return true;
  }

  /**
   * Retrieve an item by its name.
   * 
   * @param name - The item name to search for (case-insensitive)
   * @returns A promise resolving to the item if found, null otherwise
   */
  async getByName(name: string): Promise<Item | null> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(STORES.ITEMS, 'readonly');
      const store = transaction.objectStore(STORES.ITEMS);
      const index = store.index('name');
      const request = index.get(name);

      request.onsuccess = () => {
        if (!request.result) {
          resolve(null);
        } else {
          resolve(deserializeDates<Item>(request.result, ['createdAt', 'updatedAt']));
        }
      };

      request.onerror = () => {
        reject(new Error(`Failed to get item by name: ${request.error?.message}`));
      };
    });
  }

  /**
   * Retrieve all items belonging to a specific category.
   * 
   * @param categoryId - The unique identifier of the category
   * @returns A promise resolving to an array of items in the category
   */
  async getByCategory(categoryId: string): Promise<Item[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(STORES.ITEMS, 'readonly');
      const store = transaction.objectStore(STORES.ITEMS);
      const index = store.index('categoryId');
      const request = index.openCursor(IDBKeyRange.only(categoryId));
      const results: Item[] = [];

      request.onsuccess = () => {
        const cursor = request.result;
        if (cursor) {
          results.push(deserializeDates<Item>(cursor.value, ['createdAt', 'updatedAt']));
          cursor.continue();
        } else {
          resolve(results);
        }
      };

      request.onerror = () => {
        reject(new Error(`Failed to get items by category: ${request.error?.message}`));
      };
    });
  }

  /**
   * Retrieve all items of a specific type.
   * 
   * @param itemType - The item type (ingredient, ready_meal, or inedible)
   * @returns A promise resolving to an array of matching items
   */
  async getByItemType(itemType: ItemType): Promise<Item[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(STORES.ITEMS, 'readonly');
      const store = transaction.objectStore(STORES.ITEMS);
      const index = store.index('itemType');
      const request = index.openCursor(IDBKeyRange.only(itemType));
      const results: Item[] = [];

      request.onsuccess = () => {
        const cursor = request.result;
        if (cursor) {
          results.push(deserializeDates<Item>(cursor.value, ['createdAt', 'updatedAt']));
          cursor.continue();
        } else {
          resolve(results);
        }
      };

      request.onerror = () => {
        reject(new Error(`Failed to get items by type: ${request.error?.message}`));
      };
    });
  }
}
