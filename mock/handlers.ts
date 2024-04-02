import { HttpResponse, http } from 'msw';
import { API } from '@/shared/api';

const BASE_URL = 'http://localhost:9090';

export const articleHandler = [
  http.get(`${BASE_URL}/${API.ARTICLES}`, () => {
    return HttpResponse.json({
      articles: [
        {
          slug: 'mock-slug',
          title: 'mock-title',
          description: 'mock-description',
          body: 'mock-body',
          tagList: ['mock-tag1', 'mock-tag2', 'mock-tag3', 'mock-tag4'],
          createdAt: '2024-01-04T00:52:20.549Z',
          updatedAt: '2024-01-04T00:52:20.549Z',
          favorited: true,
          favoritesCount: 10,
          author: {
            username: 'mock-username',
            bio: null,
            image: 'https://api.realworld.io/images/demo-avatar.png',
            following: false,
          },
        },
        {
          slug: 'mock-slug',
          title: 'mock-title',
          description: 'mock-description',
          body: 'mock-body',
          tagList: ['mock-tag1', 'mock-tag2', 'mock-tag3', 'mock-tag4'],
          createdAt: '2024-01-04T00:52:20.549Z',
          updatedAt: '2024-01-04T00:52:20.549Z',
          favorited: true,
          favoritesCount: 10,
          author: {
            username: 'mock-username',
            bio: null,
            image: 'https://api.realworld.io/images/demo-avatar.png',
            following: false,
          },
        },
      ],
      articlesCount: 2,
    });
  }),
];

export const tagHandler = [
  http.get(`${BASE_URL}/${API.TAGS}`, () => {
    return HttpResponse.json({
      tags: ['mock-tag1', 'mock-tag2', 'mock-tag3'],
    });
  }),
];
