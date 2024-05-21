'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getClientAuthCookie } from '../lib/auth.lib';
import { authApi } from '..';

function AuthorGuard({ authorUserName, children }: AuthorGuardProps) {
  const router = useRouter();
  const [userIsAuthor, setUserIsAuthor] = useState(false);

  useEffect(() => {
    const token = getClientAuthCookie();

    if (!token) {
      router.back();
      return;
    }

    const getUserInfoAndCompareAuthor = async () => {
      const { user } = await authApi.getUserInfor(token);

      if (user.username !== authorUserName) {
        router.back();
        return;
      }

      setUserIsAuthor(true);
    };

    getUserInfoAndCompareAuthor();
  }, [router, authorUserName]);

  return userIsAuthor ? children : undefined;
}

export { AuthorGuard };

type AuthorGuardProps = {
  authorUserName: string;
  children: React.ReactNode;
};
