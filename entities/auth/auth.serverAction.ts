'use server';

import { cookies } from 'next/headers';

const setAuthCookie = async (token: string) => {
  const oneDay = 60 * 60 * 24;
  cookies().set('auth', token, { httpOnly: true, maxAge: oneDay });
};

const getAuthCookie = async () => {
  const authToken = cookies().get('auth');
  return authToken?.value;
};

const deleteAuthCookie = async () => {
  cookies().set('auth', '', { httpOnly: true, maxAge: 0 });
};

export { setAuthCookie, getAuthCookie, deleteAuthCookie };
