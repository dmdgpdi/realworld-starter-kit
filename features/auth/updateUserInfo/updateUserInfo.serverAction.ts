'use server';

import { authApi, authServerAction } from '@/entities/auth';
import {
  ValidationError,
  validationLib,
  validationType,
} from '@/entities/validation';
import { parseFormData, validateFormData } from './updateUserInfo.lib';

const updateUserInfoAction = async (
  currentState: validationType.FormState,
  formData: FormData,
): Promise<validationType.FormState> => {
  const token = await authServerAction.getAuthCookie();
  const parsedData = parseFormData(formData);
  let user;

  try {
    const validatedData = validateFormData(parsedData, token);
    const { user: newUserInfo } = await authApi.updateUserInfo(
      validatedData,
      token!,
    );
    user = newUserInfo;
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
    token: user.token,
    isSuccess: true,
    errorList: [],
  };
};
export { updateUserInfoAction };
