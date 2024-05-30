'use server';

import { authApi, authServerAction } from '@/entities/auth';
import {
  ValidationError,
  validationLib,
  validationType,
} from '@/entities/validation';
import { validateLoginFormData } from './login.lib';

const loginFormAction = async (
  currentState: validationType.FormState,
  formData: FormData,
): Promise<validationType.FormState> => {
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  try {
    const validatedData = validateLoginFormData(data);
    const { user } = await authApi.postLoginUser(validatedData);
    await authServerAction.setAuthCookie(user.token);
  } catch (error) {
    const { validationErrorToFormState, unknownToFormState } = validationLib;

    if (ValidationError.isValidationError(error)) {
      const formState = validationErrorToFormState(error);
      return formState;
    }

    const formState = unknownToFormState();
    return formState;
  }

  return {
    isSuccess: true,
    errorList: [],
  };
};

export { loginFormAction };
