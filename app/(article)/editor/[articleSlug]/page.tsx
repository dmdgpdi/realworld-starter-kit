import { redirect } from 'next/navigation';
import { RowLayout, ContainerPageLayout } from '@/shared/ui';
import { articleApi } from '@/entities/article';
import {
  AuthorGuard,
  EditorPageLayout,
  authServerAction,
} from '@/entities/auth';
import { UpdateArticleForm } from '@/features/article';

export default async function UpdateArticlePage({
  params,
}: UpdateArticlePageProps) {
  const { articleSlug } = params;
  const { createHashString } = authServerAction;
  let article;

  try {
    const { article: articleResponse } =
      await articleApi.getArticle(articleSlug);
    article = articleResponse;
  } catch (e) {
    redirect('/');
  }

  const hashString = await createHashString(article.slug);

  return (
    <AuthorGuard authorUserName={article.author.username}>
      <EditorPageLayout>
        <ContainerPageLayout>
          <RowLayout>
            <UpdateArticleForm article={article} hashValue={hashString} />
          </RowLayout>
        </ContainerPageLayout>
      </EditorPageLayout>
    </AuthorGuard>
  );
}

type UpdateArticlePageProps = {
  params: { articleSlug: string };
};
