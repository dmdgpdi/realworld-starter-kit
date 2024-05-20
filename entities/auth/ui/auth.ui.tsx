import { ParagraphProps, LayoutProps } from '@/shared/ui';

function AuthContentLayout(props: DivProps) {
  const { children, ...otherProps } = props;

  return (
    <div className="col-md-6 offset-md-3 col-xs-12" {...otherProps}>
      {children}
    </div>
  );
}

function AuthH1(props: H1Props) {
  const { children, ...otherProps } = props;

  return (
    <h1 className="text-xs-center" {...otherProps}>
      {children}
    </h1>
  );
}

function AuthPageLayout(props: DivProps) {
  const { children, ...otherProps } = props;

  return (
    <div className="auth-page" {...otherProps}>
      {props.children}
    </div>
  );
}

function AuthP(props: ParagraphProps) {
  const { children, ...otherProps } = props;

  return (
    <p className="text-xs-center" {...otherProps}>
      {children}
    </p>
  );
}

function EditorPageLayout({ children, ...otherProps }: LayoutProps) {
  return (
    <div className="editor-page" {...otherProps}>
      {children}
    </div>
  );
}

export { AuthContentLayout, AuthH1, AuthPageLayout, AuthP, EditorPageLayout };

type DivProps = React.HTMLAttributes<HTMLDivElement>;
type H1Props = React.HTMLAttributes<HTMLHeadingElement>;
