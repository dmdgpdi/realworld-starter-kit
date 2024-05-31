'use server';

import { articleApi } from '@/entities/article';
import {
  ValidationError,
  validationType,
  validationLib,
} from '@/entities/validation';
import { authServerAction } from '@/entities/auth';
import { parseFormData, validateFormData } from './createArticle.lib';

const createArticleAction = async (
  currentState: validationType.FormState,
  formData: FormData,
): Promise<validationType.FormState> => {
  const token = await authServerAction.getAuthCookie();
  const data = parseFormData(formData);

  try {
    const validatedData = validateFormData(data, token);
    await articleApi.postArticle(validatedData, token!);
  } catch (error) {
    const { validationErrorToFormState, unknownToFormState } = validationLib;

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
