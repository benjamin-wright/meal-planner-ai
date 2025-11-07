import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { fn } from 'storybook/test';
import { ManagePageView } from './ManagePage-view';

/**
 * ManagePage Hub displays navigation cards to access Categories, Units, Items, and Recipes.
 * Each card shows the resource type name, count, and a chevron indicator.
 * 
 * The hub provides a mobile-friendly way to navigate to different resource management sections.
 */
const meta = {
  title: 'Pages/ManagePage',
  component: ManagePageView,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  args: {
    onNavigate: fn(),
  },
} satisfies Meta<typeof ManagePageView>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default state with typical resource counts
 */
export const Default: Story = {
  args: {
    counts: {
      categories: 8,
      units: 12,
      items: 45,
      recipes: 23,
    },
  },
};

/**
 * Empty state when no resources exist
 */
export const Empty: Story = {
  args: {
    counts: {
      categories: 0,
      units: 0,
      items: 0,
      recipes: 0,
    },
  },
};

/**
 * Loading state while fetching counts
 */
export const Loading: Story = {
  args: {
    counts: {
      categories: null,
      units: null,
      items: null,
      recipes: null,
    },
  },
};

/**
 * Populated state with many resources
 */
export const Populated: Story = {
  args: {
    counts: {
      categories: 15,
      units: 25,
      items: 150,
      recipes: 87,
    },
  },
};
