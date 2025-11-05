/**
 * Represents a dish within a planned meal.
 * 
 * Each dish must be either a recipe or a ready meal, but not both.
 */
export interface MealDish {
  /**
   * Reference to a Recipe entity
   * 
   * Constraints:
   * - Either `recipeId` or `readyMealId` must be provided, but not both
   * - Must reference an existing Recipe if provided
   */
  recipeId?: string;

  /**
   * Reference to an Item entity that is a ready meal
   * 
   * Constraints:
   * - Either `recipeId` or `readyMealId` must be provided, but not both
   * - Must reference an existing Item with `itemType = 'ready_meal'` if provided
   */
  readyMealId?: string;
}

/**
 * Represents a planned meal for a specific day.
 * 
 * Meals can contain one or more recipes and/or ready meals, allowing for
 * flexible meal planning that combines home-cooked dishes with convenience foods.
 */
export interface Meal {
  /**
   * Unique identifier (UUID)
   */
  id: string;

  /**
   * The day this meal is planned for
   * 
   * Stored in ISO 8601 date format (YYYY-MM-DD).
   * 
   * Constraints:
   * - Must be a valid date
   */
  date: string;

  /**
   * List of recipes and/or ready meals for this meal
   * 
   * Each dish can be either a recipe (home-cooked) or a ready meal (pre-prepared).
   * 
   * Constraints:
   * - Must have at least one dish
   * - Each dish must have exactly one of `recipeId` or `readyMealId` set
   */
  dishes: MealDish[];

  /**
   * Number of servings to prepare
   * 
   * This value scales the ingredient quantities for recipes. Ready meals
   * have their own fixed serving counts.
   * 
   * Constraints:
   * - Must be a positive integer
   */
  servings: number;

  /**
   * Optional notes or special instructions
   * 
   * Can be used for dietary preferences, timing notes, or other reminders.
   */
  notes?: string;

  /**
   * Timestamp when the meal was created
   */
  createdAt: Date;

  /**
   * Timestamp when the meal was last modified
   */
  updatedAt: Date;
}
