import { tagType } from '@/entities/tag';
import { ArticleCategoryTag } from '@/entities/tag/ui/ArticleCategoryTag';

async function ArticleSideBar({ tagList }: ArticleSideBarProps) {
  if (tagList.length === 0) {
    return undefined;
  }

  return (
    <div className="sidebar">
      <p>Popular Tags</p>

      <div className="tag-list">
        {tagList.map(tag => (
          <ArticleCategoryTag tag={tag} key={tag} />
        ))}
      </div>
    </div>
  );
}

export { ArticleSideBar };

type ArticleSideBarProps = {
  tagList: tagType.Tag[];
};
