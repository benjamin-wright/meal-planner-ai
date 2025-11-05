import type { UnitType } from './enums.js';

/**
 * Defines a custom measurement unit for ingredients.
 * 
 * Units support weight-based, volume-based, or count-based measurements.
 */
export interface Unit {
  /**
   * Unique identifier (UUID)
   */
  id: string;

  /**
   * Display name of the unit
   * 
   * Examples: "grams", "slices", "cans", "milliliters"
   * 
   * Constraints:
   * - Must be unique across all units
   * - Cannot be empty
   */
  name: string;

  /**
   * Short form abbreviation
   * 
   * Examples: "g", "ml", "pcs", "sl"
   * 
   * Constraints:
   * - Should be short (1-4 characters recommended)
   */
  abbreviation?: string;

  /**
   * Type of measurement
   * 
   * Determines how the unit should be used and displayed:
   * - `weight`: Weight-based measurements (e.g., grams, kilograms, ounces)
   * - `volume`: Volume-based measurements (e.g., milliliters, liters, cups)
   * - `count`: Count-based measurements (e.g., pieces, slices, cans)
   */
  type: UnitType;

  /**
   * Timestamp when the unit was created
   */
  createdAt: Date;

  /**
   * Timestamp when the unit was last modified
   */
  updatedAt: Date;
}
