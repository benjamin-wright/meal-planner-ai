/**
 * Database Provider exports
 * 
 * Provides database access throughout the component tree via React Context.
 */

export { DatabaseProvider } from './DatabaseProvider';
export { useDatabase } from './useDatabase';
export type { DatabaseContextState } from './DatabaseContext';
export { createMockDatabase, type MockDatabaseConfig } from './MockDatabase';
