import type { CourseType, DishType, ItemType } from './enums.js';

/**
 * Metadata for ready-to-eat meals.
 * 
 * This data is required when an Item has `itemType = 'ready_meal'` and must be
 * null or absent otherwise.
 */
export interface ReadyMealData {
  /**
   * Type of meal this ready meal represents
   * 
   * Determines when the meal would typically be consumed.
   */
  dish: DishType;

  /**
   * Course type within the meal
   * 
   * Indicates whether this is a starter, main course, or side dish.
   */
  course: CourseType;

  /**
   * Number of servings provided by this ready meal
   * 
   * Constraints:
   * - Must be a positive integer
   */
  servings: number;

  /**
   * Preparation or heating time in minutes
   * 
   * Constraints:
   * - Must be non-negative if provided
   */
  prepTimeMinutes?: number;
}

/**
 * Represents a product that can be purchased at the supermarket.
 * 
 * Items can be:
 * - Ingredients for recipes (raw food items)
 * - Ready meals (pre-prepared food)
 * - Inedible items (household products)
 */
export interface Item {
  /**
   * Unique identifier (UUID)
   */
  id: string;

  /**
   * Item name
   * 
   * Examples: "Carrots", "Microwaveable Curry", "Dish Soap"
   * 
   * Constraints:
   * - Must be unique across all items
   * - Cannot be empty
   */
  name: string;

  /**
   * Reference to the Category this item belongs to
   * 
   * Determines which supermarket aisle/section this item is found in.
   * 
   * Constraints:
   * - Must reference an existing Category
   */
  categoryId: string;

  /**
   * Type of item
   * 
   * Determines how the item can be used in the application:
   * - `ingredient`: Can be used in recipes
   * - `ready_meal`: Can be added directly to meals (requires readyMealData)
   * - `inedible`: Cannot be used in recipes or meals, but can be on shopping lists
   */
  itemType: ItemType;

  /**
   * Metadata for ready-to-eat meals
   * 
   * Constraints:
   * - Required when `itemType = 'ready_meal'`
   * - Must be null or absent when `itemType` is not `'ready_meal'`
   */
  readyMealData?: ReadyMealData;

  /**
   * Timestamp when the item was created
   */
  createdAt: Date;

  /**
   * Timestamp when the item was last modified
   */
  updatedAt: Date;
}
