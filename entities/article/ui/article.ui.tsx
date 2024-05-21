import type {
  LayoutProps,
  LinkProps,
  SpanProps,
  ButtonProps,
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

function ArticleButton({
  children,
  outLineBorderColor,
  size,
  ...otherProps
}: ArticleButtonProps) {
  return (
    <button
      className={`btn btn-sm btn-outline-${outLineBorderColor} ${size}`}
      {...otherProps}
    >
      {children}
    </button>
  );
}

function ArticleIcon({ children, icon, ...otherProps }: ArticleIconProps) {
  return (
    <i className={icon} {...otherProps}>
      {children}
    </i>
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

function CreateArticleLayout({ children, ...otherProps }: LayoutProps) {
  return (
    <div className="col-md-10 offset-md-1 col-xs-12" {...otherProps}>
      {children}
    </div>
  );
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
  ArticleButton,
  ArticleIcon,
  Counter,
  ArticleContentLayout,
  ArticleH2,
  TextArea,
  CreateArticleLayout,
  ArticlePreviewLayout,
};

type ArticleButtonProps = ButtonProps & {
  outLineBorderColor: 'secondary' | 'primary' | 'danger';
  size?: 'pull-xs-right';
};

type ArticleIconProps = LayoutProps & {
  icon:
    | 'ion-plus-round'
    | 'ion-heart'
    | 'ion-edit'
    | 'ion-trash-a'
    | 'ion-close-round';
};
