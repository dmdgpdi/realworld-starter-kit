import { forwardRef } from 'react';

function ContentPageLayout({ children }: LayoutProps) {
  return (
    <div className="container page">
      <div className="row">{children}</div>
    </div>
  );
}

function ContainerLayout({ children }: LayoutProps) {
  return <div className="container">{children}</div>;
}

function ContainerPageLayout({ children }: LayoutProps) {
  return <div className="container page">{children}</div>;
}

function ErrorMessageUl(props: UlProps) {
  const { children, ...otherProps } = props;

  return (
    <ul className="error-messages" {...otherProps}>
      {children}
    </ul>
  );
}

function FieldSet({ children }: FieldSetProps) {
  return <fieldset className="form-group">{children}</fieldset>;
}

const LargeInput = forwardRef(
  (props: InputProps, ref?: React.ForwardedRef<HTMLInputElement>) => {
    return (
      <input className="form-control form-control-lg" {...props} ref={ref} />
    );
  },
);
LargeInput.displayName = 'LargeInput';

const Input = forwardRef(
  (props: InputProps, ref?: React.ForwardedRef<HTMLInputElement>) => {
    return <input className="form-control " {...props} ref={ref} />;
  },
);
Input.displayName = 'Input';

function SubmitButton({ children, ...otherProps }: ButtonProps) {
  return (
    <button className="btn btn-lg btn-primary pull-xs-right" {...otherProps}>
      {children}
    </button>
  );
}

function LogoFont({ children, ...otherProps }: HeadingProps) {
  return (
    <h1 className="logo-font" {...otherProps}>
      {children}
    </h1>
  );
}

function RowLayout({ children, ...otherProps }: LayoutProps) {
  return (
    <div className="row" {...otherProps}>
      {children}
    </div>
  );
}

function ResponsiveWidthContainer({ children, ...otherProps }: LayoutProps) {
  return (
    <div className="col-md-10 offset-md-1 col-xs-12" {...otherProps}>
      {children}
    </div>
  );
}

function CommonButton({
  children,
  outLineBorderColor,
  size,
  actionBtn,
  ...otherProps
}: CommonButtonProps) {
  return (
    <button
      className={`btn btn-sm btn-outline-${outLineBorderColor} ${size} ${actionBtn}`}
      {...otherProps}
    >
      {children}
    </button>
  );
}

export {
  ContentPageLayout,
  ContainerLayout,
  ContainerPageLayout,
  ErrorMessageUl,
  FieldSet,
  LargeInput,
  Input,
  SubmitButton,
  LogoFont,
  RowLayout,
  ResponsiveWidthContainer,
  CommonButton,
};

export {
  Nav,
  NavIcon,
  NavIconLink,
  NavItem,
  NavItemList,
  NavLink,
} from './Nav';

export type { NavLinkProps } from './Nav';

export type LayoutProps = React.HTMLAttributes<HTMLElement>;
export type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;
export type SpanProps = React.HTMLAttributes<HTMLSpanElement>;
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
export type FormProps = React.FormHTMLAttributes<HTMLFormElement>;
export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;
export type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement>;
export type HeadingProps = React.HTMLAttributes<HTMLHeadingElement>;
export type UlProps = React.HTMLAttributes<HTMLUListElement>;
export type FieldSetProps = React.FieldsetHTMLAttributes<HTMLFieldSetElement>;
export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
export type NavItemProps = React.LiHTMLAttributes<HTMLLIElement>;
export type NavProps = React.HTMLAttributes<HTMLElement>;

type CommonButtonProps = ButtonProps & {
  outLineBorderColor: 'secondary' | 'primary' | 'danger';
  size?: 'pull-xs-right';
  actionBtn?: 'action-btn';
};
