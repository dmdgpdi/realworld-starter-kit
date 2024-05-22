import Link from 'next/link';

import { LinkProps, NavItemProps, LayoutProps, UlProps, NavProps } from '.';

export function Nav({ children, ...otherProps }: LayoutProps) {
  return (
    <nav className="navbar navbar-light" {...otherProps}>
      <div className="container">{children}</div>
    </nav>
  );
}

export function NavIconLink({ href, children, ...otherProps }: LinkProps) {
  return (
    <Link className="navbar-brand" href={href ?? ''} {...otherProps}>
      {children}
    </Link>
  );
}

export function NavItemList({ children, ...otherProps }: UlProps) {
  return (
    <ul className="nav navbar-nav pull-xs-right" {...otherProps}>
      {children}
    </ul>
  );
}

export function NavIcon({ iconName, ...otherProps }: NavIconProps) {
  return <i className={iconName} {...otherProps}></i>;
}

export function NavItem({ children, ...otherProps }: NavItemProps) {
  return (
    <li className="nav-item" {...otherProps}>
      {children}
    </li>
  );
}

export function NavLink({
  isActive = false,
  href = '',
  children,
  ...otherProps
}: NavLinkProps) {
  const className = isActive ? 'nav-link active' : 'nav-link';

  return (
    <Link className={className} {...otherProps} href={href}>
      {children}
    </Link>
  );
}

export function CategoryNav({ children, ...otherProps }: NavProps) {
  return (
    <nav className="nav nav-pills outline-active" {...otherProps}>
      {children}
    </nav>
  );
}

type NavIconProps = LinkProps & {
  iconName: 'ion-compose' | 'ion-gear-a';
};

export type NavLinkProps = LinkProps & {
  isActive?: boolean;
};
