[back](../standards.md)

## Linting

- linting should be available via `npm run lint`
- linting should be integrated with the IDE

## Unit Tests

- prefer end-to-end tests over unit tests.
- prefer unit tests for atomic functions with simple inputs and outputs.
- defined next to the code they are testing, e.g. tests for `examples.ts` should be in `examples.spec.ts`

## End to End Tests

- in `/tests` directory
- Uses Playwright
- Use page objects pattern, encapsulate dom interactions, providing a simple descriptive API for page interactions so that the tests themselves remain readable.
- Use playwright assertions where possible for better await / retry behaviour
- Prefer navigating between pages by using on-screen controls instead of URL navigation
- When determining whether a control is active, prefer using playwright built-in toBeVisible and toBeEnabled instead. If that's not possible, use accessibility labels instead.
- Avoid creating too many test cases. Instead of splitting assertions on a single page into seprate test statements, try to consolidate them, to avoid wasting time repeating the same UI interactions unnecessarily.
- Page tests:
  - stored in `tests/pages/`
  - separate test file per page, except for e.g. units-edit page which should be in a separate describe in the same file as the units page.
  - tests interativity and content of pages in isolation
- Workflow tests:
  - stores in `tests/workflows`
  - separate test file per workflow
  - tests workflows across multiple pages