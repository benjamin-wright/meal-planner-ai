import React from 'react';
import { ChevronRightIcon } from '../../../components/icons/ChevronRightIcon';

export interface NavigationCardProps {
  title: string;
  count: number | null;
  icon: React.ReactNode;
  onClick: () => void;
}

export const NavigationCard: React.FC<NavigationCardProps> = ({ title, count, icon, onClick }) => (
  <button
    className="nav-card"
    onClick={onClick}
    aria-label={`Navigate to ${title}`}
    role="link"
  >
    <div className="nav-card-icon">{icon}</div>
    <div className="nav-card-content">
      <h2 className="nav-card-title">{title}</h2>
      <p className="nav-card-count">
        {count !== null ? `${count} ${title.toLowerCase()}` : 'Loading...'}
      </p>
    </div>
    <ChevronRightIcon className="nav-card-chevron" />
  </button>
);
