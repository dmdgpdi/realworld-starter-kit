import { BASE_URL, API } from '@/shared/api';
import { appendUrl } from '@/shared/lib';
import { checkError } from '@/shared/api';
import {
  LoginUser,
  LoginUserResponse,
  CreateUser,
  AuthError,
  AuthErrorResponse,
  UserInforResponse,
} from './auth.type';

const postRegisterUser = async (
  userData: CreateUser,
): Promise<AuthError | undefined> => {
  const url = appendUrl(BASE_URL, API.USERS);

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: userData,
    }),
  });

  if (!res.ok) {
    const errorData: AuthErrorResponse = await res.json();
    return errorData?.errors;
  }

  return;
};

const postLoginUser = async (
  userData: LoginUser,
): Promise<LoginUserResponse> => {
  const url = appendUrl(BASE_URL, API.USERS, API.LOGIN);

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: userData,
    }),
  });

  checkError(res);
  return res.json();
};

const getUserInfor = async (token: string): Promise<UserInforResponse> => {
  const url = appendUrl(BASE_URL, API.USER);
  const res = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`${res.status} 번 ${res.statusText} error `);
  }

  return res.json();
};

export { postRegisterUser, postLoginUser, getUserInfor };
