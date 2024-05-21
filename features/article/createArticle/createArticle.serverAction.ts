'use server';

import { articleApi, articleSchema } from '@/entities/article';
import { authServerAction } from '@/entities/auth';
import { articleLib } from '@/entities/article';

const createArticleAction = async (
  currentState: any,
  formData: FormData,
): Promise<CreateArticleActionResponse> => {
  const token = await authServerAction.getAuthCookie();

  if (!token) {
    return {
      isSuccess: false,
      errorList: ['Please log in first.'],
    };
  }

  const tagsValue = formData.get('tags');
  const tagList =
    tagsValue instanceof File ? null : articleLib.textToArray(tagsValue);

  const data = {
    title: formData.get('title'),
    description: formData.get('description'),
    body: formData.get('body'),
    tagList: tagList,
  };

  //validation 실패 시.
  const parsedData = articleSchema.ArticleRequestSchema.safeParse(data);

  if (!parsedData.success) {
    const errorList = parsedData.error.errors.map(error => error.message);

    return {
      isSuccess: false,
      errorList,
    };
  }

  try {
    // 서버와 통신.
    await articleApi.postArticle(parsedData.data, token);
  } catch (error) {
    // 서버 통신 에러 핸들링.
    if (error instanceof Error) {
      return {
        isSuccess: false,
        errorList: ['Please enter correctly.', error.message],
      };
    }
  }

  return {
    isSuccess: true,
    errorList: [],
  };
};

export { createArticleAction };

type CreateArticleActionResponse = {
  isSuccess: boolean;
  errorList: string[];
};
