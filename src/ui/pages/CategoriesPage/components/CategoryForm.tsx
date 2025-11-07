import React, { useState, useEffect } from 'react';
import type { Category } from '../../../../models';
import { ErrorAlert } from './ErrorAlert';
import { FormField } from './FormField';
import './CategoryForm.css';

export interface CategoryFormProps {
  category?: Category;
  onSave: (name: string, sortOrder: number | undefined) => void;
  onCancel: () => void;
  error?: string;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  category,
  onSave,
  onCancel,
  error,
}) => {
  const [name, setName] = useState(category?.name || '');
  const [sortOrder, setSortOrder] = useState<string>(
    category?.sortOrder !== undefined ? String(category.sortOrder) : ''
  );
  const [validationError, setValidationError] = useState('');

  // Reset form when category changes
  useEffect(() => {
    setName(category?.name || '');
    setSortOrder(category?.sortOrder !== undefined ? String(category.sortOrder) : '');
    setValidationError('');
  }, [category]);

  // Clear validation error when error prop changes
  useEffect(() => {
    setValidationError('');
  }, [error]);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    
    // Validate name
    const trimmedName = name.trim();
    if (!trimmedName) {
      setValidationError('Category name cannot be empty');
      return;
    }

    // Parse sortOrder
    const parsedSortOrder = sortOrder.trim() === '' 
      ? undefined 
      : Number(sortOrder);

    // Validate sortOrder
    if (parsedSortOrder !== undefined && (isNaN(parsedSortOrder) || parsedSortOrder < 0)) {
      setValidationError('Sort order must be a non-negative number');
      return;
    }

    setValidationError('');
    onSave(trimmedName, parsedSortOrder);
  };

  const displayError = error || validationError;

  return (
    <div className="category-form-overlay">
      <div className="category-form-container">
        <form className="category-form" onSubmit={handleSubmit}>
          <h2 className="form-title">
            {category ? 'Edit Category' : 'Add Category'}
          </h2>

          {displayError && <ErrorAlert message={displayError} />}

          <FormField
            label="Name"
            required
            hint="Enter a unique category name (will be stored as lowercase)"
          >
            <input
              id="category-name"
              type="text"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., dairy, produce, bakery"
              autoFocus
              required
            />
          </FormField>

          <FormField
            label="Sort Order"
            hint="Lower numbers appear first in shopping lists"
          >
            <input
              id="category-sort-order"
              type="number"
              className="form-input"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              placeholder="Optional (e.g., 1, 2, 3)"
              min="0"
              step="1"
            />
          </FormField>

          <div className="form-actions">
            <button
              type="button"
              className="form-button cancel-button"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="form-button submit-button"
            >
              {category ? 'Save Changes' : 'Add Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
