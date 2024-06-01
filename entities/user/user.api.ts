import { API, BASE_URL, checkError } from '@/shared/api';
import { ProfileResponse } from './user.type';

const postUserFollow = async (username: string, token: string) => {
  const url = `${BASE_URL}/${API.PROFILES}/${username}/${API.FOLLOW}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });

  checkError(res);
};

const deleteUserFollow = async (username: string, token: string) => {
  const url = `${BASE_URL}/${API.PROFILES}/${username}/${API.FOLLOW}`;

  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });

  checkError(res);
};

const getUserProfile = async (username: string): Promise<ProfileResponse> => {
  const url = `${BASE_URL}/${API.PROFILES}/${username}`;

  const res = await fetch(url, {
    cache: 'no-store',
  });

  checkError(res);

  return res.json();
};

export { postUserFollow, deleteUserFollow, getUserProfile };
