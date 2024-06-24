import { tagType, ArticleCategoryTag } from '@/entities/tag';

import { TagListLayout } from '@/entities/tag';

async function ArticleSideBar({ tagList }: ArticleSideBarProps) {
  if (tagList.length === 0) {
    return undefined;
  }

  return (
    <div className="sidebar">
      <p>Popular Tags</p>

      <TagListLayout>
        {tagList.map(tag => (
          <ArticleCategoryTag tag={tag} key={tag} data-cy={`tag-link-${tag}`} />
        ))}
      </TagListLayout>
    </div>
  );
}

export { ArticleSideBar };

type ArticleSideBarProps = {
  tagList: tagType.Tag[];
};
