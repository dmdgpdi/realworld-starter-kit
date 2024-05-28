import Link from 'next/link';
import { ContentPageLayout } from '@/shared/ui';
import {
  AuthContentLayout,
  AuthH1,
  AuthPageLayout,
  AuthP,
} from '@/entities/auth';
import { LoginForm } from '@/features/auth';

export default async function LoginPage() {
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
