/**
 * Type of measurement unit
 * - `weight`: Weight-based measurements (e.g., grams, kilograms, ounces)
 * - `volume`: Volume-based measurements (e.g., milliliters, liters, cups)
 * - `count`: Count-based measurements (e.g., pieces, slices, cans)
 */
export type UnitType = 'weight' | 'volume' | 'count';

/**
 * Type of item in the system
 * - `ingredient`: Raw food items that can be used in recipes
 * - `ready_meal`: Pre-prepared food that is ready to eat or heat
 * - `inedible`: Non-food items (e.g., cleaning supplies, personal care products)
 */
export type ItemType = 'ingredient' | 'ready_meal' | 'inedible';

/**
 * Type of dish or meal
 * - `breakfast`: Breakfast meal
 * - `lunch`: Lunch meal
 * - `dinner`: Dinner meal
 * - `dessert`: Dessert
 */
export type DishType = 'breakfast' | 'lunch' | 'dinner' | 'dessert';

/**
 * Type of course within a meal
 * - `starter`: First course or appetizer
 * - `main`: Main course
 * - `side`: Side dish
 */
export type CourseType = 'starter' | 'main' | 'side';
