import React from 'react';
import { ItemsPageView } from './ItemsPage-view';
import { useManageNavigation } from '../../hooks';

export const ItemsPage: React.FC = () => {
  const { navigateBack } = useManageNavigation();
  
  // TODO: Add data loading logic here

  return <ItemsPageView onBack={navigateBack} />;
};
