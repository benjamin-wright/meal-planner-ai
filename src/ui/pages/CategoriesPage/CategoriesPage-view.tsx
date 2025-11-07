import React from 'react';
import { ArrowLeftIcon } from '../../components/icons/ArrowLeftIcon';

export interface CategoriesPageViewProps {
  onBack: () => void;
}

export const CategoriesPageView: React.FC<CategoriesPageViewProps> = ({ onBack }) => {
  return (
    <div className="page-container">
      <div className="page-header">
        <button
          className="back-button"
          onClick={onBack}
          aria-label="Back to Manage"
        >
          <ArrowLeftIcon />
        </button>
        <h1>Categories</h1>
      </div>
      <p>Category management coming soon...</p>
    </div>
  );
};
