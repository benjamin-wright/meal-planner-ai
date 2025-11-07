import React from 'react';
import { ArrowLeftIcon } from '../../components/icons/ArrowLeftIcon';

export interface ItemsPageViewProps {
  onBack: () => void;
}

export const ItemsPageView: React.FC<ItemsPageViewProps> = ({ onBack }) => {
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
        <h1>Items</h1>
      </div>
      <p>Item management coming soon...</p>
    </div>
  );
};
