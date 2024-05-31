'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '..';

function NoAuthGuard({ children }: NoAuthGuardProps) {
  const router = useRouter();
  const userInformation = useAuthStore(state => state.userInfo);
  const [isNoLoggedIn, setIsNoLoggedIn] = useState(false);

  useEffect(() => {
    if (userInformation) {
      router.back();
      return;
    }

    setIsNoLoggedIn(true);
  }, [router, userInformation]);

  return isNoLoggedIn ? children : undefined;
}

export { NoAuthGuard };

type NoAuthGuardProps = {
  children: React.ReactNode;
};
