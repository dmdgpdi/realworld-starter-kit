'use client';

import { usePathname } from 'next/navigation';
import type { NavLinkProps } from '@/shared/ui';
import { NavLink as NavLinkLayout } from '@/shared/ui';
import { isActiveLink } from '../header.lib';

export function NavLink({ href = '', children, ...otherProps }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = isActiveLink(href, pathname);

  return (
    <NavLinkLayout isActive={isActive} href={href} {...otherProps}>
      {children}
    </NavLinkLayout>
  );
}
