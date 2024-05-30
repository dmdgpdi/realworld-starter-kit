import { FormState } from './validation.type';
import { ValidationError } from './validation.model';

const compareHashString = (originHash: string, inputHash: string) => {
  console.log(originHash === inputHash);

  return originHash === inputHash;
};

const createFormState = (
  token: string | undefined,
  error: ValidationError,
): FormState => {
  const { isSuccess, errorList } = error;

  return {
    token,
    isSuccess,
    errorList,
  };
};

const hasToken = (token: string | undefined): token is string => {
  return typeof token === 'string';
};

export { compareHashString, createFormState, hasToken };
