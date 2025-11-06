import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoriesPageView } from './CategoriesPage-view';

export const CategoriesPage: React.FC = () => {
  const navigate = useNavigate();
  
  // TODO: Add data loading logic here

  return <CategoriesPageView onBack={() => navigate('/manage')} />;
};
