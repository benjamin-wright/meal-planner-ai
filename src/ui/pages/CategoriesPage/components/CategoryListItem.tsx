import React from 'react';
import { Reorder } from 'framer-motion';
import { DragHandleIcon, EditIcon, DeleteIcon } from '../../../components/icons';
import type { Category } from '../../../../models';

export interface CategoryListItemProps {
  category: Category;
  itemCount: number;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export const CategoryListItem: React.FC<CategoryListItemProps> = ({
  category,
  itemCount,
  onEdit,
  onDelete,
}) => {
  return (
    <Reorder.Item
      key={category.id}
      value={category}
      className="category-item"
    >
      <div className="category-drag-handle" aria-label="Drag to reorder">
        <DragHandleIcon />
      </div>
      
      <div className="category-info">
        <h3 className="category-name">{category.name}</h3>
        <p className="category-count">
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </p>
      </div>
      
      <div className="category-actions">
        <button
          className="action-button edit-button"
          onClick={() => onEdit(category)}
          aria-label={`Edit ${category.name}`}
        >
          <EditIcon />
        </button>
        
        <button
          className="action-button delete-button"
          onClick={() => onDelete(category)}
          aria-label={`Delete ${category.name}`}
        >
          <DeleteIcon />
        </button>
      </div>
    </Reorder.Item>
  );
};
