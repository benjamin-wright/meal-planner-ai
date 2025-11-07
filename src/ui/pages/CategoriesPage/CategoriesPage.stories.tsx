import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { CategoriesPageView } from './CategoriesPage-view';
import type { Category } from '../../../models';

const meta: Meta<typeof CategoriesPageView> = {
  title: 'Pages/CategoriesPage',
  component: CategoriesPageView,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof CategoriesPageView>;

const mockCategories: Category[] = [
  {
    id: '1',
    name: 'dairy & eggs',
    sortOrder: 0,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
  },
  {
    id: '2',
    name: 'produce',
    sortOrder: 1,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
  },
  {
    id: '3',
    name: 'bakery',
    sortOrder: 2,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
  },
  {
    id: '4',
    name: 'meat & seafood',
    sortOrder: 3,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
  },
  {
    id: '5',
    name: 'frozen foods',
    sortOrder: 4,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
  },
];

const mockItemCounts = new Map<string, number>([
  ['1', 12],
  ['2', 28],
  ['3', 8],
  ['4', 15],
  ['5', 22],
]);

export const EmptyState: Story = {
  args: {
    categories: [],
    itemCounts: new Map(),
    formMode: null,
    onBack: fn(),
    onAddClick: fn(),
    onEdit: fn(),
    onDelete: fn(),
    onReorder: fn(),
    onFormSave: fn(),
    onFormCancel: fn(),
    onDeleteConfirm: fn(),
    onDeleteCancel: fn(),
  },
};

export const WithCategories: Story = {
  args: {
    categories: mockCategories,
    itemCounts: mockItemCounts,
    formMode: null,
    onBack: fn(),
    onAddClick: fn(),
    onEdit: fn(),
    onDelete: fn(),
    onReorder: fn(),
    onFormSave: fn(),
    onFormCancel: fn(),
    onDeleteConfirm: fn(),
    onDeleteCancel: fn(),
  },
};

export const AddForm: Story = {
  args: {
    categories: mockCategories,
    itemCounts: mockItemCounts,
    formMode: 'add',
    onBack: fn(),
    onAddClick: fn(),
    onEdit: fn(),
    onDelete: fn(),
    onReorder: fn(),
    onFormSave: fn(),
    onFormCancel: fn(),
    onDeleteConfirm: fn(),
    onDeleteCancel: fn(),
  },
};

export const EditForm: Story = {
  args: {
    categories: mockCategories,
    itemCounts: mockItemCounts,
    formMode: 'edit',
    editingCategory: mockCategories[0],
    onBack: fn(),
    onAddClick: fn(),
    onEdit: fn(),
    onDelete: fn(),
    onReorder: fn(),
    onFormSave: fn(),
    onFormCancel: fn(),
    onDeleteConfirm: fn(),
    onDeleteCancel: fn(),
  },
};

export const FormWithError: Story = {
  args: {
    categories: mockCategories,
    itemCounts: mockItemCounts,
    formMode: 'add',
    formError: 'Category with name "dairy & eggs" already exists',
    onBack: fn(),
    onAddClick: fn(),
    onEdit: fn(),
    onDelete: fn(),
    onReorder: fn(),
    onFormSave: fn(),
    onFormCancel: fn(),
    onDeleteConfirm: fn(),
    onDeleteCancel: fn(),
  },
};

export const DeleteConfirmation: Story = {
  args: {
    categories: mockCategories,
    itemCounts: mockItemCounts,
    formMode: null,
    deletingCategory: mockCategories[2],
    onBack: fn(),
    onAddClick: fn(),
    onEdit: fn(),
    onDelete: fn(),
    onReorder: fn(),
    onFormSave: fn(),
    onFormCancel: fn(),
    onDeleteConfirm: fn(),
    onDeleteCancel: fn(),
  },
};

export const DeleteWithError: Story = {
  args: {
    categories: mockCategories,
    itemCounts: mockItemCounts,
    formMode: null,
    deletingCategory: mockCategories[1],
    deleteError: 'Cannot delete category "produce" because 28 item(s) reference it',
    onBack: fn(),
    onAddClick: fn(),
    onEdit: fn(),
    onDelete: fn(),
    onReorder: fn(),
    onFormSave: fn(),
    onFormCancel: fn(),
    onDeleteConfirm: fn(),
    onDeleteCancel: fn(),
  },
};
