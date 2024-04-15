'use server';

import { cookies } from 'next/headers';

const hasAuthCookie = async () => {
  const cookieStore = cookies();
  const authToken = cookieStore.get('auth');

  return !!authToken;
};

const getAuthCookie = async () => {
  const cookieStore = cookies();
  const authToken = cookieStore.get('auth');

  return authToken?.value;
};

export { hasAuthCookie, getAuthCookie };
