[back](../standards.md)

## Front End

- Since the app is entirely mobile-centric, don't worry about supporting tablet or PC screen sizes or landscape orientations.
- Data models and business logic should not be represented in the UI source code
- Separate state management from presentation logic:
  - Smart page-level components fetch and manipulate state and pass loaded objects, but have no visualisation logic
  - Dumb presentation components contain all the visualisation logic, only managing internal, transient state
- Components:
  - should be modular, reusable, and well-documented.
  - each component should have its own file
- directory structure:
  - ./components - re-usable general purpose components
  - ./pages
    - ./{PAGE_NAME}
      - ./{PAGE_NAME}.tsx - smart page-level component
      - ./{PAGE_NAME}-view.tsx - dump page-level presentation component
      - ./{PAGE_NAME}.stories.tsx - page-level story using the `{PAGE_NAME}-view.tsx` component
        - ./components - subdirectory for page-specific components
  - ./layout - router layout components
- Icons should be embedded as SVG React components, with inspiration available at https://reactsvgicons.com/
- Animations should be implemented using Framer-motion: (reference: https://motion.dev/docs/react)
- Drag and drop in lists should be implemented using the Framer-motion Reorder component: (reference: https://motion.dev/docs/react-reorder)
- CSS
  - Inline styles should be avoided, except where absolutely required to avoid visual artifacts.
  - CSS variables should be used for all theming (i.e. colours, spacing, radiuses, etc.)
  - CSS should support light mode and dark mode using media queries to detect the platform preference
  - Individual components stylesheets should not distinguish between light mode and dark mode. They should instead use centrally managed CSS variables which are themselves toggled using media queries.
- Storybook
  - A stories file should be provided for each presentation component, with individual stories for each significant visual mode
  - Don't create stories for light and dark mode, storybook should be configured to respond to the browser preference and the components should follow suit
  - Storybook's viewport should be configured to show a mobile view by default.
- Offline first: Use a PWA-centric approach and local persistence to retain full functionality when offline
- Accessibility, for humans and for playwright
  - all non-standard input elements should include role and aria-label annotations
  - standard input elements should be labelled correctly
