import React from 'react';
import { PageHeader } from '../../components';

export interface RecipesPageViewProps {
  onBack: () => void;
}

export const RecipesPageView: React.FC<RecipesPageViewProps> = ({ onBack }) => {
  return (
    <div className="page-container">
      <PageHeader title="Recipes" onBack={onBack} />
      <p>Recipe management coming soon...</p>
    </div>
  );
};
