'use server';

import { FormDataEntryValueToString } from '@/shared/lib';
import { articleApi, articleTypes } from '@/entities/article';
import { ValidationError } from '@/entities/validation';
import { validateFormData } from './updateArticle.lib';
import {
  unknownToFormState,
  validationErrorToFormState,
} from '../createArticle/createArticle.lib';

const updateArticleAction = async (
  currentState: articleTypes.ArticleFormState,
  formData: FormData,
): Promise<articleTypes.ArticleFormState> => {
  const { token } = currentState;
  const data = {
    title: formData.get('title'),
    description: formData.get('description'),
    body: formData.get('body'),
  };
  const articleSlug = FormDataEntryValueToString(formData.get('slug') ?? '');
  const hashString = FormDataEntryValueToString(formData.get('hash') ?? '');

  try {
    const validatedData = await validateFormData(
      data,
      token,
      articleSlug,
      hashString,
    );

    await articleApi.putArticle(validatedData, articleSlug, token!);
  } catch (error) {
    if (ValidationError.isValidationError(error)) {
      const formState = validationErrorToFormState(error, token);
      return formState;
    }

    const formState = unknownToFormState();
    return formState;
  }

  return {
    ...currentState,
    isSuccess: true,
    errorList: [],
  };
};

export { updateArticleAction };
