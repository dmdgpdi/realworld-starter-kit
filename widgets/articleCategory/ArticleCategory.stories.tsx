import type { Meta, StoryObj } from '@storybook/react';
import { ArticleCategory } from './ArticleCategory';
import Link from 'next/link';

const meta: Meta<typeof ArticleCategory> = {
  title: 'article/ArticleCategory',
  component: ArticleCategory,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ArticleCategory>;

function LoginWithArticleCategory() {
  return (
    <div className="feed-toggle">
      <nav className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link className="nav-link active" href="">
            Your Feed
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="/">
            Global Feed
          </Link>
        </li>
      </nav>
    </div>
  );
}

export const BasicCategory: Story = {};
export const LoginUserCategory: Story = {
  render: () => <LoginWithArticleCategory />,
};
export const TagCategory: Story = {
  parameters: {
    nextjs: {
      navigation: {
        segments: [['tag', 'testTag']],
      },
    },
  },
};
