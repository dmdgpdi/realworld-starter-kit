import { ERROR_MESSAGE } from '@/shared/constant';
import { authSchema } from '@/entities/auth';
import { ValidationError } from '@/entities/validation';

const parseFormData = (formData: FormData) => {
  const data = {
    email: formData.get('email') === '' ? undefined : formData.get('email'),
    password:
      formData.get('password') === '' ? undefined : formData.get('password'),
    username:
      formData.get('username') === '' ? undefined : formData.get('username'),
    bio: formData.get('bio') === '' ? undefined : formData.get('bio'),
    image:
      formData.get('imageUrl') === '' ? undefined : formData.get('imageUrl'),
  };

  return data;
};

const hasToken = (token: string | undefined) => {
  if (!token) {
    throw new ValidationError(
      [ERROR_MESSAGE.AUTH_REQUIRED],
      ERROR_MESSAGE.AUTH_REQUIRED,
    );
  }

  return token;
};

const validateFormData = (data: Object) => {
  const parsedData = authSchema.UpdateUserRequestSchema.safeParse(data);

  if (!parsedData.success) {
    const errorList = parsedData.error.errors.map(error => error.message);
    throw new ValidationError(errorList, 'wrong form data');
  }

  return parsedData.data;
};

export { parseFormData, validateFormData, hasToken };
