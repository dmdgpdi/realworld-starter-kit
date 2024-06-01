'use client';

import { useState, useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { ERROR_MESSAGE } from '@/shared/constant';
import { toastContext } from '@/entities/toast';
import { userApi } from '@/entities/user';
import { authServerAction } from '@/entities/auth';

const useFollow = (username: string, initialFollowingValue: boolean) => {
  const [isFollowing, setIsFollowing] = useState(initialFollowingValue);
  const [token, setToken] = useState<string>();

  useEffect(() => {
    const getToken = async () => {
      const authToken = await authServerAction.getAuthCookie();
      setToken(authToken);
    };

    getToken();
  }, []);

  const createToast = toastContext.useToastStore(
    useShallow(state => state.createToast),
  );

  const toggleFollowing = () => {
    setIsFollowing(prev => !prev);
  };

  const followUser = async () => {
    try {
      toggleFollowing();

      if (!token) {
        throw new Error(ERROR_MESSAGE.AUTH_REQUIRED);
      }

      await userApi.postUserFollow(username, token);
    } catch (error) {
      if (error instanceof Error) {
        createToast({ message: error.message });
        toggleFollowing();
      }
    }
  };

  const unfollowUser = async () => {
    try {
      toggleFollowing();

      if (!token) {
        throw new Error(ERROR_MESSAGE.AUTH_REQUIRED);
      }

      await userApi.deleteUserFollow(username, token);
    } catch (error) {
      if (error instanceof Error) {
        createToast({ message: error.message });
        toggleFollowing();
      }
    }
  };

  return { isFollowing, followUser, unfollowUser };
};

export { useFollow };
