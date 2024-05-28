'use client';

import { useRouter } from 'next/navigation';
import { getLocalStorageToken } from '../lib/auth.lib';
import { useEffect, useState } from 'react';

function NoAuthGuard({ children }: NoAuthGuardProps) {
  const router = useRouter();
  const [isNoLoggedIn, setIsNoLoggedIn] = useState(false);

  useEffect(() => {
    const hasToken = getLocalStorageToken();

    if (hasToken) {
      router.back();
      return;
    }

    setIsNoLoggedIn(true);
  }, [router]);

  return isNoLoggedIn ? children : undefined;
}

export { NoAuthGuard };

type NoAuthGuardProps = {
  children: React.ReactNode;
};
