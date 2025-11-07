/**
 * Database Provider Component
 * 
 * Provides database access to the entire component tree via React Context.
 * Handles initialization, loading states, error handling, and cleanup.
 */

import React, { useState, useEffect, type ReactNode } from 'react';
import { DatabaseContext, type DatabaseContextState } from './DatabaseContext';
import { IndexedDBDatabase } from '../../../persistence';
import type { IDatabase } from '../../../persistence/interfaces';

interface DatabaseProviderProps {
  /**
   * Child components that will have access to the database context.
   */
  children: ReactNode;

  /**
   * Optional database instance for testing purposes.
   * If not provided, IndexedDBDatabase will be instantiated.
   */
  database?: IDatabase;
}

/**
 * Provider component that initializes and manages the database connection.
 * 
 * Automatically initializes the database when mounted and cleans up when unmounted.
 * Provides loading and error states during initialization.
 * 
 * @example
 * ```tsx
 * <DatabaseProvider>
 *   <App />
 * </DatabaseProvider>
 * ```
 */
export const DatabaseProvider: React.FC<DatabaseProviderProps> = ({ children, database: injectedDatabase }) => {
  const [contextState, setContextState] = useState<DatabaseContextState>({
    database: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let mounted = true;
    const db = injectedDatabase ?? new IndexedDBDatabase();

    const initializeDb = async (): Promise<void> => {
      try {
        await db.initialize();
        
        if (mounted) {
          setContextState({
            database: db,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        console.error('Failed to initialize database:', error);
        
        if (mounted) {
          setContextState({
            database: null,
            isLoading: false,
            error: error instanceof Error ? error : new Error('Failed to initialize database'),
          });
        }
      }
    };

    initializeDb();

    // Cleanup function
    return () => {
      mounted = false;
      
      // Only close if we created the database instance
      if (!injectedDatabase) {
        db.close().catch((error) => {
          console.error('Failed to close database:', error);
        });
      }
    };
  }, [injectedDatabase]);

  return (
    <DatabaseContext.Provider value={contextState}>
      {children}
    </DatabaseContext.Provider>
  );
};
