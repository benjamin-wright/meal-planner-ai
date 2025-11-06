import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RecipesPageView } from './RecipesPage-view';

export const RecipesPage: React.FC = () => {
  const navigate = useNavigate();
  
  // TODO: Add data loading logic here

  return <RecipesPageView onBack={() => navigate('/manage')} />;
};
