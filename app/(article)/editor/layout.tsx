import { AuthGuard } from '@/entities/auth';

export default function CreateArticlePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
}
