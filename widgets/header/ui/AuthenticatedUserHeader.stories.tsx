import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import AuthenticatedUserHeader from './AuthenticatedUserHeader';

const meta: Meta<typeof AuthenticatedUserHeader> = {
  title: 'Header/AuthenticatedUserHeader',
  component: AuthenticatedUserHeader,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AuthenticatedUserHeader>;

export const Header: Story = {
  args: {
    userName: 'smithbutler',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const settingLink = canvas.getByRole('link', { name: /setting/i });
    const user = userEvent.setup();

    await user.click(settingLink);

    expect(settingLink).toBeInTheDocument();
  },
};

export const LongNameHeader: Story = {
  args: {
    userName:
      'smithbutlersmithbutlersmithbutlersmithbutlersmithbutlersmithbutlersmithbutlersmithbutlersmithbutler',
  },
};
