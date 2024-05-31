'use client';

import { useAuthStore } from '@/entities/auth';
import AuthenticatedUserHeader from './AuthenticatedUserHeader';
import UnauthenticatedUserHeader from './UnauthenticatedUserHeader';

function Header() {
  const userInfo = useAuthStore(state => state.userInfo);

  if (userInfo) {
    return <AuthenticatedUserHeader userName={userInfo.username} />;
  }

  return <UnauthenticatedUserHeader />;
}

export { Header };
