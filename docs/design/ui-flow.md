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

### Edit Page Navigation Pattern

All resource creation and editing is handled through dedicated routable pages rather than modal dialogs. This approach enables:

1. **Deep linking**: Users can bookmark or share specific edit pages
2. **Browser history integration**: Back button works naturally
3. **Navigation chaining**: Complex workflows can chain multiple edit pages together

**Chained Navigation Example**:
When editing a recipe, if the user needs to create a new ingredient item, they can:
1. Click "Add New Item" from the Recipe Edit page
2. Navigate to `/manage/items/add?returnTo=/manage/recipes/123/edit&preselect=true`
3. After saving the new item, return to the Recipe Edit page with the new item pre-selected

**Implementation Pattern**:
- Edit pages accept a `returnTo` query parameter specifying where to navigate after save/cancel
- Pages that create resources accept a `preselect=true` parameter to indicate the created resource should be passed back
- Upon save with preselect enabled, the page redirects to the return path with `?newItemId={id}` (or similar) appended
- The calling page reads the new resource ID from the query parameter and auto-selects it in the appropriate control
- Form state during chained navigation can be preserved using session storage or React Router location state


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
│                     ├─→ Categories Page ─→ Add/Edit Category Page
│                     ├─→ Units Page ─→ Add/Edit Unit Page
│                     ├─→ Items Page ─→ Add/Edit Item Page
│                     └─→ Recipes Page ─→ Add/Edit Recipe Page
│                                           └─→ Recipe Detail Page
└─→ Add/Edit Meal Page
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
- **Add**: Navigates to Add Category Page (`/manage/categories/add`)
- **Edit**: Navigates to Edit Category Page (`/manage/categories/:id/edit`) with pre-populated data
- **Delete**: Shows confirmation dialog (only if no items reference this category)
- **Reorder**: Drag and drop to adjust sort order

#### Add/Edit Category Page

**Purpose**: Dedicated page for creating or editing a category.

**Route**: `/manage/categories/add` or `/manage/categories/:id/edit`

**Elements**:
- Back button (returns to Categories List)
- Page header: "Add Category" or "Edit Category"
- Name input (required)
- Sort order input (optional, numeric)
- Save and Cancel buttons

**Validation**:
- Name must be unique
- Name cannot be empty or whitespace only

**Navigation**:
- **Save**: Returns to Categories List with success message
- **Cancel**: Returns to Categories List without changes
- **Back**: Returns to Categories List without changes

**State Management**:
- Return path defaults to Categories List (`/manage/categories`)
- Can accept a `returnTo` query parameter for chained navigation (future enhancement)

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
- **Add**: Navigates to Add Unit Page (`/manage/units/add`)
- **Edit**: Navigates to Edit Unit Page (`/manage/units/:id/edit`) with pre-populated data
- **Delete**: Shows confirmation dialog (only if no recipes use this unit)

#### Add/Edit Unit Page

**Purpose**: Dedicated page for creating or editing a unit.

**Route**: `/manage/units/add` or `/manage/units/:id/edit`

**Elements**:
- Back button (returns to Units List)
- Page header: "Add Unit" or "Edit Unit"
- Name input (required)
- Abbreviation input (optional)
- Type selector (required): weight, volume, count
- Save and Cancel buttons

**Validation**:
- Name must be unique
- Type must be selected

**Navigation**:
- **Save**: Returns to Units List with success message
- **Cancel**: Returns to Units List without changes
- **Back**: Returns to Units List without changes

**State Management**:
- Return path defaults to Units List (`/manage/units`)
- Can accept a `returnTo` query parameter for chained navigation (future enhancement)

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
- **Add**: Navigates to Add Item Page (`/manage/items/add`)
- **Edit**: Navigates to Edit Item Page (`/manage/items/:id/edit`) with pre-populated data
- **Delete**: Shows confirmation dialog (prevented if item is used in recipes or meals)

#### Add/Edit Item Page

**Purpose**: Dedicated page for creating or editing an item.

**Route**: `/manage/items/add` or `/manage/items/:id/edit`

**Elements**:
- Back button (returns to Items List or return path)
- Page header: "Add Item" or "Edit Item"
- Name input (required)
- Category selector (required, dropdown of categories)
  - "Add New Category" link (navigates to Add Category Page with return path)
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
- **Save**: Returns to Items List (or return path) with success message. If a `preselect=true` query param is present and a return path is provided, the newly created item ID is passed back via URL state
- **Cancel**: Returns to Items List (or return path) without changes
- **Back**: Returns to Items List (or return path) without changes
- **Add New Category**: Navigates to Add Category Page with `returnTo=/manage/items/add` (or current edit path)

