import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { CategoryIcon, UnitIcon, ItemIcon, RecipeIcon, ChevronRightIcon } from '../components/Icons';
import './ManagePage.css';

/**
 * Presentation version of ManagePage for Storybook.
 * This component displays navigation cards without data fetching.
 */
interface NavigationCardProps {
  title: string;
  count: number | null;
  icon: React.ReactNode;
  onClick: () => void;
}

const NavigationCard: React.FC<NavigationCardProps> = ({ title, count, icon, onClick }) => (
  <button
    className="nav-card"
    onClick={onClick}
    aria-label={`Navigate to ${title}`}
    role="link"
  >
    <div className="nav-card-icon">{icon}</div>
    <div className="nav-card-content">
      <h2 className="nav-card-title">{title}</h2>
      <p className="nav-card-count">
        {count !== null ? `${count} ${title.toLowerCase()}` : 'Loading...'}
      </p>
    </div>
    <ChevronRightIcon className="nav-card-chevron" />
  </button>
);

interface ManagePagePresentationProps {
  counts: {
    categories: number | null;
    units: number | null;
    items: number | null;
    recipes: number | null;
  };
}

const ManagePagePresentation: React.FC<ManagePagePresentationProps> = ({ counts }) => {
  const handleNavigate = (path: string) => {
    console.log(`Navigate to: ${path}`);
  };

  return (
    <div className="page-container manage-page">
      <h1>Manage</h1>
      <div className="manage-hub">
        <NavigationCard
          title="Categories"
          count={counts.categories}
          icon={<CategoryIcon />}
          onClick={() => handleNavigate('/manage/categories')}
        />
        <NavigationCard
          title="Units"
          count={counts.units}
          icon={<UnitIcon />}
          onClick={() => handleNavigate('/manage/units')}
        />
        <NavigationCard
          title="Items"
          count={counts.items}
          icon={<ItemIcon />}
          onClick={() => handleNavigate('/manage/items')}
        />
        <NavigationCard
          title="Recipes"
          count={counts.recipes}
          icon={<RecipeIcon />}
          onClick={() => handleNavigate('/manage/recipes')}
        />
      </div>
    </div>
  );
};

/**
 * ManagePage Hub displays navigation cards to access Categories, Units, Items, and Recipes.
 * Each card shows the resource type name, count, and a chevron indicator.
 * 
 * The hub provides a mobile-friendly way to navigate to different resource management sections.
 */
const meta = {
  title: 'Pages/ManagePage',
  component: ManagePagePresentation,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ManagePagePresentation>;

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

/**
 * Dark mode view
 */
export const DarkMode: Story = {
  args: {
    counts: {
      categories: 8,
      units: 12,
      items: 45,
      recipes: 23,
    },
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1a1a1a', minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Mobile viewport (default target)
 */
export const Mobile: Story = {
  args: {
    counts: {
      categories: 8,
      units: 12,
      items: 45,
      recipes: 23,
    },
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

/**
 * Tablet viewport showing 2-column grid
 */
export const Tablet: Story = {
  args: {
    counts: {
      categories: 8,
      units: 12,
      items: 45,
      recipes: 23,
    },
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};
