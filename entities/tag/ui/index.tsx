import { LayoutProps, SpanProps } from '@/shared/ui';

function TagSpan({ children, ...otherProps }: SpanProps) {
  return (
    <span className="tag-default tag-pill" {...otherProps}>
      {children}
    </span>
  );
}

function TagListLayout({ children, ...otherProps }: LayoutProps) {
  return (
    <div className="tag-list" {...otherProps}>
      {children}
    </div>
  );
}

export { TagSpan, TagListLayout };
export { ArticleCategoryTag } from './ArticleCategoryTag';
export { ArticleDescriptionTag } from './ArticleDescriptionTag';
