import React from 'react';
import { RecipesPageView } from './RecipesPage-view';
import { useManageNavigation } from '../../hooks';

export const RecipesPage: React.FC = () => {
  const { navigateBack } = useManageNavigation();
  
  // TODO: Add data loading logic here

  return <RecipesPageView onBack={navigateBack} />;
};
