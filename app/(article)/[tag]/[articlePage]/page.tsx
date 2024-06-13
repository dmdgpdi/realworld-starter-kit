import { redirect } from 'next/navigation';
import { ContentPageLayout } from '@/shared/ui';
import {
  ArticleConstant,
  ArticleListPageLayout,
  MainContent,
  SideContent,
  articleApi,
  ArticleBanner,
  articleLib,
} from '@/entities/article';
import { tagApi } from '@/entities/tag';
import { Tag } from '@/entities/tag/tag.type';
import {
  Pagination,
  ArticleCategory,
  ArticleList,
  ArticleSideBar,
} from '@/widgets';

export default async function ArticleTagPage({ params }: ArticleTagPageProps) {
  const currentPage = articleLib.getCorrectPage(params.articlePage);
  const offset = currentPage - 1;
  const tag = params.tag;

  const [articleResponse, tagResponse] = await Promise.all([
    articleApi.getArticleList({
      tag,
      offset: offset * ArticleConstant.ARTICLES_PER_PAGE,
      limit: ArticleConstant.ARTICLES_PER_PAGE,
    }),
    tagApi.getTagList(),
  ]);
  const { articles: articleList, articlesCount } = articleResponse;
  const { tags: tagList } = tagResponse;

  if (
    !tagList.includes(tag) ||
    articlesCount < ArticleConstant.ARTICLES_PER_PAGE * offset
  ) {
    redirect('/');
  }

  return (
    <ArticleListPageLayout>
      <ArticleBanner />

      <ContentPageLayout>
        <MainContent>
          <ArticleCategory />
          <ArticleList articleList={articleList} />
          <Pagination
            href={`/${tag}`}
            currentPage={currentPage}
            articlesCount={articlesCount}
          />
        </MainContent>

        <SideContent>
          <ArticleSideBar tagList={tagList} />
        </SideContent>
      </ContentPageLayout>
    </ArticleListPageLayout>
  );
}

type ArticleTagPageProps = {
  params: { articlePage: string; tag: Tag };
};
