import type { Meta, StoryObj } from '@storybook/react';
import { ArrowLeftIcon } from './ArrowLeftIcon';
import { CalendarIcon } from './CalendarIcon';
import { CategoryIcon } from './CategoryIcon';
import { ChevronRightIcon } from './ChevronRightIcon';
import { ItemIcon } from './ItemIcon';
import { RecipeIcon } from './RecipeIcon';
import { SettingsIcon } from './SettingsIcon';
import { ShoppingCartIcon } from './ShoppingCartIcon';
import { UnitIcon } from './UnitIcon';

/**
 * Icon components used throughout the application.
 * All icons are 24x24 SVG components that accept a className prop for styling.
 */
const meta = {
  title: 'Components/Icons',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Gallery showing all available icons in the application.
 * Each icon is displayed at its default size (24x24) with its name below.
 */
export const AllIcons: Story = {
  render: () => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
      gap: '2rem',
      padding: '2rem',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <ArrowLeftIcon />
        <span style={{ fontSize: '0.875rem', textAlign: 'center' }}>ArrowLeftIcon</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <CalendarIcon />
        <span style={{ fontSize: '0.875rem', textAlign: 'center' }}>CalendarIcon</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <CategoryIcon />
        <span style={{ fontSize: '0.875rem', textAlign: 'center' }}>CategoryIcon</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <ChevronRightIcon />
        <span style={{ fontSize: '0.875rem', textAlign: 'center' }}>ChevronRightIcon</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <ItemIcon />
        <span style={{ fontSize: '0.875rem', textAlign: 'center' }}>ItemIcon</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <RecipeIcon />
        <span style={{ fontSize: '0.875rem', textAlign: 'center' }}>RecipeIcon</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <SettingsIcon />
        <span style={{ fontSize: '0.875rem', textAlign: 'center' }}>SettingsIcon</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <ShoppingCartIcon />
        <span style={{ fontSize: '0.875rem', textAlign: 'center' }}>ShoppingCartIcon</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <UnitIcon />
        <span style={{ fontSize: '0.875rem', textAlign: 'center' }}>UnitIcon</span>
      </div>
    </div>
  ),
};

/**
 * Icons can be styled using the className prop.
 * This example shows how to apply custom CSS classes to icons.
 */
export const WithCustomClasses: Story = {
  render: () => (
    <div>
      <style>{`
        .icon-large {
          width: 48px;
          height: 48px;
        }
        .icon-colored {
          color: #ff6b6b;
        }
        .icon-dimmed {
          opacity: 0.5;
        }
      `}</style>
      <div style={{
        display: 'flex',
        gap: '2rem',
        padding: '2rem',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <CalendarIcon />
          <span style={{ fontSize: '0.75rem' }}>Default (24px)</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <CalendarIcon className="icon-large" />
          <span style={{ fontSize: '0.75rem' }}>Large (48px)</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <CalendarIcon className="icon-colored" />
          <span style={{ fontSize: '0.75rem' }}>Custom color</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <CalendarIcon className="icon-dimmed" />
          <span style={{ fontSize: '0.75rem' }}>With opacity</span>
        </div>
      </div>
    </div>
  ),
};
