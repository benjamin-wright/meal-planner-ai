import React from 'react';
import { ArrowLeftIcon } from '../../components/icons/ArrowLeftIcon';

export interface UnitsPageViewProps {
  onBack: () => void;
}

export const UnitsPageView: React.FC<UnitsPageViewProps> = ({ onBack }) => {
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
        <h1>Units</h1>
      </div>
      <p>Unit management coming soon...</p>
    </div>
  );
};
