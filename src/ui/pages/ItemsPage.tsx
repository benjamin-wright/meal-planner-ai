import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '../components/Icons';

export const ItemsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="page-header">
        <button
          className="back-button"
          onClick={() => navigate('/manage')}
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
