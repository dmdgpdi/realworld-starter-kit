'use server';

import { FormDataEntryValueToString } from '@/shared/lib';
import { articleApi, articleTypes } from '@/entities/article';
import { ValidationError, validationLib } from '@/entities/validation';
import { validateFormData } from './updateArticle.lib';
import { authServerAction } from '@/entities/auth';

const updateArticleAction = async (
  currentState: articleTypes.ArticleFormState,
  formData: FormData,
): Promise<articleTypes.ArticleFormState> => {
  const token = await authServerAction.getAuthCookie();
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
    const { validationErrorToFormState, unknownToFormState } = validationLib;

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
