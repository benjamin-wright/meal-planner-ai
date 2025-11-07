/**
 * Database Context for providing database access throughout the component tree.
 * 
 * Enables centralized database management and improved testability by using
 * React Context instead of direct instantiation in components.
 */

import { createContext } from 'react';
import type { IDatabase } from '../../../persistence/interfaces';

/**
 * Database context state interface.
 * 
 * Provides database instance along with loading and error states during initialization.
 */
export interface DatabaseContextState {
  /**
   * The database instance. Null when loading or on error.
   */
  database: IDatabase | null;

  /**
   * Whether the database is currently initializing.
   */
  isLoading: boolean;

  /**
   * Error that occurred during database initialization, if any.
   */
  error: Error | null;
}

/**
 * React Context for database access.
 * 
 * Default value is undefined to enable detection of missing provider.
 */
export const DatabaseContext = createContext<DatabaseContextState | undefined>(undefined);

DatabaseContext.displayName = 'DatabaseContext';
