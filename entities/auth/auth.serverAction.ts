'use server';

import { cookies } from 'next/headers';

const setAuthCookie = async (token: string) => {
  cookies().set('auth', token, { httpOnly: true, maxAge: 60 * 60 * 24 });
};

const getAuthCookie = async () => {
  const authToken = cookies().get('auth');
  return authToken?.value;
};

export { setAuthCookie, getAuthCookie };
