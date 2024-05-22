import type {
  LayoutProps,
  LinkProps,
  SpanProps,
  HeadingProps,
  TextareaProps,
} from '@/shared/ui';
import Link from 'next/link';

function ArticleListPageLayout({ children, ...otherProps }: LayoutProps) {
  return (
    <main className="home-page" {...otherProps}>
      {children}
    </main>
  );
}

function MainContent({ children, ...otherProps }: LayoutProps) {
  return (
    <div className="col-md-9" {...otherProps}>
      {children}
    </div>
  );
}

function SideContent({ children, ...otherProps }: LayoutProps) {
  return (
    <section className="col-md-3" {...otherProps}>
      {children}
    </section>
  );
}

function ArticlePageLayout({ children, ...otherProps }: LayoutProps) {
  return (
    <div className="article-page" {...otherProps}>
      {children}
    </div>
  );
}

function ArticleBannerLayout({ children, ...otherProps }: LayoutProps) {
  return (
    <div className="banner" {...otherProps}>
      {children}
    </div>
  );
}

function ArticleMetaLayout({ children, ...otherProps }: LayoutProps) {
  return (
    <div className="article-meta" {...otherProps}>
      {children}
    </div>
  );
}

function InforLayout({ children, ...otherProps }: LayoutProps) {
  return (
    <div className="info" {...otherProps}>
      {children}
    </div>
  );
}

function AuthorLink({ children, href = '', ...otherProps }: LinkProps) {
  return (
    <Link className="author" href={href} {...otherProps}>
      {children}
    </Link>
  );
}

function DateDescription({ children, ...otherProps }: SpanProps) {
  return (
    <span className="date" {...otherProps}>
      {children}
    </span>
  );
}

function Counter({ children, ...otherProps }: SpanProps) {
  return (
    <span className="counter" {...otherProps}>
      {children}
    </span>
  );
}

function ArticleContentLayout({ children, ...otherProps }: LayoutProps) {
  return (
    <div className="row article-content" {...otherProps}>
      <div className="col-md-12">{children}</div>
    </div>
  );
}

function ArticleH2({ children, ...otherProps }: HeadingProps) {
  return (
    <h2 id="introducing-ionic" {...otherProps}>
      {children}
    </h2>
  );
}

function TextArea({ ...props }: TextareaProps) {
  return <textarea className="form-control" rows={8} {...props}></textarea>;
}

function ArticlePreviewLayout({ children, ...otherProps }: LayoutProps) {
  return (
    <article className="article-preview" {...otherProps}>
      {children}
    </article>
  );
}

export {
  ArticleListPageLayout,
  MainContent,
  SideContent,
  ArticlePageLayout,
  ArticleBannerLayout,
  ArticleMetaLayout,
  InforLayout,
  AuthorLink,
  DateDescription,
  Counter,
  ArticleContentLayout,
  ArticleH2,
  TextArea,
  ArticlePreviewLayout,
};
