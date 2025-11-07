import React from 'react';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';

export interface PageHeaderProps {
  title: string;
  onBack: () => void;
  backLabel?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  onBack, 
  backLabel = "Back to Manage" 
}) => {
  return (
    <div className="page-header">
      <button
        className="back-button"
        onClick={onBack}
        aria-label={backLabel}
      >
        <ArrowLeftIcon />
      </button>
      <h1>{title}</h1>
    </div>
  );
};
