[back](../standards.md)

## Back End

- All backend code should be implemented in typescript
- In this context, by "back end" we mean the data models, persistence and business logic separate from visualisation and react-centric code.
- data models should be persistence-agnostic and live in the `src/models` directory.
- business logic should be organised in pure functions in the `src/services` directory.
- persistence logic should live in the `src/persistence` directory.
- individual interfaces, classes and other objects should be 

### Persistence

- all persistence functions should be accessed through an interface, for easier portability if we decide to swap out the backing data store
- all persistence functions should be asynchronous, incase we want to introduce remote storage in the future
- IndexedDB should be the default concrete implementation