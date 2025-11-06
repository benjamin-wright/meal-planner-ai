import React from 'react';
import { ArrowLeftIcon } from '../../components/ArrowLeftIcon';

export interface RecipesPageViewProps {
  onBack: () => void;
}

export const RecipesPageView: React.FC<RecipesPageViewProps> = ({ onBack }) => {
  return (
    <div className="page-container">
      <div className="page-header">
        <button
          className="back-button"
          onClick={onBack}
          aria-label="Back to Manage"
        >
          <ArrowLeftIcon />
        </button>
        <h1>Recipes</h1>
      </div>
      <p>Recipe management coming soon...</p>
    </div>
  );
};
