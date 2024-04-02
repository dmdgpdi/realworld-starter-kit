import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';
import { ArticleConstant } from '@/entities/article';

const meta: Meta<typeof Pagination> = {
  title: 'widgets/Pagination',
  component: Pagination,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const FirstPage: Story = {
  args: {
    href: '/',
    articlesCount: 3,
    currentPage: 1,
  },
};

export const NoNextPage: Story = {
  args: {
    href: '/',
    articlesCount: ArticleConstant.ARTICLES_PER_PAGE - 1,
    currentPage: 3,
  },
};
