'use client';

import { useAuth } from '@/entities/auth';
import { tagType } from '@/entities/tag';
import Link from 'next/link';
import { useParams } from 'next/navigation';

function ArticleCategory() {
  const { isLoggedIn } = useAuth();
  const { tag, feed } = useParams<{ tag: tagType.Tag; feed: string }>();

  const globalFeedClassName = tag || feed ? 'nav-link' : 'nav-link active';

  return (
    <div className="feed-toggle">
      <nav className="nav nav-pills outline-active">
        {isLoggedIn && (
          <li className="nav-item">
            <Link className="nav-link active" href="">
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
