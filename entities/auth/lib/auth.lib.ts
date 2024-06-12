import { AuthError } from '../auth.type';

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

export { parseAuthError };