**State Management**:
- Return path defaults to Items List (`/manage/items`)
- Accepts a `returnTo` query parameter for chained navigation (e.g., from Recipe Edit page)
- Accepts a `preselect=true` query parameter to indicate the created item should be passed back to the caller
- On save with preselect enabled, redirects to return path with `?newItemId={id}` appended

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
- **Add**: Navigates to Add Recipe Page (`/manage/recipes/add`)
- **View**: Navigates to Recipe Detail Page (`/manage/recipes/:id`)
- **Edit**: Navigates to Edit Recipe Page (`/manage/recipes/:id/edit`)
- **Delete**: Shows confirmation dialog (prevented if recipe is used in any meals)

#### Recipe Detail View

**Purpose**: Display complete recipe information in read-only format.

**Route**: `/manage/recipes/:id`

**Elements**:
- Back button (returns to Recipes List)
- Recipe name (header)
- Description
- Metadata badges: dish type, course, servings, prep time, cook time, total time
- Ingredients list:
  - Quantity, unit, and item name for each ingredient
  - Grouped or ungrouped display
- Numbered steps list
- Action buttons:
  - "Edit Recipe" (navigates to Edit Recipe Page)
  - "Add to Meal" (quick-add to meal planner - navigates to Add Meal Page with recipe pre-selected)
  - "Back to Recipes"

**Navigation**:
- **Edit**: Navigates to Edit Recipe Page (`/manage/recipes/:id/edit`)
- **Add to Meal**: Navigates to Add Meal Page (`/plan/meals/add?recipeId={id}`)
- **Back**: Returns to Recipes List
- **Back button**: Returns to Recipes List or previous page

#### Add/Edit Recipe Page

**Purpose**: Dedicated page for creating or editing a recipe with full details.

**Route**: `/manage/recipes/add` or `/manage/recipes/:id/edit`

**Elements**:

**Header**:
- Back button (returns to previous page)
- Page header: "Add Recipe" or "Edit Recipe"

**Basic Information Section**:
- Name input (required)
- Description textarea (optional)
- Dish type selector (required): breakfast, lunch, dinner, dessert
- Course type selector (required): starter, main, side
- Servings input (required, positive integer)
- Prep time input (optional, minutes)
- Cook time input (optional, minutes)

**Ingredients Section**:
- Section header with "Add Ingredient" button
- "Add New Item" link (navigates to Add Item Page with return path and preselect)
- List of ingredient rows, each showing:
  - Item selector (dropdown/autocomplete of items with `itemType = ingredient`)
  - Unit selector (dropdown of units)
  - Quantity input (positive decimal)
  - Remove button
- Drag-and-drop to reorder ingredients

**Steps Section**:
- Section header with "Add Step" button
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
- **Save**: Returns to Recipe Detail Page (for new recipes) or Recipes List (for edits) with success message
- **Cancel**: Returns to previous screen without changes
- **Back**: Returns to previous screen without changes
- **Add New Item**: Navigates to Add Item Page with `returnTo=/manage/recipes/add` (or current edit path) and `preselect=true`
- **On return from Add Item** (with `newItemId`): Pre-selects the newly created item in the ingredient selector

**State Management**:
- Return path defaults to Recipe Detail Page (for edits) or Recipes List (for new recipes)
- When navigated to from Add Item page with `?newItemId={id}`, automatically pre-selects that item in the next ingredient row
- Preserves form state during navigation to/from Add Item page (consider using session storage or URL state)

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
- **Add Meal**: Click "Add Meal" on a specific day (navigates to Add Meal Page)
- **Generate Shopping List**: Creates shopping list from all meals in visible date range

**Navigation**:
- **Add Meal**: Navigates to Add Meal Page (`/plan/meals/add?date={selectedDate}`) for selected date
- **View Meal**: Opens Meal Detail modal
- **Generate Shopping List**: Navigates to Shopping List Generator with date range pre-set

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
- **Edit**: Navigates to Edit Meal Page (`/plan/meals/:id/edit`)
- Delete: Shows confirmation, then removes meal and refreshes calendar
- Close: Returns to calendar

#### Add/Edit Meal Page

**Purpose**: Dedicated page for creating or modifying a scheduled meal.

**Route**: `/plan/meals/add` or `/plan/meals/:id/edit`

**Elements**:
- Back button (returns to Meal Calendar)
- Page header: "Add Meal" or "Edit Meal"
- Date picker (required, pre-filled when adding from calendar via query param)
- Servings input (required, positive integer)
- Notes textarea (optional)

**Dishes Section**:
- Section header with "Add Recipe" and "Add Ready Meal" buttons
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
- **Save**: Returns to Meal Calendar View with success message
- **Cancel**: Returns to Meal Calendar View without changes
- **Back**: Returns to Meal Calendar View without changes

**State Management**:
- Return path defaults to Meal Calendar View (`/`)
- Accepts a `date` query parameter to pre-fill the date picker
- Accepts a `recipeId` query parameter to pre-select a recipe (e.g., from Recipe Detail "Add to Meal" button)

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
