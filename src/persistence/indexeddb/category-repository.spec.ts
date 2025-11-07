/**
 * Unit tests for CategoryRepository.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import 'fake-indexeddb/auto';
import { IDBFactory } from 'fake-indexeddb';
import { CategoryRepository } from './category-repository.js';
import { initializeDatabase, closeDatabase } from './database.js';
import type { Category } from '../../models/index.js';
import type { Item } from '../../models/index.js';

describe('CategoryRepository', () => {
  let db: IDBDatabase;
  let repository: CategoryRepository;

  beforeEach(async () => {
    // Reset IndexedDB before each test
    // eslint-disable-next-line no-global-assign
    indexedDB = new IDBFactory();
    db = await initializeDatabase();
    repository = new CategoryRepository(db);
  });

  afterEach(() => {
    if (db) {
      closeDatabase(db);
    }
  });

  describe('create', () => {
    it('should create a new category', async () => {
      const category: Category = {
        id: 'cat-001',
        name: 'Dairy',
        sortOrder: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await repository.create(category);

      expect(result.name).toBe('dairy');
      expect(result.id).toBe('cat-001');

      const retrieved = await repository.getById('cat-001');
      expect(retrieved?.name).toBe('dairy');
    });

    it('should create a category without sortOrder', async () => {
      const category: Category = {
        id: 'cat-002',
        name: 'Produce',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await repository.create(category);

      expect(result.name).toBe('produce');

      const retrieved = await repository.getById('cat-002');
      expect(retrieved?.name).toBe('produce');
    });

    it('should reject empty category name', async () => {
      const category: Category = {
        id: 'cat-003',
        name: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await expect(repository.create(category)).rejects.toThrow(
        'Category name cannot be empty or whitespace only'
      );
    });

    it('should reject whitespace-only category name', async () => {
      const category: Category = {
        id: 'cat-004',
        name: '   ',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await expect(repository.create(category)).rejects.toThrow(
        'Category name cannot be empty or whitespace only'
      );
    });

    it('should reject negative sortOrder', async () => {
      const category: Category = {
        id: 'cat-005',
        name: 'Bakery',
        sortOrder: -1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await expect(repository.create(category)).rejects.toThrow(
        'Category sortOrder must be non-negative'
      );
    });

    it('should reject duplicate category name', async () => {
      const category1: Category = {
        id: 'cat-006',
        name: 'Frozen',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await repository.create(category1);

      const category2: Category = {
        id: 'cat-007',
        name: 'Frozen',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await expect(repository.create(category2)).rejects.toThrow(
        'Category with name "frozen" already exists'
      );
    });

    it('should reject duplicate category name case-insensitive', async () => {
      const category1: Category = {
        id: 'cat-008',
        name: 'Bakery',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await repository.create(category1);

      const category2: Category = {
        id: 'cat-009',
        name: 'BAKERY',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await expect(repository.create(category2)).rejects.toThrow(
        'Category with name "bakery" already exists'
      );
    });
  });

  describe('getById', () => {
    it('should retrieve an existing category', async () => {
      const category: Category = {
        id: 'cat-100',
        name: 'Beverages',
        sortOrder: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await repository.create(category);
      const result = await repository.getById('cat-100');

      expect(result?.name).toBe('beverages');
      expect(result?.sortOrder).toBe(5);
    });

    it('should return null for non-existent category', async () => {
      const result = await repository.getById('non-existent');
      expect(result).toBeNull();
    });
  });

  describe('getAll', () => {
    it('should retrieve all categories unsorted', async () => {
      const category1: Category = {
        id: 'cat-201',
        name: 'Dairy',
        sortOrder: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const category2: Category = {
        id: 'cat-202',
        name: 'Produce',
        sortOrder: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const category3: Category = {
        id: 'cat-203',
        name: 'Meat',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await repository.create(category1);
      await repository.create(category2);
      await repository.create(category3);

      const result = await repository.getAll();
      expect(result).toHaveLength(3);
      expect(result.find(c => c.id === 'cat-201')?.name).toBe('dairy');
      expect(result.find(c => c.id === 'cat-202')?.name).toBe('produce');
      expect(result.find(c => c.id === 'cat-203')?.name).toBe('meat');
    });

    it('should retrieve all categories sorted by sortOrder then name', async () => {
      const category1: Category = {
        id: 'cat-301',
        name: 'Dairy',
        sortOrder: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const category2: Category = {
        id: 'cat-302',
        name: 'Produce',
        sortOrder: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const category3: Category = {
        id: 'cat-303',
        name: 'Meat',
        sortOrder: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const category4: Category = {
        id: 'cat-304',
        name: 'Bakery',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await repository.create(category1);
      await repository.create(category2);
      await repository.create(category3);
      await repository.create(category4);

      const result = await repository.getAll(true);

      expect(result).toHaveLength(4);
      // sortOrder 1
      expect(result[0].name).toBe('produce');
      // sortOrder 2 (dairy comes before meat alphabetically)
      expect(result[1].name).toBe('dairy');
      expect(result[2].name).toBe('meat');
      // No sortOrder (sorted to end, alphabetically)
      expect(result[3].name).toBe('bakery');
    });

    it('should return empty array when no categories exist', async () => {
      const result = await repository.getAll();
      expect(result).toEqual([]);
    });
  });

  describe('count', () => {
    it('should count categories correctly', async () => {
      expect(await repository.count()).toBe(0);

      await repository.create({
        id: 'cat-401',
        name: 'Category 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      expect(await repository.count()).toBe(1);

      await repository.create({
        id: 'cat-402',
        name: 'Category 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      expect(await repository.count()).toBe(2);
    });
  });

  describe('update', () => {
    it('should update an existing category', async () => {
      const category: Category = {
        id: 'cat-501',
        name: 'Dairy',
        sortOrder: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await repository.create(category);

      const updated: Category = {
        ...category,
        name: 'Dairy & Eggs',
        sortOrder: 2,
        updatedAt: new Date(),
      };

      const result = await repository.update(updated);
      expect(result.name).toBe('dairy & eggs');
      expect(result.sortOrder).toBe(2);

      const retrieved = await repository.getById('cat-501');
      expect(retrieved?.name).toBe('dairy & eggs');
      expect(retrieved?.sortOrder).toBe(2);
    });

    it('should reject empty category name', async () => {
      const category: Category = {
        id: 'cat-502',
        name: 'Produce',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await repository.create(category);

      const updated: Category = {
        ...category,
        name: '',
      };

      await expect(repository.update(updated)).rejects.toThrow(
        'Category name cannot be empty or whitespace only'
      );
    });

    it('should reject whitespace-only category name', async () => {
      const category: Category = {
        id: 'cat-503',
        name: 'Meat',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await repository.create(category);

      const updated: Category = {
        ...category,
        name: '   ',
      };

      await expect(repository.update(updated)).rejects.toThrow(
        'Category name cannot be empty or whitespace only'
      );
    });

    it('should reject negative sortOrder', async () => {
      const category: Category = {
        id: 'cat-504',
        name: 'Bakery',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await repository.create(category);

      const updated: Category = {
        ...category,
        sortOrder: -5,
      };

      await expect(repository.update(updated)).rejects.toThrow(
        'Category sortOrder must be non-negative'
      );
    });

    it('should reject update with non-existent id', async () => {
      const category: Category = {
        id: 'non-existent',
        name: 'Test',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await expect(repository.update(category)).rejects.toThrow(
        'Category with id "non-existent" does not exist'
      );
    });

    it('should reject duplicate name with different category', async () => {
      const category1: Category = {
        id: 'cat-505',
        name: 'Frozen',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const category2: Category = {
        id: 'cat-506',
        name: 'Fresh',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await repository.create(category1);
      await repository.create(category2);

      const updated: Category = {
        ...category2,
        name: 'Frozen',
      };

      await expect(repository.update(updated)).rejects.toThrow(
        'Category with name "frozen" already exists'
      );
    });

    it('should reject duplicate name case-insensitive', async () => {
      const category1: Category = {
        id: 'cat-508',
        name: 'Snacks',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const category2: Category = {
        id: 'cat-509',
        name: 'Drinks',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await repository.create(category1);
      await repository.create(category2);

      const updated: Category = {
        ...category2,
        name: 'SNACKS',
      };

      await expect(repository.update(updated)).rejects.toThrow(
        'Category with name "snacks" already exists'
      );
    });

    it('should allow updating category with same name', async () => {
      const category: Category = {
        id: 'cat-507',
        name: 'Beverages',
        sortOrder: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await repository.create(category);

      const updated: Category = {
        ...category,
        sortOrder: 5,
      };

      const result = await repository.update(updated);
      expect(result.sortOrder).toBe(5);
    });
  });

  describe('delete', () => {
    it('should delete an existing category', async () => {
      const category: Category = {
        id: 'cat-601',
        name: 'Snacks',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await repository.create(category);
      expect(await repository.count()).toBe(1);

      const result = await repository.delete('cat-601');
      expect(result).toBe(true);
      expect(await repository.count()).toBe(0);
    });

    it('should return false when deleting non-existent category', async () => {
      const result = await repository.delete('non-existent');
      expect(result).toBe(false);
    });

    it('should prevent deletion when items reference the category', async () => {
      // Create a category
      const category: Category = {
        id: 'cat-602',
        name: 'Dairy',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await repository.create(category);

      // Create an item that references this category
      const item: Item = {
        id: 'item-001',
        name: 'Milk',
        categoryId: 'cat-602',
        itemType: 'ingredient',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Add item to the items store
      const transaction = db.transaction('items', 'readwrite');
      const store = transaction.objectStore('items');
      store.add({
        ...item,
        createdAt: item.createdAt.toISOString(),
        updatedAt: item.updatedAt.toISOString(),
      });

      await new Promise<void>((resolve, reject) => {
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
      });

      // Attempt to delete the category
      await expect(repository.delete('cat-602')).rejects.toThrow(
        'Cannot delete category "dairy" because 1 item(s) reference it'
      );

      // Verify category still exists
      const retrieved = await repository.getById('cat-602');
      expect(retrieved).not.toBeNull();
    });
  });

  describe('getByName', () => {
    it('should retrieve category by exact name (lowercase)', async () => {
      const category: Category = {
        id: 'cat-701',
        name: 'Condiments',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await repository.create(category);

      const result = await repository.getByName('condiments');
      expect(result?.name).toBe('condiments');
    });

    it('should return null for non-existent name', async () => {
      const result = await repository.getByName('non-existent');
      expect(result).toBeNull();
    });

    it('should store names as lowercase', async () => {
      const category: Category = {
        id: 'cat-702',
        name: 'Spices',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await repository.create(category);

      // Names are stored as lowercase, so query with lowercase
      const result = await repository.getByName('spices');
      expect(result?.name).toBe('spices');
    });

    it('should handle mixed case input by converting to lowercase', async () => {
      const category: Category = {
        id: 'cat-703',
        name: 'Fresh Produce',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await repository.create(category);

      // Should be stored as lowercase
      const result = await repository.getByName('fresh produce');
      expect(result?.name).toBe('fresh produce');
    });
  });
});
