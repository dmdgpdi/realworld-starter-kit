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

const createHashString = async (message: string) => {
  const key = process.env.ENCRYPTION_KEY;
  const encoder = new TextEncoder();
  const data = encoder.encode(message + key);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');
  return hashHex;
};

export { hasAuthCookie, getAuthCookie, createHashString };
