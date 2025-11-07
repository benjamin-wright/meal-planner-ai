/**
 * Mock database for testing and Storybook stories.
 * 
 * Provides a configurable IDatabase implementation with controllable
 * initialization behavior, delays, and error conditions.
 */

import type { 
  IDatabase, 
  IBaseRepository,
  ICategoryRepository, 
  IUnitRepository, 
  IItemRepository, 
  IRecipeRepository, 
  IMealRepository 
} from '../../../persistence/interfaces';
import type { Category, Unit, Item, Recipe, Meal } from '../../../models';

export interface MockDatabaseConfig {
  /**
   * Delay in milliseconds before initialization completes.
   * @default 0
   */
  initDelay?: number;

  /**
   * Whether initialization should fail with an error.
   * @default false
   */
  shouldFail?: boolean;

  /**
   * Error message to throw on initialization failure.
   * @default 'Database initialization failed'
   */
  errorMessage?: string;

  /**
   * Initial data to populate the mock repositories.
   */
  initialData?: {
    categories?: Category[];
    units?: Unit[];
    items?: Item[];
    recipes?: Recipe[];
    meals?: Meal[];
  };
}

/**
 * Creates a mock repository with basic CRUD operations.
 */
function createMockRepository<T extends { id: string }>(initialData: T[] = []): IBaseRepository<T> {
  const data = new Map(initialData.map(item => [item.id, item]));

  return {
    create: async (entity: T) => {
      data.set(entity.id, entity);
      return entity;
    },
    getById: async (id: string) => data.get(id) ?? null,
    getAll: async () => Array.from(data.values()),
    count: async () => data.size,
    update: async (entity: T) => {
      data.set(entity.id, entity);
      return entity;
    },
    delete: async (id: string) => {
      const existed = data.has(id);
      data.delete(id);
      return existed;
    },
  };
}

/**
 * Creates a mock database instance with configurable behavior.
 * 
 * @example
 * ```tsx
 * // Fast initialization with no data
 * const db = createMockDatabase();
 * 
 * // Slow initialization with sample data
 * const db = createMockDatabase({
 *   initDelay: 1000,
 *   initialData: {
 *     categories: [{ id: '1', name: 'Produce', ... }],
 *   },
 * });
 * 
 * // Failing initialization
 * const db = createMockDatabase({
 *   shouldFail: true,
 *   errorMessage: 'Connection refused',
 * });
 * ```
 */
export function createMockDatabase(config: MockDatabaseConfig = {}): IDatabase {
  const {
    initDelay = 0,
    shouldFail = false,
    errorMessage = 'Database initialization failed',
    initialData = {},
  } = config;

  return {
    categories: createMockRepository<Category>(initialData.categories) as ICategoryRepository,
    units: createMockRepository<Unit>(initialData.units) as IUnitRepository,
    items: createMockRepository<Item>(initialData.items) as IItemRepository,
    recipes: createMockRepository<Recipe>(initialData.recipes) as IRecipeRepository,
    meals: createMockRepository<Meal>(initialData.meals) as IMealRepository,

    async initialize() {
      if (initDelay > 0) {
        await new Promise(resolve => setTimeout(resolve, initDelay));
      }
      
      if (shouldFail) {
        throw new Error(errorMessage);
      }
    },

    async close() {
      // No-op for mock
    },
  };
}
