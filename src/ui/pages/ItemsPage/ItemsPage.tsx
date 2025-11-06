import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ItemsPageView } from './ItemsPage-view';

export const ItemsPage: React.FC = () => {
  const navigate = useNavigate();
  
  // TODO: Add data loading logic here

  return <ItemsPageView onBack={() => navigate('/manage')} />;
};
