import React from 'react';

export interface RecipeDetailPageViewProps {
  recipeId?: string;
}

export const RecipeDetailPageView: React.FC<RecipeDetailPageViewProps> = ({ recipeId }) => {
  return (
    <div className="page-container">
      <h1>Recipe Detail</h1>
      <p>Viewing recipe {recipeId}</p>
      <p>Recipe detail view coming soon...</p>
    </div>
  );
};
