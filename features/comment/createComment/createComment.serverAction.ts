'use server';

import { authServerAction } from '@/entities/auth';
import { commentApi } from '@/entities/comment';
import { API } from '@/shared/api';
import { isEmptyString } from '@/shared/lib';
import { revalidatePath } from 'next/cache';

// TODO: articleTitle가 제대로 된 값인지 validate
const postComment = async (currentState: any, formData: FormData) => {
  const token = await authServerAction.getAuthCookie();
  const comment = (formData.get('comment') as string) ?? '';
  const articleTitle = (formData.get('articleTitle') as string) ?? '';

  if (!token) {
    return {
      message: 'Please log in first.',
    };
  }

  if (isEmptyString(comment)) {
    return {
      message: 'Do not enter blanks.',
    };
  }

  try {
    await commentApi.postComment(articleTitle, comment, token);
    revalidatePath(`${API.ARTICLES}/${articleTitle}`);

    return {
      success: true,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    }
  }
};

export { postComment };
