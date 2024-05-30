import { authSchema } from '@/entities/auth';
import { ValidationError } from '@/entities/validation';

const validateLoginFormData = (data: Object) => {
  const validatedData = authSchema.LoginUserSchema.safeParse(data);

  if (!validatedData.success) {
    const errorList = validatedData.error.errors.map(error => error.message);
    throw new ValidationError(errorList, 'wrong form error');
  }

  return validatedData.data;
};

export { validateLoginFormData };
