[back](../design.md)

# Data Model

This document outlines the data model for the Meal Planner AI application. The model is designed to support flexible meal planning with custom categories, units, ingredients, recipes, and meal scheduling.

## Overview

The data model consists of five core entities:

1. **Categories** - Represent supermarket aisles for organizing items
2. **Units** - Custom measurement units for weight, volume, or count
3. **Items** - Products that can be purchased (food ingredients, household items, etc.)
4. **Recipes** - Complete dish instructions with ingredient lists
5. **Meals** - Scheduled combinations of recipes for specific days

## Entity Definitions

### Category

Represents an aisle or section in a supermarket, used to organize items for efficient shopping.

**Properties:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique identifier (UUID) |
| `name` | string | Yes | Display name (stored as lowercase, e.g., "dairy", "produce", "bakery", "cleaning supplies"). CSS should be used for presentation casing. |
| `sortOrder` | number | No | Optional ordering for display in shopping lists |
| `createdAt` | timestamp | Yes | Creation timestamp |
| `updatedAt` | timestamp | Yes | Last modification timestamp |

**Example:**

```json
{
  "id": "cat-001",
  "name": "dairy & eggs",
  "sortOrder": 1,
  "createdAt": "2025-11-04T10:00:00Z",
  "updatedAt": "2025-11-04T10:00:00Z"
}
```

**Note:** Category names are automatically converted to lowercase before storage to ensure consistent data normalization. The UI should apply desired casing through CSS (e.g., `text-transform: capitalize`).

### Unit

Defines custom measurement units for ingredients, supporting weight, volume, or count-based measurements.

**Properties:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique identifier (UUID) |
| `name` | string | Yes | Display name (stored as lowercase, e.g., "grams", "slices", "cans"). CSS should be used for presentation casing. |
| `abbreviation` | string | No | Short form (e.g., "g", "ml", "pcs"). Stored as-is to preserve meaningful casing. |
| `type` | enum | Yes | Measurement type: `weight`, `volume`, or `count` |
| `createdAt` | timestamp | Yes | Creation timestamp |
| `updatedAt` | timestamp | Yes | Last modification timestamp |

**Example:**

```json
{
  "id": "unit-001",
  "name": "slices",
  "abbreviation": "sl",
  "type": "count",
  "createdAt": "2025-11-04T10:00:00Z",
  "updatedAt": "2025-11-04T10:00:00Z"
}
```

**Note:** Unit names are automatically converted to lowercase before storage. Abbreviations preserve their original casing as it may be semantically meaningful (e.g., "mL" vs "ml").

### Item

Represents a product that can be purchased at the supermarket. Items can be ingredients for recipes, ready-to-eat meals, or non-food household items.

**Properties:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique identifier (UUID) |
| `name` | string | Yes | Item name (stored as lowercase, e.g., "carrots", "microwaveable curry", "dish soap"). CSS should be used for presentation casing. |
| `categoryId` | string | Yes | Reference to Category entity |
| `itemType` | enum | Yes | Type of item: `ingredient`, `ready_meal`, or `inedible` |
| `readyMealData` | ReadyMealData | Conditional | Metadata for ready meals. Required if `itemType = ready_meal`, must be null otherwise |
| `createdAt` | timestamp | Yes | Creation timestamp |
| `updatedAt` | timestamp | Yes | Last modification timestamp |

**Item Type Values:**

- `ingredient` - Raw food items that can be used in recipes (e.g., vegetables, cheese, flour)
- `ready_meal` - Pre-prepared food that is ready to eat or heat (e.g., frozen dinners, pre-made sandwiches). Must include `readyMealData`.
- `inedible` - Non-food items (e.g., cleaning supplies, personal care products, paper goods)

**ReadyMealData Type:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `dish` | enum | Yes | Meal type: `breakfast`, `lunch`, `dinner`, or `dessert` |
| `course` | enum | Yes | Course type: `starter`, `main`, or `side` |
| `servings` | number | Yes | Number of servings (positive integer) |
| `prepTimeMinutes` | number | No | Preparation/heating time in minutes |

**Example (Ingredient):**

