'use client';

import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { ERROR_MESSAGE } from '@/shared/constant';
import { toastContext } from '@/entities/toast';
import { userApi } from '@/entities/user';

const useFollow = (
  token: string | undefined,
  username: string,
  initialFollowingValue: boolean,
) => {
  const [isFollowing, setIsFollowing] = useState(initialFollowingValue);

  const createToast = toastContext.useToastStore(
    useShallow(state => state.createToast),
  );

  const toggleFollowing = () => {
    setIsFollowing(prev => !prev);
  };

  const followUser = async () => {
    if (!token) {
      createToast({ message: ERROR_MESSAGE.AUTH_REQUIRED });
      return;
    }

    try {
      toggleFollowing();
      await userApi.postUserFollow(username, token);
    } catch (error) {
      if (error instanceof Error) {
        createToast({ message: error.message });
        toggleFollowing();
      }
    }
  };

  const unfollowUser = async () => {
    if (!token) {
      createToast({ message: ERROR_MESSAGE.AUTH_REQUIRED });
      return;
    }

    try {
      toggleFollowing();
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
