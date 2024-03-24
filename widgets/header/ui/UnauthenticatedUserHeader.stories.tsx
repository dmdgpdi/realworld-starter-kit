import type { Meta, StoryObj } from '@storybook/react';

import UnauthenticatedUserHeader from './UnauthenticatedUserHeader';

const meta: Meta<typeof UnauthenticatedUserHeader> = {
  title: 'Header/UnauthenticatedUserHeader',
  component: UnauthenticatedUserHeader,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof UnauthenticatedUserHeader>;

export const Header: Story = {};
