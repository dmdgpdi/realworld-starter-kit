import Cookies from 'js-cookie';
import { AuthError, LoginUserErrorMessage } from '../auth.type';

const parseAuthError = (error: {
  [key: string]: string[];
}): Readonly<AuthError> => {
  const parsedError: AuthError = {};

  if (error.username) {
    parsedError.username = error.username;
  }

  if (error.email) {
    parsedError.email = error.email;
  }

  if (error.password) {
    parsedError.password = error.password;
  }

  if (error['email or password']) {
    parsedError.email = error['email or password'];
  }

  return parsedError;
};

const isError = (data: Object): data is LoginUserErrorMessage => {
  return 'errors' in data;
};

const setClientAuthCookie = (data: string) => {
  Cookies.set('auth', data, { expires: 1, sameSite: 'strict' });
};

const getClientAuthCookie = () => {
  return Cookies.get('auth');
};

const compareHashString = (originHash: string, inputHash: string) => {
  console.log(`origin: ${originHash}`);
  console.log(`input: ${inputHash}`);
  console.log(originHash === inputHash);

  return originHash === inputHash;
};

const FormDataEntryValueToString = (formData: FormDataEntryValue) => {
  return formData instanceof File ? '' : formData;
};

export {
  parseAuthError,
  isError,
  setClientAuthCookie,
  getClientAuthCookie,
  compareHashString,
  FormDataEntryValueToString,
};
