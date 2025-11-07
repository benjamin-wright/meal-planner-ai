import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { BottomNav } from './BottomNav';

/**
 * BottomNav component provides the main navigation for the mobile-first PWA.
 * It displays three primary sections: Plan, Shop, and Manage.
 * 
 * Note: Storybook needs to be installed to view these stories.
 * Run: npx storybook@latest init
 */
const meta = {
  title: 'Components/BottomNav',
  component: BottomNav,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div style={{ marginTop: '400px' }}>
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof BottomNav>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default state of the bottom navigation
 */
export const Default: Story = {};
