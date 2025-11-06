[back](../design.md)


# UI Flow (Mobile-First PWA)

This document outlines the user interface flow for the Meal Planner AI application, optimized for a mobile-first progressive web app (PWA) experience. It describes the primary screens, navigation model, and user workflows.

## Rationale

- **Mobile-first PWA**: Prioritizes quick access and thumb-friendly navigation.
- **Default Landing**: Users land directly on the "Plan" (Meal Calendar) page, reflecting the app’s core value.
- **Navigation**: Uses a persistent, mobile-style bottom navigation bar for primary sections.

## Overview

The application is structured around three primary navigation sections, each supporting key workflows:

1. **Plan** - Meal calendar and planning interface (default landing page)
2. **Shop** - Shopping list generation and management
3. **Manage** - Hub page with links to dedicated management pages for categories, units, items, and recipes

Management workflows (Categories, Units, Items, Recipes) are accessed via dedicated pages linked from the Manage hub. There is no separate Home/Dashboard page; summary information is surfaced contextually (e.g., at the top of the Plan page).


## Application Structure

### Navigation Model

The application uses a persistent, mobile-style **bottom navigation bar** with the following primary sections:

- **Plan** (default landing): Meal calendar and planning interface
- **Shop**: Shopping list generation and management
- **Manage**: Hub page with navigation cards/links to dedicated management pages

#### Navigation Pattern

- Tapping a nav icon switches to the corresponding section.
- "Manage" opens a hub page with navigation cards for Categories, Units, Items, and Recipes.
- Each navigation card links to a dedicated management page for that resource type.
- There is no separate Home/Dashboard page; summary cards (e.g., quick stats, recent activity) may be shown at the top of the Plan page or as overlays.

### Page Hierarchy

```
┌─────────────────────────────────────────────┐
│           [Bottom Navigation Bar]           │
│  ┌───────┬───────┬────────┐                 │
│  │ Plan  │ Shop  │ Manage │                 │
│  └───────┴───────┴────────┘                 │
└─────────────────────────────────────────────┘
  │         │         │
  ▼         ▼         ▼
Meal Plan  Shopping  Manage Hub
Calendar    List      │
                      ├─→ Categories Page
                      ├─→ Units Page
                      ├─→ Items Page
                      └─→ Recipes Page
```

## Detailed Screen Flows


### 1. Plan (Default Landing)

**Purpose**: Visualize and manage scheduled meals on a calendar. This is the first screen users see.

**Elements**:
- Page header: "Meal Plan"
- (Optional) Summary cards at the top: total recipes, upcoming meals, items in shopping list
- Date range selector: week/month view, navigation arrows, "Today" button
- Calendar grid: each day with date, list of meals, "Add Meal" button
- Action buttons: "Generate Shopping List" for selected date range

**Navigation**:
- Add/Edit Meal: Opens Add/Edit Meal form
- View Meal: Opens Meal Detail modal
- Generate Shopping List: Navigates to Shopping List Generator with date range pre-set

---

### 2. Manage Hub

**Purpose**: Provide navigation to dedicated management pages for different resource types.

**Elements**:
- Page header: "Manage"
- (Optional) Summary cards at the top showing:
  - Total categories count
  - Total units count
  - Total items count
  - Total recipes count
- Grid of navigation cards, each displaying:
  - Icon representing the resource type
  - Resource type name (Categories, Units, Items, Recipes)
  - Count of resources (e.g., "12 categories")
  - Arrow or chevron indicating it's a link
- Cards should be large, touch-friendly buttons optimized for mobile

**Navigation**:
- Tap a card to navigate to the corresponding dedicated management page:
  - Categories → Categories List Screen
  - Units → Units List Screen
  - Items → Items List Screen
  - Recipes → Recipes List Screen

---

### 3. Category Management

#### Categories List Screen

**Purpose**: View and manage all supermarket categories.

**Elements**:
- Back button (returns to Manage Hub)
- Page header: "Categories"
- "Add Category" button
- Sortable/draggable list of categories showing:
  - Category name
  - Item count (number of items in category)
  - Edit and delete actions
- Sort order can be adjusted via drag-and-drop (updates `sortOrder` field)

**Actions**:
- **Back**: Returns to Manage Hub
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

### 4. Unit Management

#### Units List Screen

**Purpose**: View and manage measurement units.

**Elements**:
- Back button (returns to Manage Hub)
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
- **Back**: Returns to Manage Hub
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

### 5. Item Management

#### Items List Screen

**Purpose**: View and manage all purchasable items (ingredients, ready meals, household items).

**Elements**:
- Back button (returns to Manage Hub)
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
- **Back**: Returns to Manage Hub
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

### 6. Recipe Management

#### Recipes List Screen

**Purpose**: Browse and manage all recipes.

**Elements**:
- Back button (returns to Manage Hub)
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
- **Back**: Returns to Manage Hub
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

### 7. Meal Planning

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

### 8. Shopping List

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
2. Plan (Meal Calendar) page is shown, with prompts to set up data if empty
3. User taps **Manage** in the bottom nav
4. Manage Hub displays navigation cards for Categories, Units, Items, and Recipes
5. User taps **Categories** card, creates categories, taps back to hub
6. User taps **Units** card, creates units, taps back to hub
7. User taps **Items** card, adds ingredients, taps back to hub
8. User taps **Recipes** card, creates first recipe

### Workflow 2: Planning a Week of Meals

1. User lands on Plan (Meal Calendar)
2. Selects week view
3. For each day to plan:
  - Taps "Add Meal" on that day
  - Selects recipes or ready meals
  - Sets servings, adds notes, saves meal
4. Reviews week at a glance on calendar

### Workflow 3: Generating a Shopping List

1. User taps **Shop** in the bottom nav
2. Selects date range (e.g., "This Week")
3. Taps "Generate List"
4. Reviews consolidated list grouped by category
5. Checks off items while shopping
6. Optionally prints or exports list

### Workflow 4: Creating a New Recipe

1. User taps **Manage** in the bottom nav
2. Taps **Recipes** card on the Manage Hub
3. Taps "Add Recipe" on the Recipes List screen
4. Fills in details, adds ingredients and steps
5. Saves recipe
6. Recipe appears in Recipes List and is available for meal planning

### Workflow 5: Adding a Ready Meal Item and Planning It

1. User taps **Manage** in the bottom nav
2. Taps **Items** card on the Manage Hub
3. Taps "Add Item" on the Items List screen
4. Enters name, selects category and type "ready_meal"
5. Fills in ready meal details
6. Saves item
7. Returns to Plan via bottom nav, adds a meal for a day
8. Taps "Add Ready Meal" in meal form, selects the item
9. Saves meal; ready meal appears in calendar and shopping list

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
