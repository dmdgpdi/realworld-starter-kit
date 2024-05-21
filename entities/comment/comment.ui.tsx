import type {
  FormProps,
  LayoutProps,
  TextareaProps,
  ButtonProps,
  ParagraphProps,
  LinkProps,
  SpanProps,
} from '@/shared/ui';
import Image, { ImageProps } from 'next/image';
import Link from 'next/link';
import { forwardRef } from 'react';

function CommentFormLayout({ children, ...otherProps }: FormProps) {
  return (
    <form className="card comment-form" {...otherProps}>
      {children}
    </form>
  );
}

function CommentCardLayout({ children, ...otherProps }: LayoutProps) {
  return (
    <div className="card" {...otherProps}>
      {children}
    </div>
  );
}

function CommentCardBlock({ children, ...otherProps }: LayoutProps) {
  return (
    <div className="card-block" {...otherProps}>
      {children}
    </div>
  );
}

function CommentText({ children, ...otherProps }: ParagraphProps) {
  return (
    <p className="card-text" {...otherProps}>
      {children}
    </p>
  );
}

const CommentInput = forwardRef(
  (props: TextareaProps, ref: React.ForwardedRef<HTMLTextAreaElement>) => {
    return (
      <textarea
        className="form-control"
        placeholder="Write a comment..."
        rows={3}
        {...props}
        ref={ref}
      ></textarea>
    );
  },
);
CommentInput.displayName = 'CommentInput';

function CommentCardFooter({ children, ...otherProps }: LayoutProps) {
  return (
    <div className="card-footer" {...otherProps}>
      {children}
    </div>
  );
}

function CommentAuthorImage({ src, alt, ...otherProps }: ImageProps) {
  return (
    <Image
      src={src}
      className="comment-author-img"
      alt={alt}
      width={30}
      height={30}
      {...otherProps}
    />
  );
}

function CommentAuthorLink({ children, href = '', ...otherProps }: LinkProps) {
  return (
    <Link className="comment-author" href={href} {...otherProps}>
      {children}
    </Link>
  );
}

function CommentSubmitButton({ children, ...otherProps }: ButtonProps) {
  return (
    <button className="btn btn-sm btn-primary" {...otherProps}>
      {children}
    </button>
  );
}

function CommentDateSpan({ children }: SpanProps) {
  return <span className="date-posted">{children}</span>;
}

function CommentDeleteSpan(props: SpanProps) {
  return (
    <span className="mod-options" {...props}>
      <i className="ion-trash-a"></i>
    </span>
  );
}

function CommentLayout({ children, ...otherProps }: LayoutProps) {
  return (
    <div className="col-xs-12 col-md-8 offset-md-2" {...otherProps}>
      {children}
    </div>
  );
}

export {
  CommentFormLayout,
  CommentCardLayout,
  CommentCardBlock,
  CommentText,
  CommentCardFooter,
  CommentInput,
  CommentAuthorImage,
  CommentSubmitButton,
  CommentAuthorLink,
  CommentDateSpan,
  CommentDeleteSpan,
  CommentLayout,
};
