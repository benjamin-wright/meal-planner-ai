/**
 * Custom hook for accessing the database from React components.
 * 
 * Provides type-safe access to the DatabaseContext and ensures the hook
 * is used within a DatabaseProvider.
 */

import { useContext } from 'react';
import { DatabaseContext, type DatabaseContextState } from './DatabaseContext';

/**
 * Hook to access the database context.
 * 
 * Must be used within a DatabaseProvider. Throws an error if used outside the provider.
 * 
 * @returns The database context containing database instance, loading state, and error
 * @throws Error if used outside of DatabaseProvider
 * 
 * @example
 * ```tsx
 * const { database, isLoading, error } = useDatabase();
 * 
 * if (isLoading) {
 *   return <div>Loading database...</div>;
 * }
 * 
 * if (error) {
 *   return <div>Error: {error.message}</div>;
 * }
 * 
 * if (!database) {
 *   return null;
 * }
 * 
 * // Use database
 * const categories = await database.categories.getAll();
 * ```
 */
export function useDatabase(): DatabaseContextState {
  const context = useContext(DatabaseContext);

  if (context === undefined) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }

  return context;
}
