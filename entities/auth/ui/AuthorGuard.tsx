'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '..';

function AuthorGuard({ authorUserName, children }: AuthorGuardProps) {
  const router = useRouter();
  const userInformation = useAuthStore(state => state.userInfo);
  const [userIsAuthor, setUserIsAuthor] = useState(false);

  useEffect(() => {
    if (userInformation?.username !== authorUserName) {
      router.back();
    }

    setUserIsAuthor(true);
  }, [router, userInformation, authorUserName]);

  return userIsAuthor ? children : undefined;
}

export { AuthorGuard };

type AuthorGuardProps = {
  authorUserName: string;
  children: React.ReactNode;
};
