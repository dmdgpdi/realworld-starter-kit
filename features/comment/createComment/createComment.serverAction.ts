'use server';

import { commentApi, commentType } from '@/entities/comment';
import { ValidationError } from '@/entities/validation';
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
  const { token = undefined } = currentState;
  const comment = (formData.get('comment') as string) ?? '';
  const articleSlug = (formData.get('articleSlug') as string) ?? '';

  try {
    validateCreateCommentForm(token, comment);
    await commentApi.postComment(articleSlug, comment, token!);
  } catch (error) {
    if (ValidationError.isValidationError(error)) {
      const formState = validationErrorToFormState(error, articleSlug, token);
      return formState;
    }

    if (error instanceof Error) {
      const formState = errorToFormState(error, articleSlug, token);
      return formState;
    }

    return unknownToFormState(articleSlug, token);
  }

  return {
    ...currentState,
    isSuccess: true,
    errorList: [],
  };
};

export { createCommentFormAction };
