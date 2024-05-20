import { AuthGuard } from '@/entities/auth';

export default function ArticleFeedPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
}
