import React from 'react';
import { CategoryIcon } from '../../components/icons/CategoryIcon';
import { UnitIcon } from '../../components/icons/UnitIcon';
import { ItemIcon } from '../../components/icons/ItemIcon';
import { RecipeIcon } from '../../components/icons/RecipeIcon';
import { NavigationCard } from './components/NavigationCard';
import './ManagePage.css';

export interface ManagePageViewProps {
  counts: {
    categories: number | null;
    units: number | null;
    items: number | null;
    recipes: number | null;
  };
  onNavigate: (path: string) => void;
}

export const ManagePageView: React.FC<ManagePageViewProps> = ({ counts, onNavigate }) => {
  return (
    <div className="page-container manage-page">
      <h1>Manage</h1>
      <div className="manage-hub">
        <NavigationCard
          title="Categories"
          count={counts.categories}
          icon={<CategoryIcon />}
          onClick={() => onNavigate('/manage/categories')}
        />
        <NavigationCard
          title="Units"
          count={counts.units}
          icon={<UnitIcon />}
          onClick={() => onNavigate('/manage/units')}
        />
        <NavigationCard
          title="Items"
          count={counts.items}
          icon={<ItemIcon />}
          onClick={() => onNavigate('/manage/items')}
        />
        <NavigationCard
          title="Recipes"
          count={counts.recipes}
          icon={<RecipeIcon />}
          onClick={() => onNavigate('/manage/recipes')}
        />
      </div>
    </div>
  );
};
