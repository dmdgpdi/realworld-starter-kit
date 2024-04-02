import type { Meta, StoryObj } from '@storybook/react';
import { ArticleBanner } from './ArticleBanner';

const meta: Meta<typeof ArticleBanner> = {
  title: 'Article/ArticleBanner',
  component: ArticleBanner,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ArticleBanner>;

export const Banner: Story = {};
