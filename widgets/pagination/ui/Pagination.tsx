import { ArticleConstant } from '@/entities/article';
import { appendHref } from '@/shared/lib';
import Link from 'next/link';

function PaginationItem({ href, page, isActive }: PaginationItemProps) {
  const className = isActive === true ? 'page-item active' : 'page-item';

  return (
    <li className={className}>
      <Link className="page-link" href={appendHref(href, page)}>
        {page}
      </Link>
    </li>
  );
}

export function Pagination({
  href,
  currentPage,
  articlesCount,
}: PaginationProps) {
  const hasNextPage = ArticleConstant.ARTICLES_PER_PAGE <= articlesCount;

  return (
    <ul className="pagination">
      {currentPage !== 1 && (
        <PaginationItem href={href} page={currentPage - 1} />
      )}
      <PaginationItem href={href} page={currentPage} isActive={true} />
      {hasNextPage && <PaginationItem href={href} page={currentPage + 1} />}
    </ul>
  );
}

type PaginationProps = {
  href: string;
  currentPage: number;
  articlesCount: number;
};

type PaginationItemProps = {
  href: string;
  page: number;
  isActive?: boolean;
};
