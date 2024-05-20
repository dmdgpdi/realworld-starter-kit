'use server';

import { ERROR_MESSAGE } from '@/shared/constant';
import { articleApi, articleSchema } from '@/entities/article';
import { authServerAction, authLib } from '@/entities/auth';

const validateArticleSlug = async (articleSlug: string, hashValue: string) => {
  const { createHashString } = authServerAction;
  const { compareHashString } = authLib;

  const articleSlugHashValue = await createHashString(articleSlug);
  const isEqualHash = compareHashString(hashValue, articleSlugHashValue);
  return isEqualHash;
};

const updateArticleAction = async (
  currentState: any,
  formData: FormData,
): Promise<UpdateArticleActionResponse> => {
  const { FormDataEntryValueToString } = authLib;

  const token = await authServerAction.getAuthCookie();

  if (!token) {
    return {
      isSuccess: false,
      errorList: [ERROR_MESSAGE.AUTH_REQUIRED],
    };
  }

  const data = {
    title: formData.get('title'),
    description: formData.get('description'),
    body: formData.get('body'),
  };

  //validation 실패 시.
  const parsedData = articleSchema.UpdateArticleRequestSchema.safeParse(data);

  if (!parsedData.success) {
    const errorList = parsedData.error.errors.map(error => error.message);

    return {
      isSuccess: false,
      errorList,
    };
  }

  const articleSlug = FormDataEntryValueToString(formData.get('slug') ?? '');
  const hashValue = FormDataEntryValueToString(formData.get('hash') ?? '');
  const isEqualHash = await validateArticleSlug(articleSlug, hashValue);

  if (!isEqualHash) {
    return {
      isSuccess: false,
      errorList: [ERROR_MESSAGE.REFRESH_PAGE],
    };
  }

  try {
    // 서버와 통신.
    await articleApi.putArticle(parsedData.data, articleSlug, token);
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

export { updateArticleAction };

type UpdateArticleActionResponse = {
  isSuccess: boolean;
  errorList: string[];
};
