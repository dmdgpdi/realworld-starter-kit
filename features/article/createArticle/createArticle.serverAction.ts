'use server';

import { articleApi, articleTypes } from '@/entities/article';
import { ValidationError } from '@/entities/validation';
import {
  parseFormData,
  validateFormData,
  validationErrorToFormState,
  unknownToFormState,
} from './createArticle.lib';

const createArticleAction = async (
  currentState: articleTypes.ArticleFormState,
  formData: FormData,
): Promise<articleTypes.ArticleFormState> => {
  const { token } = currentState;
  const data = parseFormData(formData);

  try {
    const validatedData = validateFormData(data, token);
    await articleApi.postArticle(validatedData, token!);
  } catch (error) {
    if (ValidationError.isValidationError(error)) {
      const formState = validationErrorToFormState(error, token);
      return formState;
    }

    const formState = unknownToFormState();
    return formState;
  }

  return {
    token,
    isSuccess: true,
    errorList: [],
  };
};

export { createArticleAction };
