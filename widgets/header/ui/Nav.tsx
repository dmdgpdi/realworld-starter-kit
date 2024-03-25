import Link from 'next/link';

export function Nav({ children }: NavProps) {
  return (
    <nav className="navbar navbar-light">
      <div className="container">{children}</div>
    </nav>
  );
}

export function NavIconLink({ href, children }: NavIconLinkProps) {
  return (
    <Link className="navbar-brand" href={href ?? ''}>
      {children}
    </Link>
  );
}

export function NavItemList({ children }: NavItemListProps) {
  return <ul className="nav navbar-nav pull-xs-right">{children}</ul>;
}

export function NavItem({ children }: NavItemProps) {
  return <li className="nav-item">{children}</li>;
}

export function NavIcon({ iconName }: NavIconProps) {
  return <i className={iconName}></i>;
}

type NavProps = React.HTMLAttributes<HTMLElement>;
type NavIconLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;
type NavItemListProps = React.HTMLAttributes<HTMLUListElement>;
type NavItemProps = React.LiHTMLAttributes<HTMLLIElement>;

type NavIconProps = React.HTMLAttributes<HTMLElement> & {
  iconName: 'ion-compose' | 'ion-gear-a';
};
