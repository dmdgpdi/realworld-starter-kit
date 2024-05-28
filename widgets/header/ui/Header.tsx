'use client';

import { useAuthStore } from '@/entities/auth';
import AuthenticatedUserHeader from './AuthenticatedUserHeader';
import UnauthenticatedUserHeader from './UnauthenticatedUserHeader';

function Header() {
  const { isLoggedIn, userInfo } = useAuthStore(state => state);

  if (isLoggedIn) {
    const username = userInfo?.username ?? '';

    return <AuthenticatedUserHeader userName={username} />;
  }

  return <UnauthenticatedUserHeader />;
}

export { Header };
