import React from 'react';
import { PageHeader } from '../../components';

export interface CategoriesPageViewProps {
  onBack: () => void;
}

export const CategoriesPageView: React.FC<CategoriesPageViewProps> = ({ onBack }) => {
  return (
    <div className="page-container">
      <PageHeader title="Categories" onBack={onBack} />
      <p>Category management coming soon...</p>
    </div>
  );
};
