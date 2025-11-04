[back](../standards.md)

## Architectural

- Clean separation of concerns between:
  - Data model: pure typescript object model in `src/models`
  - Business logic: pure functions operating on data models in `src/services`
  - User interface: visualisation concerns defined in `src/ui`
