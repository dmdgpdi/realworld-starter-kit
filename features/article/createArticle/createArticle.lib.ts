import { ERROR_MESSAGE } from '@/shared/constant';
import { articleLib, articleSchema, articleTypes } from '@/entities/article';
import { ValidationError } from '@/entities/validation';

const parseFormData = (formData: FormData) => {
  const tagsValue = formData.get('tags');
  const tagList =
    tagsValue instanceof File ? null : articleLib.textToArray(tagsValue);

  const data = {
    title: formData.get('title'),
    description: formData.get('description'),
    body: formData.get('body'),
    tagList: tagList,
  };

  return data;
};

const validateFormData = (data: Object, token: string | undefined) => {
  const parsedData = articleSchema.ArticleRequestSchema.safeParse(data);

  if (!token) {
    throw new ValidationError(
      [ERROR_MESSAGE.AUTH_REQUIRED],
      ERROR_MESSAGE.AUTH_REQUIRED,
    );
  }

  if (!parsedData.success) {
    const errorList = parsedData.error.errors.map(error => error.message);
    throw new ValidationError(errorList, 'wrong form data');
  }

  return parsedData.data;
};

const validationErrorToFormState = (
  error: ValidationError,
  token?: string,
): articleTypes.ArticleFormState => {
  const { isSuccess, errorList } = error;

  return {
    isSuccess,
    errorList,
    token,
  };
};

const unknownToFormState = (token?: string): articleTypes.ArticleFormState => {
  return {
    isSuccess: false,
    errorList: [ERROR_MESSAGE.UNKNOWN_ERROR],
    token,
  };
};

export {
  parseFormData,
  validateFormData,
  validationErrorToFormState,
  unknownToFormState,
};
