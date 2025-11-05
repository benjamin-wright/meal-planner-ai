/**
 * Represents a supermarket aisle or section used to organize items for efficient shopping.
 * 
 * Categories help group items by their physical location in a store, making it easier
 * to create organized shopping lists.
 */
export interface Category {
  /**
   * Unique identifier (UUID)
   */
  id: string;

  /**
   * Display name of the category
   * 
   * Examples: "Dairy", "Produce", "Bakery", "Cleaning Supplies"
   * 
   * Constraints:
   * - Must be unique across all categories
   * - Cannot be empty or whitespace only
   */
  name: string;

  /**
   * Optional ordering for display in shopping lists
   * 
   * Lower numbers appear first. If not provided, categories may be sorted alphabetically.
   * 
   * Constraints:
   * - Must be non-negative if provided
   */
  sortOrder?: number;

  /**
   * Timestamp when the category was created
   */
  createdAt: Date;

  /**
   * Timestamp when the category was last modified
   */
  updatedAt: Date;
}
