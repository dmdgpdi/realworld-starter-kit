import { ContentPageLayout } from '@/shared/ui';
import {
  articleApi,
  ArticleConstant,
  ArticlePageLayout,
  MainContent,
  SideContent,
} from '@/entities/article';
import { tagApi } from '@/entities/tag';
import {
  ArticleBanner,
  ArticleCategory,
  ArticleList,
  ArticleSideBar,
} from '@/features/article';
import { Pagination } from '@/widgets/pagination';
import { authServerAction } from '@/entities/auth';
import { redirect } from 'next/navigation';

export default async function ArticleFeedPage({
  params,
}: ArticleFeedPageProps) {
  const articlePage = parseInt(params.articlePage, 10);
  const currentPage = Number.isNaN(articlePage) ? 1 : articlePage;
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
