import { forwardRef } from 'react';

function FieldSet({ children }: FieldSetProps) {
  return <fieldset className="form-group">{children}</fieldset>;
}

const Input = forwardRef(
  (props: InputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    return (
      <input className="form-control form-control-lg" {...props} ref={ref} />
    );
  },
);
Input.displayName = 'Input';

function SubmitButton(props: SubmitButtonProps) {
  const { children, ...otherProps } = props;

  return (
    <button className="btn btn-lg btn-primary pull-xs-right" {...otherProps}>
      {children}
    </button>
  );
}

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

function ErrorMessageUl(props: UlProps) {
  const { children, ...otherProps } = props;

  return (
    <ul className="error-messages" {...otherProps}>
      {children}
    </ul>
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

export {
  FieldSet,
  Input,
  SubmitButton,
  AuthContentLayout,
  AuthH1,
  AuthPageLayout,
  ErrorMessageUl,
  AuthP,
};

type FieldSetProps = React.FieldsetHTMLAttributes<HTMLFieldSetElement>;
type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
type SubmitButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
type DivProps = React.HTMLAttributes<HTMLDivElement>;
type H1Props = React.HTMLAttributes<HTMLHeadingElement>;
type UlProps = React.HTMLAttributes<HTMLUListElement>;
type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement>;
