import Link from 'next/link';
import { Tag } from '../tag.type';

function ArticleCategoryTag({ tag }: ArticleCategoryTagProps) {
  return (
    <Link href={`/${tag}/1`} className="tag-pill tag-default ">
      {tag}
    </Link>
  );
}

export { ArticleCategoryTag };

type ArticleCategoryTagProps = { tag: Tag };
