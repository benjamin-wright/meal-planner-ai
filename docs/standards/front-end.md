[back](../standards.md)

## Front End

- Data models and business logic should not be represented in the UI source code
- Separate state management from presentation logic:
  - Smart page-level components fetch and manipulate state and pass loaded objects, but have no visualisation logic
  - Dumb presentation components contain all the visualisation logic, only managing internal, transient state
- Components should be modular, reusable, and well-documented.
- Icons should be embedded as SVG React components, with inspiration available at https://reactsvgicons.com/
- Animations should be implemented using Framer-motion: (reference: https://motion.dev/docs/react)
- Drag and drop in lists should be implemented using the Framer-motion Reorder component: (reference: https://motion.dev/docs/react-reorder)
- Inline styles should be avoided, except where absolutely required to avoid visual artifacts.
- A Storybook stories file should be provided for each presentation component, with individual stories for each significant visual mode
- Offline first: Use a PWA-centric approach and local persistence to retain full functionality when offline
- Accessibility, for humans and for playwright
  - all non-standard input elements should include role and aria-label annotations
  - standard input elements should be labelled correctly
