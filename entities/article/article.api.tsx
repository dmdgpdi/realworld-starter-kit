'use server';

import { revalidatePath } from 'next/cache';
import { BASE_URL, API, checkError } from '@/shared/api';
import { objectLength } from '@/shared/lib';
import {
  ArticleListResponse,
  ArticleRequest,
  ArticleResponse,
  FeedParameter,
  Query,
  UpdateArticleRequest,
} from './article.type';
import { appendQueryString } from './article.lib';
import { ARTICLES_PER_PAGE } from './article.constant';

const getArticleList = async (
  query: Query = { limit: ARTICLES_PER_PAGE },
): Promise<ArticleListResponse> => {
  let url = `${BASE_URL}/${API.ARTICLES}`;

  if (objectLength(query)) {
    url = appendQueryString(url, { ...query });
  }

  const res = await fetch(url, { cache: 'no-store' });

  checkError(res);

  return res.json();
};

const getFeedList = async (
  feedParameter: FeedParameter,
  token: string,
): Promise<ArticleListResponse> => {
  let url = `${BASE_URL}/${API.ARTICLES}/${API.FEED}`;

  if (objectLength(feedParameter)) {
    url = appendQueryString(url, feedParameter);
  }

  const res = await fetch(url, {
    cache: 'no-store',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  checkError(res);

  return res.json();
};

const getArticle = async (articleSlug: string): Promise<ArticleResponse> => {
  const url = `${BASE_URL}/${API.ARTICLES}/${articleSlug}`;

  const res = await fetch(url, {
    cache: 'no-store',
  });

  checkError(res);

  return res.json();
};

const postArticle = async (article: ArticleRequest, token: string) => {
  const url = `${BASE_URL}/${API.ARTICLES}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      article,
    }),
  });

  revalidatePath(`/(article)`, 'layout');
  checkError(res);

  return res.json();
};

const putArticle = async (
  article: UpdateArticleRequest,
  articleSlug: string,
  token: string,
) => {
  const url = `${BASE_URL}/${API.ARTICLES}/${articleSlug}`;

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      article,
    }),
  });

  revalidatePath(`/(article)`, 'layout');
  checkError(res);

  return res.json();
};

const deleteArticle = async (articleSlug: string, token: string) => {
  const url = `${BASE_URL}/${API.ARTICLES}/${articleSlug}`;

  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });

  revalidatePath(`/(article)`, 'layout');
  checkError(res);
};

const postFavoriteArticle = async (
  articleSlug: string,
  token: string,
): Promise<ArticleResponse> => {
  const url = `
  ${BASE_URL}/${API.ARTICLES}/${articleSlug}/${API.FAVORITE}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });

  checkError(res);

  return res.json();
};

const postUnfavoriteArticle = async (
  articleSlug: string,
  token: string,
): Promise<ArticleResponse> => {
  const url = `
  ${BASE_URL}/${API.ARTICLES}/${articleSlug}/${API.FAVORITE}`;

  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });

  checkError(res);

  return res.json();
};

export {
  getArticle,
  postArticle,
  putArticle,
  deleteArticle,
  postFavoriteArticle,
  postUnfavoriteArticle,
  getArticleList,
  getFeedList,
};
