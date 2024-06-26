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

function CommonIcon({ children, icon, ...otherProps }: CommonIconProps) {
  return (
    <i className={icon} {...otherProps}>
      {children}
    </i>
  );
}

function FeedToggleLayout({ children, ...otherProps }: LayoutProps) {
  return (
    <div className="feed-toggle" {...otherProps}>
      {children}
    </div>
  );
}

function FormContentLayout(props: LayoutProps) {
  const { children, ...otherProps } = props;

  return (
    <div className="col-md-6 offset-md-3 col-xs-12" {...otherProps}>
      {children}
    </div>
  );
}

function TextArea({ ...props }: TextareaProps) {
  return <textarea className="form-control" rows={8} {...props}></textarea>;
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
  CommonIcon,
  FeedToggleLayout,
  FormContentLayout,
  TextArea,
};

export {
  Nav,
  NavIcon,
  NavIconLink,
  NavItem,
  NavItemList,
  NavLink,
  CategoryNav,
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
export type ListItemProps = React.LiHTMLAttributes<HTMLLIElement>;
export type NavProps = React.HTMLAttributes<HTMLElement>;
export type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

type CommonButtonProps = ButtonProps & {
  outLineBorderColor: 'secondary' | 'primary' | 'danger';
  size?: 'pull-xs-right';
  actionBtn?: 'action-btn';
};

type CommonIconProps = LayoutProps & {
  icon:
    | 'ion-plus-round'
    | 'ion-heart'
    | 'ion-edit'
    | 'ion-trash-a'
    | 'ion-close-round'
    | 'ion-gear-a';
};
