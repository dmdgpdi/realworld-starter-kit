import type { Preview } from '@storybook/react';
import BootStrapProvider from './../app/bootStrapProvider';
import React from 'react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    Story => (
      <BootStrapProvider>
        <Story />
      </BootStrapProvider>
    ),
  ],
};

export default preview;
