import type { LayoutProps } from '@/shared/ui';

function ArticlePageLayout({ children }: LayoutProps) {
  return <main className="home-page">{children}</main>;
}

function MainContent({ children }: LayoutProps) {
  return <div className="col-md-9">{children}</div>;
}

function SideContent({ children }: LayoutProps) {
  return <section className="col-md-3">{children}</section>;
}

export { ArticlePageLayout, MainContent, SideContent };
