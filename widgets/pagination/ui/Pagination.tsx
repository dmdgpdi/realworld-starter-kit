import Link from 'next/link';
import { appendHref } from '@/shared/lib';
import { ArticleConstant } from '@/entities/article';

function PaginationItem({
  href,
  page,
  isActive,
  ...otherProps
}: PaginationItemProps) {
  const className = isActive === true ? 'page-item active' : 'page-item';

  return (
    <li className={className} {...otherProps}>
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
  const hasNextPage =
    ArticleConstant.ARTICLES_PER_PAGE * currentPage <= articlesCount;
  const totalPage = articlesCount / ArticleConstant.ARTICLES_PER_PAGE + 1;

  return (
    <ul className="pagination">
      {2 < currentPage && <PaginationItem href={href} page={currentPage - 2} />}
      {currentPage !== 1 && (
        <PaginationItem
          href={href}
          page={currentPage - 1}
          data-cy="previous-page"
        />
      )}
      <PaginationItem
        href={href}
        page={currentPage}
        isActive={true}
        data-cy="current-page"
      />
      {hasNextPage && (
        <PaginationItem
          href={href}
          page={currentPage + 1}
          data-cy="next-page"
        />
      )}
      {currentPage + 2 <= totalPage && (
        <PaginationItem href={href} page={currentPage + 2} />
      )}
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
