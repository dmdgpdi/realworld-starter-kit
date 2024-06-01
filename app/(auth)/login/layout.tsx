import { NoAuthGuard } from '@/entities/auth';

export default function LoginPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NoAuthGuard>{children}</NoAuthGuard>;
}
