import { ERROR_MESSAGE } from '@/shared/constant';
import { articleLib, articleSchema } from '@/entities/article';
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

export { parseFormData, validateFormData };
