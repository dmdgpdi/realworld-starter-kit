import type { Meta, StoryObj } from '@storybook/react';
import { ArticleList } from './ArticleList';

const meta: Meta<typeof ArticleList> = {
  title: 'article/ArticleList',
  component: ArticleList,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ArticleList>;

const ArticleItemValue = {
  slug: 'test',
  title: 'test title',
  description: 'test description',
  body: 'string',
  tagList: ['testTag1', 'testTag2', 'testTag3'],
  createdAt: new Date().toString(),
  updatedAt: new Date().toString(),
  favorited: true,
  favoritesCount: 999,
  author: {
    username: 'test username',
    bio: 'bio',
    image: '',
    following: true,
  },
};

export const BasicArticleList: Story = {
  args: {
    articleList: [ArticleItemValue, ArticleItemValue, ArticleItemValue],
  },
};
