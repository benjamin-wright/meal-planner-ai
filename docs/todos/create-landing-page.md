[back](../todo.md)

# Task: Create Landing Page

---
**Agent**: Frontend  
**Status**: Not Started  
**Priority**: High  
**Dependencies**: Setup Routing and Navigation  
---

## Overview

Create the home/dashboard landing page that serves as the central entry point for the meal planning application.

## Scope

Implement the dashboard page as specified in `docs/design/ui-flow.md`:

1. **Dashboard Page Component** - Main smart component that will fetch and manage state
2. **Dashboard Presentation Components** - Modular UI components for different dashboard sections
3. **Storybook Stories** - Visual documentation for all presentation components

## Requirements

- Follow the dashboard design from `docs/design/ui-flow.md` Section 1
- Create the following sections:
  - Welcome message with current date
  - Quick statistics cards (placeholders for now):
    - Total recipes count
    - Upcoming meals count
    - Shopping list items count
  - Quick action buttons:
    - "Plan a Meal" (navigates to meal planning)
    - "Create Recipe" (navigates to recipe creation)
    - "View Shopping List" (navigates to shopping list)
  - Recent activity feed (placeholder/empty state for now)
- Separate smart (page-level) and dumb (presentation) components per front-end standards
- Support light and dark modes
- Create responsive layout for mobile-first design
- Include Storybook stories for all presentation components

## Acceptance Criteria

- [ ] Dashboard page component renders at `/` route
- [ ] Welcome message displays with current date
- [ ] Three statistics cards render (with placeholder/zero values)
- [ ] Three quick action buttons render and navigate correctly
- [ ] Recent activity section renders (with empty state message)
- [ ] Component structure separates smart and dumb components
- [ ] All presentation components have Storybook stories
- [ ] Layout is responsive and works on mobile viewports
- [ ] Light and dark mode styling works correctly
- [ ] Code compiles without errors
- [ ] Playwright can navigate to and interact with the page

## Notes

- Statistics will show placeholder values (0 or "None") until the backend services are connected
- Recent activity can show an empty state message like "No recent activity"
- Focus on layout, styling, and navigation - data integration comes later
- Use CSS variables for theming per front-end standards
