import React, { useState, useEffect, useCallback } from 'react';
import { CategoriesPageView, type FormMode } from './CategoriesPage-view';
import { useManageNavigation } from '../../hooks';
import { IndexedDBDatabase } from '../../../persistence';
import type { Category } from '../../../models';

export const CategoriesPage: React.FC = () => {
  const { navigateBack } = useManageNavigation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [itemCounts, setItemCounts] = useState<Map<string, number>>(new Map());
  const [formMode, setFormMode] = useState<FormMode>(null);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>();
  const [deletingCategory, setDeletingCategory] = useState<Category | undefined>();
  const [formError, setFormError] = useState<string | undefined>();
  const [deleteError, setDeleteError] = useState<string | undefined>();
  const [db] = useState(() => new IndexedDBDatabase());

  // Load categories and item counts
  const loadData = useCallback(async (): Promise<void> => {
    try {
      await db.initialize();
      const loadedCategories = await db.categories.getAll(true); // sorted
      setCategories(loadedCategories);

      // Load item counts for each category
      const counts = new Map<string, number>();
      for (const category of loadedCategories) {
        const items = await db.items.getAll();
        const count = items.filter(item => item.categoryId === category.id).length;
        counts.set(category.id, count);
      }
      setItemCounts(counts);
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  }, [db]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleAddClick = (): void => {
    setFormMode('add');
    setEditingCategory(undefined);
    setFormError(undefined);
  };

  const handleEdit = (category: Category): void => {
    setFormMode('edit');
    setEditingCategory(category);
    setFormError(undefined);
  };

  const handleDelete = (category: Category): void => {
    setDeletingCategory(category);
    setDeleteError(undefined);
  };

  const handleReorder = async (reorderedCategories: Category[]): Promise<void> => {
    try {
      // Update sortOrder based on new position
      const updatedCategories = reorderedCategories.map((cat, index) => ({
        ...cat,
        sortOrder: index,
        updatedAt: new Date(),
      }));

      // Update all categories in the database
      for (const category of updatedCategories) {
        await db.categories.update(category);
      }

      // Update local state
      setCategories(updatedCategories);
    } catch (error) {
      console.error('Failed to reorder categories:', error);
    }
  };

  const handleFormSave = async (name: string, sortOrder: number | undefined): Promise<void> => {
    try {
      setFormError(undefined);

      if (formMode === 'add') {
        // Create new category
        const newCategory: Category = {
          id: crypto.randomUUID(),
          name,
          sortOrder,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        await db.categories.create(newCategory);
      } else if (formMode === 'edit' && editingCategory) {
        // Update existing category
        const updatedCategory: Category = {
          ...editingCategory,
          name,
          sortOrder,
          updatedAt: new Date(),
        };

        await db.categories.update(updatedCategory);
      }

      // Reload data and close form
      await loadData();
      setFormMode(null);
      setEditingCategory(undefined);
    } catch (error) {
      console.error('Failed to save category:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to save category';
      setFormError(errorMessage);
    }
  };

  const handleFormCancel = (): void => {
    setFormMode(null);
    setEditingCategory(undefined);
    setFormError(undefined);
  };

  const handleDeleteConfirm = async (): Promise<void> => {
    if (!deletingCategory) {
      return;
    }

    try {
      setDeleteError(undefined);
      await db.categories.delete(deletingCategory.id);
      
      // Reload data and close dialog
      await loadData();
      setDeletingCategory(undefined);
    } catch (error) {
      console.error('Failed to delete category:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete category';
      setDeleteError(errorMessage);
    }
  };

  const handleDeleteCancel = (): void => {
    setDeletingCategory(undefined);
    setDeleteError(undefined);
  };

  return (
    <CategoriesPageView
      categories={categories}
      itemCounts={itemCounts}
      formMode={formMode}
      editingCategory={editingCategory}
      deletingCategory={deletingCategory}
      formError={formError}
      deleteError={deleteError}
      onBack={navigateBack}
      onAddClick={handleAddClick}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onReorder={handleReorder}
      onFormSave={handleFormSave}
      onFormCancel={handleFormCancel}
      onDeleteConfirm={handleDeleteConfirm}
      onDeleteCancel={handleDeleteCancel}
    />
  );
};
