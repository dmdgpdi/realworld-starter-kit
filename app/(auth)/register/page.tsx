import Link from 'next/link';
import { ContentPageLayout } from '@/shared/ui';
import {
  AuthContentLayout,
  AuthH1,
  AuthPageLayout,
  AuthP,
} from '@/entities/auth';
import { RegisterForm } from '@/features/auth';

export default function RegisterPage() {
  return (
    <AuthPageLayout>
      <ContentPageLayout>
        <AuthContentLayout>
          <AuthH1>Sign up</AuthH1>
          <AuthP>
            <Link href="/login">Have an account?</Link>
          </AuthP>
          <RegisterForm />
        </AuthContentLayout>
      </ContentPageLayout>
    </AuthPageLayout>
  );
}
