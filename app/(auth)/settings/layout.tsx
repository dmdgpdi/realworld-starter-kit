import { AuthGuard } from '@/entities/auth';

export default function SettingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
}
