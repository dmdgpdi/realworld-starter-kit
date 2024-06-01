'use server';

import { commentApi, commentType } from '@/entities/comment';
import { ValidationError } from '@/entities/validation';
import { authServerAction } from '@/entities/auth';
import {
  validateCreateCommentForm,
  validationErrorToFormState,
  errorToFormState,
  unknownToFormState,
} from './createComment.lib';

const createCommentFormAction = async (
  currentState: commentType.CommentFormState,
  formData: FormData,
): Promise<commentType.CommentFormState> => {
  const token = await authServerAction.getAuthCookie();
  const comment = (formData.get('comment') as string) ?? '';
  const articleSlug = (formData.get('articleSlug') as string) ?? '';

  try {
    validateCreateCommentForm(token, comment);
    await commentApi.postComment(articleSlug, comment, token!);
  } catch (error) {
    if (ValidationError.isValidationError(error)) {
      const formState = validationErrorToFormState(error, articleSlug);
      return formState;
    }

    if (error instanceof Error) {
      const formState = errorToFormState(error, articleSlug);
      return formState;
    }

    return unknownToFormState(articleSlug);
  }

  return {
    ...currentState,
    isSuccess: true,
    errorList: [],
  };
};

export { createCommentFormAction };
