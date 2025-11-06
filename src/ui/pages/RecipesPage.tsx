import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '../components/Icons';

export const RecipesPage: React.FC = () => {
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
        <h1>Recipes</h1>
      </div>
      <p>Recipe management coming soon...</p>
    </div>
  );
};
