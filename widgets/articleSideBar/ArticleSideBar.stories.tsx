import type { Meta, StoryObj } from '@storybook/react';
import { ArticleSideBar } from './ArticleSideBar';

const meta: Meta<typeof ArticleSideBar> = {
  title: 'article/ArticleSideBar',
  component: ArticleSideBar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ArticleSideBar>;

export const BasicArticleSideBar: Story = {
  args: {
    tagList: ['testTag', 'testTag', 'testTag', 'testTag'],
  },
};
