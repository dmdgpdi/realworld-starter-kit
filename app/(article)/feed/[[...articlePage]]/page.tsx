import { redirect } from 'next/navigation';
import { ContentPageLayout } from '@/shared/ui';
import {
  articleApi,
  articleLib,
  ArticleConstant,
  ArticlePageLayout,
  MainContent,
  SideContent,
  ArticleBanner,
} from '@/entities/article';
import { tagApi } from '@/entities/tag';
import {
  Pagination,
  ArticleCategory,
  ArticleList,
  ArticleSideBar,
} from '@/widgets';
import { authServerAction } from '@/entities/auth';

export default async function ArticleFeedPage({
  params,
}: ArticleFeedPageProps) {
  const currentPage = articleLib.getCorrectPage(params.articlePage);
  const token = await authServerAction.getAuthCookie();

  if (!token) {
    redirect('/');
  }

  const { articles: articleList, articlesCount } = await articleApi.getFeedList(
    {
      offset: currentPage,
      limit: ArticleConstant.ARTICLES_PER_PAGE,
    },
    token,
  );

  const { tags: tagList } = await tagApi.getTagList();

  return (
    <ArticlePageLayout>
      <ArticleBanner />
      <ContentPageLayout>
        <MainContent>
          <ArticleCategory />
          <ArticleList articleList={articleList} />
          <Pagination
            href=""
            currentPage={currentPage}
            articlesCount={articlesCount}
          />
        </MainContent>

        <SideContent>
          <ArticleSideBar tagList={tagList} />
        </SideContent>
      </ContentPageLayout>
    </ArticlePageLayout>
  );
}
type ArticleFeedPageProps = {
  params: { articlePage: string };
};
