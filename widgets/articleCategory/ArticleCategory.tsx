'use client';

import { useState, useEffect } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { NavItem, NavLink, FeedToggleLayout, CategoryNav } from '@/shared/ui';
import { authLib } from '@/entities/auth';
import { tagType } from '@/entities/tag';

function ArticleCategory() {
  const [hasToken, setHasToken] = useState(false);
  const { tag } = useParams<{ tag: tagType.Tag; feed: string }>();
  const pathname = usePathname();
  const urlIsFeed = pathname.includes('feed');
  const urlIsGlobalFeed = !tag && !urlIsFeed;

  useEffect(() => {
    const token = authLib.getClientAuthCookie();

    if (token) {
      setHasToken(true);
      return;
    }

    setHasToken(false);
  }, []);

  return (
    <FeedToggleLayout>
      <CategoryNav>
        {hasToken && (
          <NavItem>
            <NavLink isActive={urlIsFeed} href="/feed">
              Your Feed
            </NavLink>
          </NavItem>
        )}
        <NavItem>
          <NavLink isActive={urlIsGlobalFeed} href="/">
            Global Feed
          </NavLink>
        </NavItem>
        {tag && (
          <NavItem>
            <NavLink isActive={true}># {tag}</NavLink>
          </NavItem>
        )}
      </CategoryNav>
    </FeedToggleLayout>
  );
}

export { ArticleCategory };
