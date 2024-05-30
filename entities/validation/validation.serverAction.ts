'use server';

import { compareHashString } from './validation.lib';

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

const validateSlugAndHashString = async (slug: string, hashString: string) => {
  const slugHashString = await createHashString(slug);
  const isEqualHash = compareHashString(slugHashString, hashString);
  return isEqualHash;
};

export { createHashString, validateSlugAndHashString };
