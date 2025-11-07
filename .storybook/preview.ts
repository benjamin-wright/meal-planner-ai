import type { Preview } from '@storybook/react-vite';
import { themes } from 'storybook/theming';
import { MINIMAL_VIEWPORTS } from 'storybook/viewport';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    docs: {
      theme: themes.dark,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      options: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
          type: 'mobile',
        },
        ...MINIMAL_VIEWPORTS,
      },
    },
  },
  initialGlobals: {
    viewport: { value: 'mobile', isRotated: false },
  },
};

export default preview;