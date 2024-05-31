'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '..';

function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      router.back();
      return;
    }
  }, [router, isLoggedIn]);

  return isLoggedIn ? children : undefined;
}

export { AuthGuard };

type AuthGuardProps = {
  children: React.ReactNode;
};
