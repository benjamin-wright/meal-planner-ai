[back](../design.md)

# UI Flow

This document outlines the user interface flow for the Meal Planner AI application, describing the primary screens, navigation paths, and user workflows.

## Overview

The application is structured around five core management workflows and two planning/output views:

1. **Category Management** - Create and organize supermarket categories
2. **Unit Management** - Define custom measurement units
3. **Item Management** - Manage ingredients, ready meals, and household items
4. **Recipe Management** - Create and edit recipes with ingredients
5. **Meal Planning** - Schedule meals on a calendar
6. **Shopping List View** - Generate consolidated shopping lists from meal plans
7. **Dashboard/Home** - Central navigation and overview

## Application Structure

### Navigation Model

The application uses a primary navigation pattern with the following top-level sections:

- **Home** - Dashboard with quick access and overview
- **Manage** - Dropdown/expandable menu containing:
  - Categories
  - Units
  - Items
  - Recipes
- **Plan** - Meal calendar and planning interface
- **Shop** - Shopping list generation and management

### Page Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                         Home/Dashboard                       │
│  - Quick stats (recipes count, upcoming meals, etc.)        │
│  - Quick access to common actions                           │
│  - Recent activity                                          │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│    Manage    │      │     Plan     │      │     Shop     │
└──────────────┘      └──────────────┘      └──────────────┘
        │                     │                     │
        │                     ▼                     ▼
        │             ┌──────────────┐      ┌──────────────┐
        │             │ Meal Calendar│      │Shopping List │
        │             │    View      │      │   Generator  │
        │             └──────────────┘      └──────────────┘
        │                     │
        │                     ▼
        │             ┌──────────────┐
        │             │  Add/Edit    │
        │             │     Meal     │
        │             └──────────────┘
        │
        ├──► Categories List ──► Add/Edit Category
        │
        ├──► Units List ──► Add/Edit Unit
        │
        ├──► Items List ──► Add/Edit Item
        │
        └──► Recipes List ──► Add/Edit Recipe ──► Recipe Detail View
