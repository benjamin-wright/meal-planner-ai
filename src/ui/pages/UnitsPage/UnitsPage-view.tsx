import React from 'react';
import { PageHeader } from '../../components';

export interface UnitsPageViewProps {
  onBack: () => void;
}

export const UnitsPageView: React.FC<UnitsPageViewProps> = ({ onBack }) => {
  return (
    <div className="page-container">
      <PageHeader title="Units" onBack={onBack} />
      <p>Unit management coming soon...</p>
    </div>
  );
};
