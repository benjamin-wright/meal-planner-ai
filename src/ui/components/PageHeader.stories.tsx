import type { Meta, StoryObj } from '@storybook/react';
import { PageHeader } from './PageHeader';
import { fn } from 'storybook/test';

/**
 * PageHeader component provides a consistent header with back button for manage sub-pages.
 * It displays a back arrow button and a page title.
 */
const meta = {
  title: 'Components/PageHeader',
  component: PageHeader,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    onBack: fn(),
  },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default state with a standard title
 */
export const Default: Story = {
  args: {
    title: 'Categories',
  },
};

/**
 * Custom back label for accessibility
 */
export const CustomBackLabel: Story = {
  args: {
    title: 'Items',
    backLabel: 'Return to Settings',
  },
};

/**
 * Short title
 */
export const ShortTitle: Story = {
  args: {
    title: 'Units',
  },
};

/**
 * Long title to test wrapping behavior
 */
export const LongTitle: Story = {
  args: {
    title: 'Recipe Ingredients and Instructions',
  },
};
