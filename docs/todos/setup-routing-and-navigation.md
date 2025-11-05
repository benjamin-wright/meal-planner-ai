[back](../todo.md)

# Task: Setup Routing and Navigation

---
**Agent**: Frontend  
**Status**: Not Started  
**Priority**: High  
---

## Overview

Implement the routing infrastructure and main navigation structure for the meal planning application based on the navigation model defined in the UI flow documentation.

## Scope

Set up client-side routing and create the main navigation shell:

1. **Router Configuration** - Setup React Router with all main routes
2. **Navigation Component** - Top-level navigation menu/header
3. **Layout Component** - Main application layout wrapper
4. **Route Guards** - Any necessary route protection or redirection logic

## Requirements

- Install and configure React Router (latest version compatible with React 19)
- Create routes for all main sections as defined in `docs/design/ui-flow.md`:
  - Home/Dashboard (`/`)
  - Categories List (`/manage/categories`)
  - Units List (`/manage/units`)
  - Items List (`/manage/items`)
  - Recipes List (`/manage/recipes`)
  - Recipe Detail (`/manage/recipes/:id`)
  - Meal Calendar (`/plan`)
  - Shopping List (`/shop`)
- Create a responsive navigation component following front-end standards
- Support both light and dark modes using CSS variables
- Navigation should work offline (PWA requirement)
- Follow component structure from `docs/standards/front-end.md`

## Acceptance Criteria

- [ ] React Router is installed and configured
- [ ] All main routes are defined and navigable
- [ ] Navigation component renders on all pages
- [ ] Navigation highlights the current active route
- [ ] Navigation supports the "Manage" dropdown/expandable menu
- [ ] Layout component provides consistent page structure
- [ ] Routing works correctly with browser back/forward buttons
- [ ] Navigation is responsive for mobile devices
- [ ] Light and dark mode styling is implemented
- [ ] Code compiles without errors
- [ ] Basic manual testing confirms navigation works

## Notes

- Placeholder/stub pages are acceptable for now - they will be filled in by subsequent tasks
- Focus on the navigation structure and routing mechanics
- Storybook stories for the navigation component should show different states (active routes, mobile view, etc.)
