type AuthorType = {
  username: string;
  bio: string;
  image: string;
  following: boolean;
};

type ArticleType = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: AuthorType;
};

type ArticleListType = {
  articles: ArticleType[];
  articlesCount: number;
};

type Query = {
  tag?: string;
  author?: string;
  favorited?: string;
  offset?: number;
  limit?: number;
};

type FeedParameter = Pick<Query, 'offset' | 'limit'>;

export type { AuthorType, ArticleType, ArticleListType, Query, FeedParameter };
