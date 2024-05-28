'use client';

import { useEffect, useState } from 'react';
import { User } from '../auth.type';
import { getUserInfor } from '../auth.api';
import { getLocalStorageToken } from './auth.lib';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInformation, setUserInformation] = useState<User>();
  const [token, setToken] = useState<string>();

  const hasUserInformation = (user: User | undefined): user is User => {
    return !!user;
  };

  useEffect(() => {
    const localToken = getLocalStorageToken();
    setToken(localToken);

    if (!localToken) {
      return;
    }

    const getUser = async () => {
      const { user } = await getUserInfor(localToken);

      setUserInformation(user);
      setIsLoggedIn(true);
    };

    getUser();
  }, []);

  return { isLoggedIn, userInformation, hasUserInformation, token };
};

export { useAuth };
