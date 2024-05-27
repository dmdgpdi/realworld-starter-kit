'use client';

import { useEffect, useState } from 'react';
import { getClientAuthCookie } from './auth.lib';
import { User } from '../auth.type';
import { getUserInfor } from '../auth.api';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInformation, setUserInformation] = useState<User>();
  const [token, setToken] = useState<string>();

  const hasUserInformation = (user: User | undefined): user is User => {
    return !!user;
  };

  useEffect(() => {
    const cookie = getClientAuthCookie();
    setToken(cookie);

    if (!cookie) {
      return;
    }

    const getUser = async () => {
      const { user } = await getUserInfor(cookie);

      setUserInformation(user);
      setIsLoggedIn(true);
    };

    getUser();
  }, []);

  return { isLoggedIn, userInformation, hasUserInformation, token };
};

export { useAuth };
