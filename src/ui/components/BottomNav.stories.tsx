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
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BottomNav>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default state of the bottom navigation
 */
export const Default: Story = {};

/**
 * Navigation in dark mode
 */
export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1a1a1a', minHeight: '100vh', paddingTop: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Mobile viewport (default target)
 */
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

/**
 * Tablet viewport
 */
export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};
