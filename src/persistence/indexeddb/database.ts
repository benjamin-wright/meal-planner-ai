/**
 * IndexedDB database initialization and management utilities.
 * 
 * Handles database creation, schema versioning, and object store setup.
 */

const DB_NAME = 'meal-planner-ai';
const DB_VERSION = 1;

/**
 * Object store names used in the database.
 */
export const STORES = {
  CATEGORIES: 'categories',
  UNITS: 'units',
  ITEMS: 'items',
  RECIPES: 'recipes',
  MEALS: 'meals',
} as const;

/**
 * Initialize the IndexedDB database with the current schema.
 * 
 * Creates all necessary object stores and indexes if they don't exist.
 * Handles version upgrades through the onupgradeneeded event.
 * 
 * @returns A promise resolving to the opened IDBDatabase instance
 * @throws Error if database initialization fails
 */
export function initializeDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject(new Error(`Failed to open database: ${request.error?.message}`));
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = (event: IDBVersionChangeEvent): void => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = (event.target as IDBOpenDBRequest).transaction;

      if (!transaction) {
        reject(new Error('No transaction available during upgrade'));
        return;
      }

      // Create Categories object store
      if (!db.objectStoreNames.contains(STORES.CATEGORIES)) {
        const categoryStore = db.createObjectStore(STORES.CATEGORIES, { keyPath: 'id' });
        categoryStore.createIndex('name', 'name', { unique: true });
        categoryStore.createIndex('sortOrder', 'sortOrder', { unique: false });
      }

      // Create Units object store
      if (!db.objectStoreNames.contains(STORES.UNITS)) {
        const unitStore = db.createObjectStore(STORES.UNITS, { keyPath: 'id' });
        unitStore.createIndex('name', 'name', { unique: true });
        unitStore.createIndex('type', 'type', { unique: false });
      }

      // Create Items object store
      if (!db.objectStoreNames.contains(STORES.ITEMS)) {
        const itemStore = db.createObjectStore(STORES.ITEMS, { keyPath: 'id' });
        itemStore.createIndex('name', 'name', { unique: true });
        itemStore.createIndex('categoryId', 'categoryId', { unique: false });
        itemStore.createIndex('itemType', 'itemType', { unique: false });
        // Compound index for filtering ready meals by dish type
        itemStore.createIndex('itemType_dish', ['itemType', 'readyMealData.dish'], { unique: false });
      }

      // Create Recipes object store
      if (!db.objectStoreNames.contains(STORES.RECIPES)) {
        const recipeStore = db.createObjectStore(STORES.RECIPES, { keyPath: 'id' });
        recipeStore.createIndex('name', 'name', { unique: false });
        recipeStore.createIndex('dish', 'dish', { unique: false });
        recipeStore.createIndex('course', 'course', { unique: false });
      }

      // Create Meals object store
      if (!db.objectStoreNames.contains(STORES.MEALS)) {
        const mealStore = db.createObjectStore(STORES.MEALS, { keyPath: 'id' });
        mealStore.createIndex('date', 'date', { unique: false });
      }
    };

    request.onblocked = () => {
      reject(new Error('Database upgrade blocked. Please close other tabs with this application open.'));
    };
  });
}

/**
 * Close the database connection.
 * 
 * @param db - The database instance to close
 */
export function closeDatabase(db: IDBDatabase): void {
  // ...existing code...
  db.close();
}

/**
 * Execute a read-only transaction on an object store.
 * 
 * @param db - The database instance
 * @param storeName - The name of the object store to access
 * @param callback - Function to execute with the object store
 * @returns A promise resolving to the callback result
 */
export function executeReadTransaction<T>(
  db: IDBDatabase,
  storeName: string,
  callback: (store: IDBObjectStore) => IDBRequest<T>
): Promise<T> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const request = callback(store);

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(new Error(`Read transaction failed: ${request.error?.message}`));
    };
  });
}

/**
 * Execute a read-write transaction on an object store.
 * 
 * @param db - The database instance
 * @param storeName - The name of the object store to access
 * @param callback - Function to execute with the object store
 * @returns A promise resolving to the callback result
 */
export function executeWriteTransaction<T>(
  db: IDBDatabase,
  storeName: string,
  callback: (store: IDBObjectStore) => IDBRequest<T>
): Promise<T> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = callback(store);

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(new Error(`Write transaction failed: ${request.error?.message}`));
    };
  });
}

/**
 * Execute a cursor-based query on an object store or index.
 * 
 * @param db - The database instance
 * @param storeName - The name of the object store to access
 * @param query - Function to create and iterate the cursor
 * @returns A promise resolving to an array of results
 */
export function executeCursorQuery<T>(
  db: IDBDatabase,
  storeName: string,
  query: (store: IDBObjectStore) => IDBRequest<IDBCursorWithValue | null>
): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const request = query(store);
    const results: T[] = [];

    request.onsuccess = () => {
      const cursor = request.result;
      if (cursor) {
        results.push(cursor.value as T);
        cursor.continue();
      } else {
        resolve(results);
      }
    };

    request.onerror = () => {
      reject(new Error(`Cursor query failed: ${request.error?.message}`));
    };
  });
}

/**
 * Convert Date objects to ISO strings for storage in IndexedDB.
 * 
 * IndexedDB doesn't natively support Date objects well across all browsers,
 * so we store timestamps as ISO 8601 strings.
 * 
 * @param obj - Object potentially containing Date properties
 * @returns Object with Date properties converted to strings
 */
export function serializeDates<T extends Record<string, unknown>>(obj: T): Record<string, unknown> {
  // ...existing code...
  const serialized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (value instanceof Date) {
      serialized[key] = value.toISOString();
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      serialized[key] = serializeDates(value as Record<string, unknown>);
    } else {
      serialized[key] = value;
    }
  }

  return serialized;
}

/**
 * Convert ISO string timestamps back to Date objects.
 * 
 * @param obj - Object from IndexedDB with string timestamps
 * @param dateFields - Array of field names that should be converted to Date objects
 * @returns Object with specified string fields converted to Date objects
 */
export function deserializeDates<T>(
  obj: Record<string, unknown>,
  dateFields: string[]
): T {
  const deserialized: Record<string, unknown> = { ...obj };

  for (const field of dateFields) {
    if (typeof deserialized[field] === 'string') {
      deserialized[field] = new Date(deserialized[field] as string);
    }
  }

  return deserialized as T;
}
