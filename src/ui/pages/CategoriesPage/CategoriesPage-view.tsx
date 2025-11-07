import React from 'react';
import { PageHeader } from '../../components';
import { PlusIcon } from '../../components/icons';
import { CategoryList, CategoryForm, DeleteConfirmation } from './components';
import type { Category } from '../../../models';
import './CategoriesPage.css';

export type FormMode = 'add' | 'edit' | null;

export interface CategoriesPageViewProps {
  categories: Category[];
  itemCounts: Map<string, number>;
  formMode: FormMode;
  editingCategory?: Category;
  deletingCategory?: Category;
  formError?: string;
  deleteError?: string;
  onBack: () => void;
  onAddClick: () => void;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  onReorder: (categories: Category[]) => void;
  onFormSave: (name: string, sortOrder: number | undefined) => void;
  onFormCancel: () => void;
  onDeleteConfirm: () => void;
  onDeleteCancel: () => void;
}

export const CategoriesPageView: React.FC<CategoriesPageViewProps> = ({
  categories,
  itemCounts,
  formMode,
  editingCategory,
  deletingCategory,
  formError,
  deleteError,
  onBack,
  onAddClick,
  onEdit,
  onDelete,
  onReorder,
  onFormSave,
  onFormCancel,
  onDeleteConfirm,
  onDeleteCancel,
}) => {
  return (
    <div className="page-container categories-page">
      <PageHeader title="Categories" onBack={onBack} />
      
      <div className="categories-content">
        <button
          className="add-category-button"
          onClick={onAddClick}
          aria-label="Add new category"
        >
          <PlusIcon />
          Add Category
        </button>

        <CategoryList
          categories={categories}
          itemCounts={itemCounts}
          onReorder={onReorder}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>

      {formMode && (
        <CategoryForm
          category={editingCategory}
          onSave={onFormSave}
          onCancel={onFormCancel}
          error={formError}
        />
      )}

      {deletingCategory && (
        <DeleteConfirmation
          category={deletingCategory}
          onConfirm={onDeleteConfirm}
          onCancel={onDeleteCancel}
          error={deleteError}
        />
      )}
    </div>
  );
};
