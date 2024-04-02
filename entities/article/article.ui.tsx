function ArticlePageLayout({ children }: LayoutProps) {
  return <main className="home-page">{children}</main>;
}

function ArticleContentLayout({ children }: LayoutProps) {
  return (
    <div className="container page">
      <div className="row">{children}</div>
    </div>
  );
}

function MainContent({ children }: LayoutProps) {
  return <div className="col-md-9">{children}</div>;
}

function SideContent({ children }: LayoutProps) {
  return <section className="col-md-3">{children}</section>;
}

export { ArticlePageLayout, ArticleContentLayout, MainContent, SideContent };

type LayoutProps = React.HTMLAttributes<HTMLElement>;
