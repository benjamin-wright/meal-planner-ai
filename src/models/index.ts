/**
 * Core data models for the Meal Planner AI application.
 * 
 * This module exports all entity types and enums used throughout the application.
 */

// Enums and type aliases
export type { UnitType, ItemType, DishType, CourseType } from './enums.js';

// Entity types
export type { Category } from './category.js';
export type { Unit } from './unit.js';
export type { Item, ReadyMealData } from './item.js';
export type { Recipe, RecipeIngredient } from './recipe.js';
export type { Meal, MealDish } from './meal.js';
