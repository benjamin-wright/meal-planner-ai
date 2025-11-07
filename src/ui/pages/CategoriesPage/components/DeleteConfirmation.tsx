import React from 'react';
import { AlertIcon } from '../../../components/icons';
import type { Category } from '../../../../models';
import './DeleteConfirmation.css';

export interface DeleteConfirmationProps {
  category: Category;
  onConfirm: () => void;
  onCancel: () => void;
  error?: string;
}

export const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  category,
  onConfirm,
  onCancel,
  error,
}) => {
  return (
    <div className="delete-confirmation-overlay">
      <div className="delete-confirmation-container">
        <div className="delete-confirmation-content">
          <div className="delete-icon">
            <AlertIcon />
          </div>

          <h2 className="delete-title">Delete Category?</h2>
          
          <p className="delete-message">
            Are you sure you want to delete <strong className="category-name-display">{category.name}</strong>?
          </p>

          {error && (
            <div className="delete-error" role="alert">
              {error}
            </div>
          )}

          <div className="delete-actions">
            <button
              type="button"
              className="delete-button cancel-delete-button"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="delete-button confirm-delete-button"
              onClick={onConfirm}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
