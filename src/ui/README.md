# UI Components Reference

Quick reference for all UI components in the meal planner application. Check this before creating new components to avoid duplication.

## Global Components (`src/ui/components/`)

| Component | Purpose |
|-----------|---------|
| `BottomNav` | Primary navigation bar with Plan, Shop, Manage tabs |
| `PageHeader` | Standard page header with back button and title |

## Icons (`src/ui/components/icons/`)

| Component | Purpose |
|-----------|---------|
| `AlertIcon` | Warnings and confirmations |
| `ArrowLeftIcon` | Back navigation |
| `CalendarIcon` | Plan/scheduling features |
| `CategoryIcon` | Category management |
| `ChevronRightIcon` | Forward navigation, expandable items |
| `DeleteIcon` | Delete actions |
| `DragHandleIcon` | Drag and drop reordering |
| `EditIcon` | Edit actions |
| `Icon` | Base icon component with common props |
| `ItemIcon` | Item/ingredient management |
| `PlusIcon` | Add new items |
| `RecipeIcon` | Recipe management |
| `SettingsIcon` | Settings/management features |
| `ShoppingCartIcon` | Shopping list features |
| `UnitIcon` | Unit of measurement management |

## Layouts (`src/ui/layouts/`)

| Component | Purpose |
|-----------|---------|
| `MainLayout` | Root layout with BottomNav and Outlet for page content |

## Hooks (`src/ui/hooks/`)

| Hook | Purpose |
|------|---------|
| `useManageNavigation` | Navigate back to `/manage` hub page |

## Providers (`src/ui/providers/`)

| Provider | Purpose |
|----------|---------|
| `DatabaseProvider` | Provides database access throughout component tree via React Context |

### Provider Hooks

| Hook | Purpose |
|------|---------|
| `useDatabase` | Access database instance, loading state, and initialization errors |

## Pages (`src/ui/pages/`)

| Page | Route | Purpose | Status |
|------|-------|---------|--------|
| `CategoriesPage` | `/manage/categories` | CRUD and drag-to-reorder categories | ✅ Complete |
| `ItemsPage` | `/manage/items` | Manage grocery items | 🚧 Placeholder |
| `ManagePage` | `/manage` | Hub for categories, units, items, recipes | ✅ Complete |
| `PlanPage` | `/` | Meal planning calendar | 🚧 Placeholder |
| `RecipeDetailPage` | `/recipes/:id` | View/edit recipe details | 🚧 Placeholder |
| `RecipesPage` | `/manage/recipes` | Manage recipes | 🚧 Placeholder |
| `ShopPage` | `/shop` | Shopping list | 🚧 Placeholder |
| `UnitsPage` | `/manage/units` | Manage measurement units | 🚧 Placeholder |

## Page-Specific Components

### CategoriesPage (`src/ui/pages/CategoriesPage/components/`)

| Component | Purpose |
|-----------|---------|
| `CategoryForm` | Modal form for add/edit category with validation |
| `CategoryList` | Drag-and-drop sortable list of categories |
| `CategoryListItem` | Individual category item with edit/delete actions |
| `DeleteConfirmation` | Modal confirmation dialog for category deletion |
| `ErrorAlert` | Error message display (could be promoted to global) |
| `FormField` | Form field wrapper with label/hints (could be promoted to global) |

### ManagePage (`src/ui/pages/ManagePage/components/`)

| Component | Purpose |
|-----------|---------|
| `NavigationCard` | Clickable card for navigating to management sections |

## Architecture Notes

- **Pages**: Use container/presentation pattern (`.tsx` + `-view.tsx`)
- **Styling**: Each component has its own CSS file
- **Storybook**: Create `.stories.tsx` for all presentation components
- **Dependencies**: React Router (navigation), Framer Motion (drag-and-drop)

## Guidelines

1. Check this README before creating new components
2. Reuse existing components where possible
3. Put reusable components in `src/ui/components/`
4. Put page-specific components in `src/ui/pages/[PageName]/components/`
5. Update this README when adding new components
6. Consider promoting page-specific components to global if needed elsewhere

---

Last Updated: 7 November 2025