```

## Detailed Screen Flows

### 1. Home/Dashboard

**Purpose**: Central entry point providing overview and quick access to common actions.

**Elements**:
- Welcome message with current date
- Quick statistics cards:
  - Total recipes count
  - Upcoming meals (next 7 days)
  - Items in shopping list
- Quick action buttons:
  - "Plan a Meal"
  - "Create Recipe"
  - "View Shopping List"
- Recent activity feed (last edited recipes, recently added meals)

**Navigation**:
- To Meal Planning: Click "Plan a Meal" or "Plan" in main nav
- To Recipe Creation: Click "Create Recipe"
- To Shopping List: Click "View Shopping List" or "Shop" in main nav
- To Management Screens: Use "Manage" dropdown menu

---

### 2. Category Management

#### Categories List Screen

**Purpose**: View and manage all supermarket categories.

**Elements**:
- Page header: "Categories"
- "Add Category" button
- Sortable/draggable list of categories showing:
  - Category name
  - Item count (number of items in category)
  - Edit and delete actions
- Sort order can be adjusted via drag-and-drop (updates `sortOrder` field)

**Actions**:
- **Add**: Opens "Add Category" modal/form
- **Edit**: Opens "Edit Category" modal/form with pre-populated data
- **Delete**: Shows confirmation dialog (only if no items reference this category)
- **Reorder**: Drag and drop to adjust sort order

#### Add/Edit Category Form

**Elements**:
- Name input (required)
- Sort order input (optional, numeric)
- Save and Cancel buttons

**Validation**:
- Name must be unique
- Name cannot be empty or whitespace only

**Navigation**:
- Save: Returns to Categories List with success message
- Cancel: Returns to Categories List without changes

---

### 3. Unit Management

#### Units List Screen

**Purpose**: View and manage measurement units.

**Elements**:
- Page header: "Units"
- "Add Unit" button
- Filterable list of units with tabs/filters for:
  - All units
  - Weight
  - Volume
  - Count
- Each unit card/row displays:
  - Name and abbreviation
  - Type badge (weight/volume/count)
  - Usage count (number of recipes using this unit)
  - Edit and delete actions

**Actions**:
- **Filter**: Toggle between unit types
- **Add**: Opens "Add Unit" modal/form
- **Edit**: Opens "Edit Unit" modal/form with pre-populated data
- **Delete**: Shows confirmation dialog (only if no recipes use this unit)

#### Add/Edit Unit Form

**Elements**:
- Name input (required)
- Abbreviation input (optional)
- Type selector (required): weight, volume, count
- Save and Cancel buttons

**Validation**:
- Name must be unique
- Type must be selected

**Navigation**:
- Save: Returns to Units List with success message
- Cancel: Returns to Units List without changes

---

### 4. Item Management

#### Items List Screen

**Purpose**: View and manage all purchasable items (ingredients, ready meals, household items).

**Elements**:
- Page header: "Items"
- "Add Item" button
- Filter controls:
  - Search bar (filter by name)
  - Category filter dropdown
  - Item type tabs: All, Ingredients, Ready Meals, Inedible
- Grid or list view of items showing:
  - Item name
  - Category badge
  - Item type badge
  - For ready meals: dish type and servings
  - Edit and delete actions

**Actions**:
- **Search/Filter**: Real-time filtering by name, category, and type
- **Add**: Opens "Add Item" form
- **Edit**: Opens "Edit Item" form with pre-populated data
- **Delete**: Shows confirmation dialog (prevented if item is used in recipes or meals)

#### Add/Edit Item Form

**Elements**:
- Name input (required)
- Category selector (required, dropdown of categories)
- Item type selector (required): ingredient, ready_meal, inedible
- Conditional "Ready Meal Details" section (shown only if type = ready_meal):
  - Dish selector: breakfast, lunch, dinner, dessert
  - Course selector: starter, main, side
  - Servings input (positive integer)
  - Prep time input (optional, minutes)
- Save and Cancel buttons

**Validation**:
- Name must be unique
- Category must be selected
- If item type is ready_meal, all ready meal fields are required (except prep time)

**Navigation**:
- Save: Returns to Items List with success message
- Cancel: Returns to Items List without changes

---

### 5. Recipe Management

#### Recipes List Screen

**Purpose**: Browse and manage all recipes.

**Elements**:
- Page header: "Recipes"
- "Add Recipe" button
- Filter/search controls:
  - Search bar (filter by name)
  - Dish type filter: All, Breakfast, Lunch, Dinner, Dessert
  - Course type filter: All, Starter, Main, Side
- Grid of recipe cards showing:
  - Recipe name
  - Dish and course badges
  - Servings count
  - Total time (prep + cook)
  - Thumbnail or placeholder image
  - Quick actions: View, Edit, Delete

**Actions**:
- **Search/Filter**: Real-time filtering by name, dish type, and course
- **Add**: Navigates to "Add Recipe" screen
- **View**: Navigates to "Recipe Detail View"
- **Edit**: Navigates to "Edit Recipe" screen
- **Delete**: Shows confirmation dialog (prevented if recipe is used in any meals)

#### Recipe Detail View

**Purpose**: Display complete recipe information in read-only format.

**Elements**:
- Recipe name (header)
- Description
- Metadata badges: dish type, course, servings, prep time, cook time, total time
- Ingredients list:
  - Quantity, unit, and item name for each ingredient
  - Grouped or ungrouped display
- Numbered steps list
- Action buttons:
  - "Edit Recipe"
  - "Add to Meal" (quick-add to meal planner)
  - "Back to Recipes"

**Navigation**:
- Edit: Opens Edit Recipe screen
- Add to Meal: Opens meal planning interface with this recipe pre-selected
- Back: Returns to Recipes List

#### Add/Edit Recipe Screen

**Purpose**: Create or modify a recipe with full details.

**Elements**:

**Basic Information Section**:
- Name input (required)
- Description textarea (optional)
- Dish type selector (required): breakfast, lunch, dinner, dessert
- Course type selector (required): starter, main, side
- Servings input (required, positive integer)
- Prep time input (optional, minutes)
- Cook time input (optional, minutes)

**Ingredients Section**:
- "Add Ingredient" button
- List of ingredient rows, each showing:
  - Item selector (dropdown/autocomplete of items with `itemType = ingredient`)
  - Unit selector (dropdown of units)
  - Quantity input (positive decimal)
  - Remove button
- Drag-and-drop to reorder ingredients

**Steps Section**:
- "Add Step" button
- List of step inputs (text areas), each with:
  - Step number (auto-numbered)
  - Step text input
  - Remove button
- Drag-and-drop to reorder steps

**Form Actions**:
- Save button
- Cancel button

**Validation**:
- Name cannot be empty
- Must have at least one ingredient
- Must have at least one step
- All ingredient fields must be complete (item, unit, quantity > 0)
- All step fields must be non-empty

**Navigation**:
- Save: Returns to Recipe Detail View (for new recipes) or Recipes List (for edits) with success message
- Cancel: Returns to previous screen without changes

---

### 6. Meal Planning

#### Meal Calendar View

**Purpose**: Visualize and manage scheduled meals on a calendar.

**Elements**:
- Page header: "Meal Plan"
- Date range selector:
  - Week view (default)
  - Month view
  - Navigation arrows (previous/next week or month)
  - "Today" button
- Calendar grid showing:
  - Each day with:
    - Date
    - List of meals for that day (showing meal dish types and names)
    - "Add Meal" button for each day
- Action buttons:
  - "Generate Shopping List" (for selected date range)

**Actions**:
- **Navigate**: Previous/next period, or jump to today
- **View Meal**: Click on meal card to view details (opens Meal Detail modal)
- **Add Meal**: Click "Add Meal" on a specific day (opens Add Meal form)
- **Generate Shopping List**: Creates shopping list from all meals in visible date range

**Navigation**:
- Add Meal: Opens Add Meal form for selected date
- View Meal: Opens Meal Detail modal
- Generate Shopping List: Navigates to Shopping List Generator with date range pre-set

#### Meal Detail Modal

**Purpose**: Quick view of meal details without leaving calendar.

**Elements**:
- Meal date (header)
- Servings count
- List of dishes:
  - Recipe names (with "View Recipe" link)
  - Ready meal names
  - Course type for each dish
- Notes section
- Action buttons:
  - "Edit Meal"
  - "Delete Meal"
  - "Close"

**Navigation**:
- View Recipe: Opens Recipe Detail View in new context or modal
- Edit: Opens Edit Meal form
- Delete: Shows confirmation, then removes meal and refreshes calendar
- Close: Returns to calendar

#### Add/Edit Meal Form

**Purpose**: Create or modify a scheduled meal.

**Elements**:
- Date picker (required, pre-filled when adding from calendar)
- Servings input (required, positive integer)
- Notes textarea (optional)

**Dishes Section**:
- "Add Recipe" button
- "Add Ready Meal" button
- List of selected dishes showing:
  - Type indicator (recipe or ready meal)
  - Name
  - Course type
  - Remove button
- Each dish can be added via:
  - Recipe selector (dropdown/search of recipes)
  - Ready meal selector (dropdown/search of items with `itemType = ready_meal`)

**Form Actions**:
- Save button
- Cancel button

**Validation**:
- Date must be valid
- Servings must be positive integer
- Must have at least one dish (recipe or ready meal)

**Navigation**:
- Save: Returns to Meal Calendar View with success message
- Cancel: Returns to Meal Calendar View without changes

---

### 7. Shopping List

#### Shopping List Generator

**Purpose**: Generate consolidated shopping list from meal plans.

**Elements**:
- Page header: "Shopping List"
- Date range selector:
  - Start date picker
  - End date picker
  - Quick select buttons: "This Week", "Next Week", "This Month"
- "Generate List" button
- Generated shopping list display:
  - Grouped by category (sorted by category `sortOrder`)
  - Each category section shows:
    - Category name header
    - List of items with:
      - Item name
      - Total quantity needed
      - Unit
      - Checkbox for marking as purchased/collected
  - Summary section:
    - Total unique items count
    - Total meals in selected range

**Actions**:
- **Select Date Range**: Update start and end dates
- **Generate**: Consolidates ingredients from all meals in date range, calculating totals
- **Check Off**: Mark individual items as collected (persists until list is regenerated)
- **Print/Export**: Optional buttons to print or export list

**Business Logic**:
- For each meal in date range:
  - For each recipe in meal:
    - Calculate ingredient quantities scaled by meal servings
  - For each ready meal:
    - Add the ready meal item to the shopping list (no ingredient breakdown)
- Consolidate duplicate items by summing quantities (same item + same unit)
- Group by category and sort by category `sortOrder`

**Navigation**:
- Back to Meal Plan: Returns to calendar view

---

## User Workflows

### Workflow 1: First-Time Setup

1. User opens app for the first time
2. Dashboard is empty with prompts to set up data
3. User navigates to Manage → Categories
4. Creates categories matching their supermarket layout
5. User navigates to Manage → Units
6. Creates common units they'll use (grams, cups, slices, etc.)
7. User navigates to Manage → Items
8. Adds common ingredients they use
9. User navigates to Manage → Recipes
10. Creates their first recipe using the items and units

### Workflow 2: Planning a Week of Meals

1. User navigates to Plan (Meal Calendar)
2. Selects week view
3. For each day they want to plan:
   - Clicks "Add Meal" on that day
   - Selects recipes from dropdown (or adds ready meals)
   - Sets servings count
   - Adds optional notes
   - Saves meal
4. Reviews week at a glance on calendar

### Workflow 3: Generating a Shopping List

1. User navigates to Shop (Shopping List Generator)
2. Selects date range (e.g., "This Week")
3. Clicks "Generate List"
4. Reviews consolidated list grouped by category
5. Uses list while shopping, checking off items as collected
6. Optionally prints or exports list for offline use

### Workflow 4: Creating a New Recipe

1. User navigates to Manage → Recipes
2. Clicks "Add Recipe"
3. Fills in basic details (name, description, dish type, course, servings, times)
4. Adds ingredients one by one:
   - Selects item from dropdown
   - Selects unit
   - Enters quantity
5. Adds preparation steps in order
6. Reviews and saves
7. Recipe appears in Recipes List and is available for meal planning

### Workflow 5: Adding a Ready Meal Item and Planning It

1. User navigates to Manage → Items
2. Clicks "Add Item"
3. Enters name (e.g., "Frozen Lasagna")
4. Selects category (e.g., "Frozen Foods")
5. Selects item type: "ready_meal"
6. Fills in ready meal details:
   - Dish: dinner
   - Course: main
   - Servings: 2
   - Prep time: 45 minutes
7. Saves item
8. User navigates to Plan
9. Adds a meal for a specific day
10. Clicks "Add Ready Meal" in meal form
11. Selects the "Frozen Lasagna" item
12. Saves meal
13. Ready meal appears in calendar and will be included in shopping list

---

## Future Enhancements

Potential UI improvements based on data model future enhancements:

1. **Recipe Import**: Bulk import from URLs or files
2. **Meal Templates**: Save common meal combinations for quick planning
3. **Shopping List Customization**: Add non-meal items manually, mark items as "already have"
4. **Recipe Search**: Advanced filtering by ingredients, time, nutritional info
5. **Drag-and-Drop Meal Planning**: Drag recipes from list directly onto calendar
6. **Mobile Optimization**: Touch-friendly interfaces, swipe gestures
7. **Offline Indicators**: Visual feedback when offline, sync status
8. **Recipe Sharing**: Export/import recipes as JSON
9. **Meal History**: View past meals and statistics
10. **Smart Suggestions**: AI-powered meal suggestions based on preferences and history
