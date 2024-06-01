'use server';

import { ERROR_MESSAGE } from '@/shared/constant';
import { articleSchema } from '@/entities/article';
import { ValidationError } from '@/entities/validation';
import { validationServerAction } from '@/entities/validation';

const validateFormData = async (
  data: Object,
  token: string | undefined,
  articleSlug: string,
  hashString: string,
) => {
  if (!token) {
    throw new ValidationError(
      [ERROR_MESSAGE.AUTH_REQUIRED],
      ERROR_MESSAGE.AUTH_REQUIRED,
    );
  }

  const { validateSlugAndHashString } = validationServerAction;
  const isEqualHash = await validateSlugAndHashString(articleSlug, hashString);

  if (!isEqualHash) {
    throw new ValidationError(
      [ERROR_MESSAGE.REFRESH_PAGE],
      ERROR_MESSAGE.REFRESH_PAGE,
    );
  }

  const parsedData = articleSchema.UpdateArticleRequestSchema.safeParse(data);
  if (!parsedData.success) {
    const errorList = parsedData.error.errors.map(error => error.message);
    throw new ValidationError(errorList, 'wrong form data');
  }

  return parsedData.data;
};

export { validateFormData };
