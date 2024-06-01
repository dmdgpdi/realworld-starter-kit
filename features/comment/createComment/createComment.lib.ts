import { isEmptyString } from '@/shared/lib';
import { ERROR_MESSAGE } from '@/shared/constant';
import { validationLib } from '@/entities/validation';
import { commentType } from '@/entities/comment';
import { ValidationError } from '@/entities/validation';

const validationErrorToFormState = (
  error: ValidationError,
  articleSlug: string,
): commentType.CommentFormState => {
  const { isSuccess, errorList } = error;

  return {
    articleSlug,
    errorList,
    isSuccess,
  };
};

const errorToFormState = (
  error: Error,
  articleSlug: string,
): commentType.CommentFormState => {
  return {
    articleSlug,
    isSuccess: false,
    errorList: [error.message],
  };
};

const unknownToFormState = (
  articleSlug: string,
): commentType.CommentFormState => {
  return {
    articleSlug,
    isSuccess: false,
    errorList: [ERROR_MESSAGE.UNKNOWN_ERROR],
  };
};

const validateCreateCommentForm = (
  token: string | undefined,
  comment: string,
) => {
  const { hasToken } = validationLib;

  if (!hasToken(token)) {
    throw new ValidationError(
      [ERROR_MESSAGE.AUTH_REQUIRED],
      ERROR_MESSAGE.AUTH_REQUIRED,
    );
  }

  if (isEmptyString(comment)) {
    throw new ValidationError(
      [ERROR_MESSAGE.CONTENT_REQUIRED],
      ERROR_MESSAGE.CONTENT_REQUIRED,
    );
  }
};

export {
  validationErrorToFormState,
  errorToFormState,
  unknownToFormState,
  validateCreateCommentForm,
};
