import Link from 'next/link';
import { redirect } from 'next/navigation';

import { ContentPageLayout } from '@/shared/ui';
import {
  AuthContentLayout,
  AuthH1,
  AuthPageLayout,
  AuthP,
  authServerAction,
} from '@/entities/auth';
import { LoginForm } from '@/features/auth';

export default async function LoginPage() {
  const isLoggedIn = await authServerAction.hasAuthCookie();

  if (isLoggedIn) {
    redirect('/');
  }

  return (
    <AuthPageLayout>
      <ContentPageLayout>
        <AuthContentLayout>
          <AuthH1>Sign in</AuthH1>
          <AuthP>
            <Link href="/register">Need an account?</Link>
          </AuthP>
          <LoginForm />
        </AuthContentLayout>
      </ContentPageLayout>
    </AuthPageLayout>
  );
}
