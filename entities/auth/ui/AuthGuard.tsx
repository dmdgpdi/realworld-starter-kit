'use client';

import { useRouter } from 'next/navigation';
import { getLocalStorageToken } from '../lib/auth.lib';
import { useEffect, useState } from 'react';

function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const hasToken = getLocalStorageToken();

    if (!hasToken) {
      router.back();
      return;
    }

    if (hasToken) {
      setIsLoggedIn(true);
    }
  }, [router]);

  return isLoggedIn ? children : undefined;
}

export { AuthGuard };

type AuthGuardProps = {
  children: React.ReactNode;
};
