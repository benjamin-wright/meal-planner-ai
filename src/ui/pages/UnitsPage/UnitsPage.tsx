import React from 'react';
import { UnitsPageView } from './UnitsPage-view';
import { useManageNavigation } from '../../hooks';

export const UnitsPage: React.FC = () => {
  const { navigateBack } = useManageNavigation();
  
  // TODO: Add data loading logic here

  return <UnitsPageView onBack={navigateBack} />;
};
