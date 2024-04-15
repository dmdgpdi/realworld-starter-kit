'use client';

import { authLib } from '@/entities/auth';
import { tagType } from '@/entities/tag';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

function ArticleCategory() {
  const [hasToken, setHasToken] = useState(false);
  const { tag, feed } = useParams<{ tag: tagType.Tag; feed: string }>();

  const globalFeedClassName = tag || feed ? 'nav-link' : 'nav-link active';

  useEffect(() => {
    const token = authLib.getClientAuthCookie();

    if (token) {
      setHasToken(true);
      return;
    }

    setHasToken(false);
  }, []);

  return (
    <div className="feed-toggle">
      <nav className="nav nav-pills outline-active">
        {hasToken && (
          <li className="nav-item">
            <Link className="nav-link" href="/">
              Your Feed
            </Link>
          </li>
        )}
        <li className="nav-item">
          <Link className={globalFeedClassName} href="/">
            Global Feed
          </Link>
        </li>
        {tag && (
          <li className="nav-item">
            <Link className="nav-link active" href="">
              # {tag}
            </Link>
          </li>
        )}
      </nav>
    </div>
  );
}

export { ArticleCategory };
