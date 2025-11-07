import React from 'react';
import { CategoriesPageView } from './CategoriesPage-view';
import { useManageNavigation } from '../../hooks';

export const CategoriesPage: React.FC = () => {
  const { navigateBack } = useManageNavigation();
  
  // TODO: Add data loading logic here

  return <CategoriesPageView onBack={navigateBack} />;
};