```json
{
  "id": "item-001",
  "name": "carrots",
  "categoryId": "cat-002",
  "itemType": "ingredient",
  "createdAt": "2025-11-04T10:00:00Z",
  "updatedAt": "2025-11-04T10:00:00Z"
}
```

**Example (Ready Meal):**

```json
{
  "id": "item-002",
  "name": "chicken tikka masala (ready meal)",
  "categoryId": "cat-008",
  "itemType": "ready_meal",
  "readyMealData": {
    "dish": "dinner",
    "course": "main",
    "servings": 1,
    "prepTimeMinutes": 8
  },
  "createdAt": "2025-11-04T10:00:00Z",
  "updatedAt": "2025-11-04T10:00:00Z"
}
```

**Example (Inedible):**

```json
{
  "id": "item-003",
  "name": "dish soap",
  "categoryId": "cat-015",
  "itemType": "inedible",
  "createdAt": "2025-11-04T10:00:00Z",
  "updatedAt": "2025-11-04T10:00:00Z"
}
```

**Note:** Item names are automatically converted to lowercase before storage to ensure consistent data normalization. The UI should apply desired casing through CSS (e.g., `text-transform: capitalize`).

### Recipe

Contains complete instructions for preparing a dish, including ingredients and categorization.

**Properties:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique identifier (UUID) |
| `name` | string | Yes | Recipe name (stored as lowercase). CSS should be used for presentation casing. |
| `description` | string | No | Brief description or summary (stored as-is to preserve author's intent) |
| `steps` | string[] | Yes | Ordered list of preparation instructions (stored as-is to preserve formatting and casing) |
| `ingredients` | RecipeIngredient[] | Yes | List of required ingredients with quantities |
| `dish` | enum | Yes | Meal type: `breakfast`, `lunch`, `dinner`, or `dessert` |
| `course` | enum | Yes | Course type: `starter`, `main`, or `side` |
| `servings` | number | Yes | Default number of servings |
| `prepTimeMinutes` | number | No | Preparation time in minutes |
| `cookTimeMinutes` | number | No | Cooking time in minutes |
| `createdAt` | timestamp | Yes | Creation timestamp |
| `updatedAt` | timestamp | Yes | Last modification timestamp |

**RecipeIngredient Type:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `itemId` | string | Yes | Reference to Item entity (must be of type `ingredient`) |
| `unitId` | string | Yes | Reference to Unit entity |
| `quantity` | number | Yes | Amount needed (positive decimal) |

**Example:**

```json
{
  "id": "rec-001",
  "name": "grilled cheese sandwich",
  "description": "Classic comfort food with crispy bread and melted cheese",
  "steps": [
    "Butter one side of each bread slice",
    "Place cheese between unbuttered sides",
    "Heat pan over medium heat",
    "Grill sandwich until golden brown on both sides and cheese is melted"
  ],
  "ingredients": [
    {
      "itemId": "item-001",
      "unitId": "unit-001",
      "quantity": 2
    },
    {
      "itemId": "item-002",
      "unitId": "unit-002",
      "quantity": 50
    },
    {
      "itemId": "item-003",
      "unitId": "unit-002",
      "quantity": 10
    }
  ],
  "dish": "lunch",
  "course": "main",
  "servings": 1,
  "prepTimeMinutes": 5,
  "cookTimeMinutes": 10,
  "createdAt": "2025-11-04T10:00:00Z",
  "updatedAt": "2025-11-04T10:00:00Z"
}
```

**Note:** Recipe names are automatically converted to lowercase before storage. Descriptions and steps preserve their original casing to maintain the author's formatting and intent. The UI should apply desired casing to recipe names through CSS (e.g., `text-transform: capitalize`).

### Meal

Represents a planned meal for a specific day, containing one or more recipes and/or ready meals.

**Properties:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique identifier (UUID) |
| `date` | date | Yes | The day this meal is planned for (ISO 8601 date format) |
| `dishes` | MealDish[] | Yes | List of recipes and/or ready meals for this meal |
| `servings` | number | Yes | Number of servings to prepare (scales recipe quantities) |
| `notes` | string | No | Optional notes or special instructions |
| `createdAt` | timestamp | Yes | Creation timestamp |
| `updatedAt` | timestamp | Yes | Last modification timestamp |

**MealDish Type:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `recipeId` | string | Conditional | Reference to Recipe entity. Either `recipeId` or `readyMealId` must be provided |
| `readyMealId` | string | Conditional | Reference to Item entity (must be of type `ready_meal`). Either `recipeId` or `readyMealId` must be provided |

**Notes:**
- Each dish in a meal must have exactly one of `recipeId` or `readyMealId` set
- When `readyMealId` is used, the referenced item must have `itemType = ready_meal`
- Ready meals contribute their servings to the meal plan, though the meal-level servings value applies to scaling recipes only

**Example:**

```json
{
  "id": "meal-001",
  "date": "2025-11-10",
  "dishes": [
    {
      "recipeId": "rec-001"
    },
    {
      "readyMealId": "item-002"
    },
    {
      "recipeId": "rec-005"
    }
  ],
  "servings": 4,
  "notes": "Quick dinner - using ready meal for convenience",
  "createdAt": "2025-11-04T10:00:00Z",
  "updatedAt": "2025-11-04T10:00:00Z"
}
```

## Relationships

The following diagram illustrates the relationships between entities:

```
┌──────────────┐
│   Category   │
└──────────────┘
       │
       │ 1:N
       ▼
┌──────────────┐
│     Item     │
│ (ingredient, │
│ ready_meal,  │
│  inedible)   │
└──────────────┘
       │
       │ N:M (ingredients only)
       ▼
┌──────────────┐      ┌──────────────┐
│    Recipe    │◄────►│     Unit     │
└──────────────┘ N:M  └──────────────┘
       │                      │
       │ N:M                  │ N:M (ready meals)
       ▼                      ▼
┌──────────────┐      ┌──────────────┐
│     Meal     │◄─────┤     Item     │
└──────────────┘      │ (ready_meal) │
                      └──────────────┘
```

**Relationship Details:**

- **Category → Item**: One-to-Many
  - Each category can contain multiple items
  - Each item belongs to exactly one category
  - Items can be ingredients, ready meals, or inedible products

- **Item → Recipe**: Many-to-Many (through RecipeIngredient)
  - Each recipe can use multiple items (only items with `itemType = ingredient`)
  - Each ingredient can be used in multiple recipes
  - The relationship includes quantity and unit information
  - Ready meals and inedible items cannot be used in recipes

- **Unit → Recipe**: Many-to-Many (through RecipeIngredient)
  - Each recipe can use multiple units
  - Each unit can be used in multiple recipes

- **Recipe → Meal**: Many-to-Many (through MealDish)
  - Each meal can include multiple recipes
  - Each recipe can appear in multiple meals

- **Item (Ready Meal) → Meal**: Many-to-Many (through MealDish)
  - Each meal can include multiple ready meals
  - Each ready meal can appear in multiple meals
  - Only items with `itemType = ready_meal` can be added to meals

## Data Integrity Rules

### Validation Rules

1. **Category**
   - Name must be unique (case-insensitive, enforced by lowercase storage)
   - Name cannot be empty or whitespace only
   - Name is automatically converted to lowercase before storage
   - sortOrder must be non-negative

2. **Unit**
   - Name must be unique (case-insensitive, enforced by lowercase storage)
   - Name is automatically converted to lowercase before storage
   - Type must be one of: `weight`, `volume`, `count`
   - Abbreviation, if provided, should be short (1-4 characters recommended) and is stored as-is

3. **Item**
   - Name must be unique (case-insensitive, enforced by lowercase storage)
   - Name is automatically converted to lowercase before storage
   - categoryId must reference an existing Category
   - itemType must be one of: `ingredient`, `ready_meal`, `inedible`
   - If `itemType = ready_meal`:
     - `readyMealData` must be provided as an object with:
       - `dish` - one of: `breakfast`, `lunch`, `dinner`, `dessert`
       - `course` - one of: `starter`, `main`, `side`
       - `servings` - positive integer
       - `prepTimeMinutes` - optional, non-negative integer if provided
   - If `itemType ≠ ready_meal`:
     - `readyMealData` must be null or not present

4. **Recipe**
   - Name cannot be empty
   - Name is automatically converted to lowercase before storage
   - Description and steps are stored as-is to preserve formatting
   - Must have at least one ingredient
   - Must have at least one step
   - Dish must be one of: `breakfast`, `lunch`, `dinner`, `dessert`
   - Course must be one of: `starter`, `main`, `side`
   - Servings must be a positive integer
   - All itemId references must exist and reference items with `itemType = ingredient`
   - All unitId references must exist
   - Quantities must be positive numbers

5. **Meal**
   - Date must be a valid ISO 8601 date
   - Must have at least one dish
   - Servings must be a positive integer
   - Each dish must have exactly one of `recipeId` or `readyMealId` set
   - All recipeId references must exist
   - All readyMealId references must exist and reference items with `itemType = ready_meal`

### Referential Integrity

- Deleting a Category should be prevented if any Items reference it
- Deleting a Unit should be prevented if any Recipes use it
- Deleting an Item should be prevented if:
  - Any Recipes use it (for ingredients), OR
  - Any Meals reference it (for ready meals)
- Deleting a Recipe should be prevented if any Meals reference it

Alternatively, implement cascade policies:
- Soft delete with archival flags
- Orphan cleanup with user notification

## IndexedDB Implementation Notes

Given the application uses IndexedDB for persistence:

### Text Normalization

To ensure consistent data storage and querying, the following normalization rules are applied:

**Lowercase Coercion:**
- **Category names** are converted to lowercase before storage
- **Unit names** are converted to lowercase before storage
- **Item names** are converted to lowercase before storage
- **Recipe names** are converted to lowercase before storage

**Preserved Casing:**
- **Unit abbreviations** preserve original casing (semantically meaningful, e.g., "mL" vs "ml")
- **Recipe descriptions** preserve original casing (author's formatting)
- **Recipe steps** preserve original casing (author's formatting)
- **Meal notes** preserve original casing (user's formatting)

**Rationale:**
- Lowercase storage eliminates case-sensitivity issues in searches and prevents duplicate entries
- UI layer applies desired presentation casing via CSS (e.g., `text-transform: capitalize`)
- Multi-line text and abbreviations retain original casing where it may be semantically meaningful

### Object Stores

Create the following object stores:

- `categories` - keyPath: `id`, index on `name`
- `units` - keyPath: `id`, index on `name`
- `items` - keyPath: `id`, indexes on `name`, `categoryId`, `itemType`, and compound index on `itemType` + `readyMealData.dish`
- `recipes` - keyPath: `id`, index on `name`, `dish`, `course`
- `meals` - keyPath: `id`, index on `date`

### Indexing Strategy

- Primary access patterns:
  - Categories by name (for selection UI)
  - Items by category (for shopping list grouping)
  - Items by itemType (for recipe ingredient selection, ready meal filtering, etc.)
  - Ready meals by dish type (for meal planning alongside recipes)
  - Recipes by dish type (for meal planning)
  - Meals by date range (for calendar view)

### Considerations

- Store timestamps as ISO 8601 strings or Unix timestamps for portability
- Use compound indexes if queries frequently filter by multiple fields
- For ready meals, use dot notation for nested property indexing (e.g., `readyMealData.dish`)
- Consider denormalizing frequently accessed data to reduce lookups
- Implement optimistic locking using `updatedAt` timestamps for conflict resolution

## Future Enhancements

Potential extensions to the data model:

1. **Nutritional Information** - Add calories, macros, allergens to items/recipes
2. **Shopping Lists** - Entity for persisted shopping lists with manual additions (non-recipe items), consolidation, and check-off capability
3. **Recipe Ratings** - User feedback and favorites
4. **Tags** - Cross-cutting categorization (vegetarian, quick, budget-friendly)
5. **Portions** - More granular serving size management
6. **Recipe Variants** - Support for recipe modifications and substitutions
7. **Images** - Photos for recipes and items
8. **Cost Tracking** - Budget management with price history per item

