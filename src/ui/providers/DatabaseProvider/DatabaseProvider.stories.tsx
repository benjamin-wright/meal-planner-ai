import type { Meta, StoryObj } from '@storybook/react';
import { DatabaseProvider, useDatabase, createMockDatabase } from './index';

const StateDisplay: React.FC = () => {
  const { database, isLoading, error } = useDatabase();

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      {isLoading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error.message}</div>}
      {database && <div>Database ready ✓</div>}
    </div>
  );
};

const meta = {
  title: 'Providers/DatabaseProvider',
  component: DatabaseProvider,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof DatabaseProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {
  args: {
    database: createMockDatabase({ initDelay: 500 }),
    children: <StateDisplay />,
  },
};

export const Ready: Story = {
  args: {
    database: createMockDatabase(),
    children: <StateDisplay />,
  },
};

export const Error: Story = {
  args: {
    database: createMockDatabase({ 
      initDelay: 300,
      shouldFail: true,
      errorMessage: 'Database initialization failed',
    }),
    children: <StateDisplay />,
  },
};
