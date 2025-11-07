import React from 'react';
import { Reorder } from 'framer-motion';
import type { Category } from '../../../../models';
import { CategoryListItem } from './CategoryListItem';
import './CategoryList.css';

export interface CategoryListProps {
  categories: Category[];
  onReorder: (categories: Category[]) => void;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  itemCounts: Map<string, number>;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  onReorder,
  onEdit,
  onDelete,
  itemCounts,
}) => {
  if (categories.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-state-text">No categories yet.</p>
        <p className="empty-state-hint">Tap "Add Category" to get started.</p>
      </div>
    );
  }

  return (
    <Reorder.Group
      axis="y"
      values={categories}
      onReorder={onReorder}
      className="category-list"
    >
      {categories.map((category) => {
        const itemCount = itemCounts.get(category.id) || 0;
        
        return (
          <CategoryListItem
            key={category.id}
            category={category}
            itemCount={itemCount}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
      })}
    </Reorder.Group>
  );
};
