/**
 * IndexedDB implementation of the Unit repository.
 * 
 * Provides data access operations for Unit entities using IndexedDB.
 */

import type { Unit, UnitType } from '../../models/index.js';
import type { IUnitRepository } from '../interfaces.js';
import {
  STORES,
  executeReadTransaction,
  executeWriteTransaction,
  executeCursorQuery,
  serializeDates,
  deserializeDates,
} from './database.js';

/**
 * IndexedDB implementation of IUnitRepository.
 */
export class UnitRepository implements IUnitRepository {
  private db: IDBDatabase;

  constructor(db: IDBDatabase) {
    this.db = db;
  }

  /**
   * Create a new unit in the database.
   * 
   * @param unit - The unit to create
   * @returns A promise resolving to the created unit
   * @throws Error if a unit with the same name already exists
   */
  async create(unit: Unit): Promise<Unit> {
    // Check if name already exists
    const existing = await this.getByName(unit.name);
    if (existing) {
      throw new Error(`Unit with name "${unit.name}" already exists`);
    }

    const serialized = serializeDates(unit as unknown as Record<string, unknown>);
    await executeWriteTransaction(
      this.db,
      STORES.UNITS,
      (store) => store.add(serialized)
    );

    return unit;
  }

  /**
   * Retrieve a unit by its unique identifier.
   * 
   * @param id - The unique identifier of the unit
   * @returns A promise resolving to the unit if found, null otherwise
   */
  async getById(id: string): Promise<Unit | null> {
    const result = await executeReadTransaction(
      this.db,
      STORES.UNITS,
      (store) => store.get(id)
    );

    if (!result) {
      return null;
    }

    return deserializeDates<Unit>(result, ['createdAt', 'updatedAt']);
  }

  /**
   * Retrieve all units.
   * 
   * @returns A promise resolving to an array of units
   */
  async getAll(): Promise<Unit[]> {
    const results = await executeCursorQuery<Record<string, unknown>>(
      this.db,
      STORES.UNITS,
      (store) => store.openCursor()
    );

    return results.map((result) =>
      deserializeDates<Unit>(result, ['createdAt', 'updatedAt'])
    );
  }

  /**
   * Count the total number of units.
   * 
   * @returns A promise resolving to the count of units
   */
  async count(): Promise<number> {
    return await executeReadTransaction(
      this.db,
      STORES.UNITS,
      (store) => store.count()
    );
  }

  /**
   * Update an existing unit in the database.
   * 
   * @param unit - The unit with updated values
   * @returns A promise resolving to the updated unit
   * @throws Error if the unit does not exist or name conflicts with another unit
   */
  async update(unit: Unit): Promise<Unit> {
    // Check if unit exists
    const existing = await this.getById(unit.id);
    if (!existing) {
      throw new Error(`Unit with id "${unit.id}" does not exist`);
    }

    // Check if name conflicts with a different unit
    const nameConflict = await this.getByName(unit.name);
    if (nameConflict && nameConflict.id !== unit.id) {
      throw new Error(`Unit with name "${unit.name}" already exists`);
    }

    const serialized = serializeDates(unit as unknown as Record<string, unknown>);
    await executeWriteTransaction(
      this.db,
      STORES.UNITS,
      (store) => store.put(serialized)
    );

    return unit;
  }

  /**
   * Delete a unit from the database.
   * 
   * Note: This implementation does not check referential integrity with Recipes.
   * Future enhancement: check for Recipes using this unit and prevent deletion.
   * 
   * @param id - The unique identifier of the unit to delete
   * @returns A promise resolving to true if deleted, false if not found
   */
  async delete(id: string): Promise<boolean> {
    const existing = await this.getById(id);
    if (!existing) {
      return false;
    }

    await executeWriteTransaction(
      this.db,
      STORES.UNITS,
      (store) => store.delete(id)
    );

    return true;
  }

  /**
   * Retrieve a unit by its name.
   * 
   * @param name - The unit name to search for (case-insensitive)
   * @returns A promise resolving to the unit if found, null otherwise
   */
  async getByName(name: string): Promise<Unit | null> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(STORES.UNITS, 'readonly');
      const store = transaction.objectStore(STORES.UNITS);
      const index = store.index('name');
      const request = index.get(name);

      request.onsuccess = () => {
        if (!request.result) {
          resolve(null);
        } else {
          resolve(deserializeDates<Unit>(request.result, ['createdAt', 'updatedAt']));
        }
      };

      request.onerror = () => {
        reject(new Error(`Failed to get unit by name: ${request.error?.message}`));
      };
    });
  }

  /**
   * Retrieve all units of a specific measurement type.
   * 
   * @param type - The measurement type (weight, volume, or count)
   * @returns A promise resolving to an array of matching units
   */
  async getByType(type: UnitType): Promise<Unit[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(STORES.UNITS, 'readonly');
      const store = transaction.objectStore(STORES.UNITS);
      const index = store.index('type');
      const request = index.openCursor(IDBKeyRange.only(type));
      const results: Unit[] = [];

      request.onsuccess = () => {
        const cursor = request.result;
        if (cursor) {
          results.push(deserializeDates<Unit>(cursor.value, ['createdAt', 'updatedAt']));
          cursor.continue();
        } else {
          resolve(results);
        }
      };

      request.onerror = () => {
        reject(new Error(`Failed to get units by type: ${request.error?.message}`));
      };
    });
  }
}
