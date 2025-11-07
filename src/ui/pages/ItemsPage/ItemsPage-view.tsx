import React from 'react';
import { PageHeader } from '../../components';

export interface ItemsPageViewProps {
  onBack: () => void;
}

export const ItemsPageView: React.FC<ItemsPageViewProps> = ({ onBack }) => {
  return (
    <div className="page-container">
      <PageHeader title="Items" onBack={onBack} />
      <p>Item management coming soon...</p>
    </div>
  );
};
