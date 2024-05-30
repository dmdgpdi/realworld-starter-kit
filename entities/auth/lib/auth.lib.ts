import Cookies from 'js-cookie';
import { AuthError } from '../auth.type';
import { getLocalItemWithExpiry, setLocalItemWithExpiry } from '@/shared/lib';
import { deleteLocalItem } from '@/shared/lib/localStorage';

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

const setClientAuthCookie = (data: string) => {
  Cookies.set('auth', data, { expires: 1, sameSite: 'strict' });
};

const getClientAuthCookie = () => {
  return Cookies.get('auth');
};

const getLocalStorageToken = () => {
  const localToken = getLocalItemWithExpiry<{ token: string }>('token');

  if (!localToken) {
    return undefined;
  }

  return localToken.token;
};

const setLocalStorageToken = (token: string) => {
  setLocalItemWithExpiry(
    'token',
    {
      token: token,
    },
    { expiryInDay: 1 },
  );
};

const deleteLocalStorageToken = () => {
  deleteLocalItem('token');
};

export {
  parseAuthError,
  setClientAuthCookie,
  getClientAuthCookie,
  getLocalStorageToken,
  setLocalStorageToken,
  deleteLocalStorageToken,
};
