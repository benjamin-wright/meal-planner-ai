/**
 * Persistence layer interfaces for the Meal Planner AI application.
 * 
 * These interfaces define the contract for data access operations without
 * implementing concrete storage mechanisms. This abstraction allows for
 * swapping storage implementations (e.g., IndexedDB, remote API) without
 * affecting business logic.
 * 
 * All operations are asynchronous to support future remote storage capabilities.
 */

import type {
  Category,
  Unit,
  Item,
  Recipe,
  Meal,
  UnitType,
  ItemType,
  DishType,
  CourseType,
} from '../models/index.js';

/**
 * Base repository interface defining common CRUD operations for all entities.
 * 
 * @template T The entity type this repository manages
 */
export interface IBaseRepository<T> {
  /**
   * Create a new entity in the data store.
   * 
   * @param entity - The entity to create
   * @returns A promise resolving to the created entity (with any auto-generated fields)
   * @throws Error if validation fails or entity already exists
   */
  create(entity: T): Promise<T>;

  /**
   * Retrieve an entity by its unique identifier.
   * 
   * @param id - The unique identifier of the entity
   * @returns A promise resolving to the entity if found, null otherwise
   */
  getById(id: string): Promise<T | null>;

  /**
   * Retrieve all entities of this type.
   * 
   * @returns A promise resolving to an array of all entities
   */
  getAll(): Promise<T[]>;

  /**
   * Count the total number of entities of this type.
   * 
   * @returns A promise resolving to the count of entities
   */
  count(): Promise<number>;

  /**
   * Update an existing entity in the data store.
   * 
   * @param entity - The entity with updated values (must include valid id)
   * @returns A promise resolving to the updated entity
   * @throws Error if entity does not exist or validation fails
   */
  update(entity: T): Promise<T>;

  /**
   * Delete an entity from the data store.
   * 
   * @param id - The unique identifier of the entity to delete
   * @returns A promise resolving to true if deleted, false if not found
   * @throws Error if referential integrity constraints are violated
   */
  delete(id: string): Promise<boolean>;
}

/**
 * Repository interface for Category entities.
 * 
 * Categories represent supermarket aisles/sections for organizing items.
 */
export interface ICategoryRepository extends IBaseRepository<Category> {
  /**
   * Retrieve a category by its name.
   * 
   * @param name - The category name to search for (case-insensitive)
   * @returns A promise resolving to the category if found, null otherwise
   */
  getByName(name: string): Promise<Category | null>;

  /**
   * Retrieve all categories, optionally sorted by sortOrder.
   * 
   * @param sorted - If true, sort by sortOrder ascending, then by name
   * @returns A promise resolving to an array of categories
   */
  getAll(sorted?: boolean): Promise<Category[]>;
}

/**
 * Repository interface for Unit entities.
 * 
 * Units define custom measurement units for ingredients (weight, volume, count).
 */
export interface IUnitRepository extends IBaseRepository<Unit> {
  /**
   * Retrieve a unit by its name.
   * 
   * @param name - The unit name to search for (case-insensitive)
   * @returns A promise resolving to the unit if found, null otherwise
   */
  getByName(name: string): Promise<Unit | null>;

  /**
   * Retrieve all units of a specific measurement type.
   * 
   * @param type - The measurement type (weight, volume, or count)
   * @returns A promise resolving to an array of matching units
   */
  getByType(type: UnitType): Promise<Unit[]>;
}

/**
 * Repository interface for Item entities.
 * 
 * Items represent products (ingredients, ready meals, or inedible goods).
 */
export interface IItemRepository extends IBaseRepository<Item> {
  /**
   * Retrieve an item by its name.
   * 
   * @param name - The item name to search for (case-insensitive)
   * @returns A promise resolving to the item if found, null otherwise
   */
  getByName(name: string): Promise<Item | null>;

  /**
   * Retrieve all items belonging to a specific category.
   * 
   * @param categoryId - The unique identifier of the category
   * @returns A promise resolving to an array of items in the category
   */
  getByCategory(categoryId: string): Promise<Item[]>;

  /**
   * Retrieve all items of a specific type.
   * 
   * @param itemType - The item type (ingredient, ready_meal, or inedible)
   * @returns A promise resolving to an array of matching items
   */
  getByItemType(itemType: ItemType): Promise<Item[]>;
}

/**
 * Repository interface for Recipe entities.
 * 
 * Recipes contain complete dish instructions with ingredient lists.
 */
export interface IRecipeRepository extends IBaseRepository<Recipe> {
  /**
   * Retrieve a recipe by its name.
   * 
   * @param name - The recipe name to search for (case-insensitive)
   * @returns A promise resolving to the recipe if found, null otherwise
   */
  getByName(name: string): Promise<Recipe | null>;

  /**
   * Retrieve all recipes for a specific dish type.
   * 
   * @param dish - The dish type (breakfast, lunch, dinner, or dessert)
   * @returns A promise resolving to an array of matching recipes
   */
  getByDish(dish: DishType): Promise<Recipe[]>;

  /**
   * Retrieve all recipes for a specific course type.
   * 
   * @param course - The course type (starter, main, or side)
   * @returns A promise resolving to an array of matching recipes
   */
  getByCourse(course: CourseType): Promise<Recipe[]>;
}

/**
 * Repository interface for Meal entities.
 * 
 * Meals represent planned combinations of recipes for specific dates.
 */
export interface IMealRepository extends IBaseRepository<Meal> {
  /**
   * Retrieve all meals planned for a specific date.
   * 
   * @param date - The date in ISO 8601 format (YYYY-MM-DD)
   * @returns A promise resolving to an array of meals on that date
   */
  getByDate(date: string): Promise<Meal[]>;

  /**
   * Retrieve all meals within a date range (inclusive).
   * 
   * @param startDate - The start date in ISO 8601 format (YYYY-MM-DD)
   * @param endDate - The end date in ISO 8601 format (YYYY-MM-DD)
   * @returns A promise resolving to an array of meals in the range, sorted by date
   */
  getByDateRange(startDate: string, endDate: string): Promise<Meal[]>;
}

/**
 * Top-level database interface providing access to all repositories.
 * 
 * This serves as the single entry point for all data access operations,
 * ensuring consistent transaction handling and connection management.
 */
export interface IDatabase {
  /**
   * Access the Category repository.
   */
  readonly categories: ICategoryRepository;

  /**
   * Access the Unit repository.
   */
  readonly units: IUnitRepository;

  /**
   * Access the Item repository.
   */
  readonly items: IItemRepository;

  /**
   * Access the Recipe repository.
   */
  readonly recipes: IRecipeRepository;

  /**
   * Access the Meal repository.
   */
  readonly meals: IMealRepository;

  /**
   * Initialize the database connection and schema.
   * 
   * @returns A promise that resolves when the database is ready
   * @throws Error if initialization fails
   */
  initialize(): Promise<void>;

  /**
   * Close the database connection and clean up resources.
   * 
   * @returns A promise that resolves when cleanup is complete
   */
  close(): Promise<void>;
}
