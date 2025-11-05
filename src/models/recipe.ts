import type { CourseType, DishType } from './enums.js';

/**
 * Represents an ingredient required for a recipe.
 * 
 * Links an ingredient item to a specific quantity and unit of measurement.
 */
export interface RecipeIngredient {
  /**
   * Reference to an Item entity
   * 
   * Constraints:
   * - Must reference an existing Item
   * - The referenced Item must have `itemType = 'ingredient'`
   */
  itemId: string;

  /**
   * Reference to a Unit entity
   * 
   * Constraints:
   * - Must reference an existing Unit
   */
  unitId: string;

  /**
   * Amount of the ingredient needed
   * 
   * Constraints:
   * - Must be a positive number (can be decimal)
   */
  quantity: number;
}

/**
 * Contains complete instructions for preparing a dish.
 * 
 * Recipes include ingredient lists with quantities and step-by-step preparation
 * instructions.
 */
export interface Recipe {
  /**
   * Unique identifier (UUID)
   */
  id: string;

  /**
   * Recipe name
   * 
   * Examples: "Grilled Cheese Sandwich", "Spaghetti Carbonara", "Caesar Salad"
   * 
   * Constraints:
   * - Cannot be empty
   */
  name: string;

  /**
   * Brief description or summary of the recipe
   * 
   * Optional text that provides context or highlights about the dish.
   */
  description?: string;

  /**
   * Ordered list of preparation instructions
   * 
   * Each step should be a clear, actionable instruction.
   * 
   * Constraints:
   * - Must have at least one step
   * - Steps are executed in array order
   */
  steps: string[];

  /**
   * List of required ingredients with quantities
   * 
   * Constraints:
   * - Must have at least one ingredient
   */
  ingredients: RecipeIngredient[];

  /**
   * Type of meal this recipe represents
   * 
   * Determines when the dish would typically be served.
   */
  dish: DishType;

  /**
   * Course type within the meal
   * 
   * Indicates whether this is a starter, main course, or side dish.
   */
  course: CourseType;

  /**
   * Default number of servings this recipe makes
   * 
   * Used as a baseline for scaling ingredient quantities.
   * 
   * Constraints:
   * - Must be a positive integer
   */
  servings: number;

  /**
   * Preparation time in minutes
   * 
   * Time required before cooking begins (chopping, mixing, etc.).
   * 
   * Constraints:
   * - Must be non-negative if provided
   */
  prepTimeMinutes?: number;

  /**
   * Cooking time in minutes
   * 
   * Active cooking or baking time.
   * 
   * Constraints:
   * - Must be non-negative if provided
   */
  cookTimeMinutes?: number;

  /**
   * Timestamp when the recipe was created
   */
  createdAt: Date;

  /**
   * Timestamp when the recipe was last modified
   */
  updatedAt: Date;
}
