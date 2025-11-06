import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UnitsPageView } from './UnitsPage-view';

export const UnitsPage: React.FC = () => {
  const navigate = useNavigate();
  
  // TODO: Add data loading logic here

  return <UnitsPageView onBack={() => navigate('/manage')} />;
};
