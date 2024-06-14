import Link from 'next/link';
import { Tag } from '../tag.type';

function ArticleCategoryTag({ tag, ...otherProps }: ArticleCategoryTagProps) {
  return (
    <Link href={`/${tag}/1`} className="tag-pill tag-default" {...otherProps}>
      {tag}
    </Link>
  );
}

export { ArticleCategoryTag };

type ArticleCategoryTagProps = { tag: Tag };
