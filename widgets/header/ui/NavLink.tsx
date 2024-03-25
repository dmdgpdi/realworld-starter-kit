'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const className = pathname == href ? 'nav-link active' : 'nav-link';

  return (
    <Link className={className} href={href ?? ''}>
      {children}
    </Link>
  );
}

type NavLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  isActive?: boolean;
};
