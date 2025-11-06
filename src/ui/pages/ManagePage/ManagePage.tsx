import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IndexedDBDatabase } from '../../../persistence';
import { ManagePageView } from './ManagePage-view';

interface ResourceCounts {
  categories: number | null;
  units: number | null;
  items: number | null;
  recipes: number | null;
}

export const ManagePage: React.FC = () => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState<ResourceCounts>({
    categories: null,
    units: null,
    items: null,
    recipes: null,
  });

  useEffect(() => {
    const loadCounts = async (): Promise<void> => {
      try {
        const db = new IndexedDBDatabase();
        await db.initialize();

        const [categories, units, items, recipes] = await Promise.all([
          db.categories.count(),
          db.units.count(),
          db.items.count(),
          db.recipes.count(),
        ]);

        setCounts({
          categories,
          units,
          items,
          recipes,
        });
      } catch (error) {
        console.error('Failed to load resource counts:', error);
      }
    };

    loadCounts();
  }, []);

  return <ManagePageView counts={counts} onNavigate={navigate} />;
};
