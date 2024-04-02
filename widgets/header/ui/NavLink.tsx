'use client';

import { isActiveLink } from '../header.lib';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();

  const className = isActiveLink(href, pathname)
    ? 'nav-link active'
    : 'nav-link';

  return (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
}

type NavLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  isActive?: boolean;
};
