'use client';

import { useAuth } from '@/entities/auth';
import AuthenticatedUserHeader from './ui/AuthenticatedUserHeader';
import UnauthenticatedUserHeader from './ui/UnauthenticatedUserHeader';

// TODO 클라이언트 렌더링 줄이기
export default function Header() {
  const { isLoggedIn, userName } = useAuth();

  if (isLoggedIn) {
    return <AuthenticatedUserHeader userName={userName} />;
  }

  return <UnauthenticatedUserHeader />;
}
