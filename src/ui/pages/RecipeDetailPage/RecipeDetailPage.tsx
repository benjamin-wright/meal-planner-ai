import React from 'react';
import { useParams } from 'react-router-dom';
import { RecipeDetailPageView } from './RecipeDetailPage-view';

export const RecipeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // TODO: Add data loading logic here

  return <RecipeDetailPageView recipeId={id} />;
};
