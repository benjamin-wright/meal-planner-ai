import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryIcon, UnitIcon, ItemIcon, RecipeIcon, ChevronRightIcon } from '../components/Icons';
import { IndexedDBDatabase } from '../../persistence';
import './ManagePage.css';

interface ResourceCounts {
  categories: number;
  units: number;
  items: number;
  recipes: number;
}

interface NavigationCardProps {
  title: string;
  count: number | null;
  icon: React.ReactNode;
  onClick: () => void;
}

const NavigationCard: React.FC<NavigationCardProps> = ({ title, count, icon, onClick }) => (
  <button
    className="nav-card"
    onClick={onClick}
    aria-label={`Navigate to ${title}`}
    role="link"
  >
    <div className="nav-card-icon">{icon}</div>
    <div className="nav-card-content">
      <h2 className="nav-card-title">{title}</h2>
      <p className="nav-card-count">
        {count !== null ? `${count} ${title.toLowerCase()}` : 'Loading...'}
      </p>
    </div>
    <ChevronRightIcon className="nav-card-chevron" />
  </button>
);

export const ManagePage: React.FC = () => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState<ResourceCounts>({
    categories: 0,
    units: 0,
    items: 0,
    recipes: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCounts = async () => {
      try {
        const db = new IndexedDBDatabase();
        await db.initialize();

        const [categories, units, items, recipes] = await Promise.all([
          db.categories.getAll(),
          db.units.getAll(),
          db.items.getAll(),
          db.recipes.getAll(),
        ]);

        setCounts({
          categories: categories.length,
          units: units.length,
          items: items.length,
          recipes: recipes.length,
        });
        setLoading(false);
      } catch (error) {
        console.error('Failed to load resource counts:', error);
        setLoading(false);
      }
    };

    loadCounts();
  }, []);

  return (
    <div className="page-container manage-page">
      <h1>Manage</h1>
      <div className="manage-hub">
        <NavigationCard
          title="Categories"
          count={loading ? null : counts.categories}
          icon={<CategoryIcon />}
          onClick={() => navigate('/manage/categories')}
        />
        <NavigationCard
          title="Units"
          count={loading ? null : counts.units}
          icon={<UnitIcon />}
          onClick={() => navigate('/manage/units')}
        />
        <NavigationCard
          title="Items"
          count={loading ? null : counts.items}
          icon={<ItemIcon />}
          onClick={() => navigate('/manage/items')}
        />
        <NavigationCard
          title="Recipes"
          count={loading ? null : counts.recipes}
          icon={<RecipeIcon />}
          onClick={() => navigate('/manage/recipes')}
        />
      </div>
    </div>
  );
};
