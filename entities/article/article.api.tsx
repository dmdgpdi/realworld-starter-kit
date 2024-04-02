import { BASE_URL, API } from '@/shared/api';

import { objectLength } from '@/shared/lib';
import { ArticleListType, Query } from './article.type';
import { appendQueryString } from './article.lib';
import { ARTICLES_PER_PAGE } from './article.constant';

const getArticleList = async (
  query: Query = { limit: ARTICLES_PER_PAGE },
): Promise<ArticleListType> => {
  let url = `${BASE_URL}/${API.ARTICLES}`;

  if (objectLength(query)) {
    url = appendQueryString(url, { ...query });
  }

  const res = await fetch(url, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error(
      `${res.status} 번 ${res.statusText} error 데이터 불러오기 실패`,
    );
  }

  return res.json();
};

export { getArticleList };