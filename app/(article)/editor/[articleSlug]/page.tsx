import { redirect } from 'next/navigation';
import { RowLayout, ContainerPageLayout } from '@/shared/ui';
import { articleApi } from '@/entities/article';
import { AuthorGuard, EditorPageLayout } from '@/entities/auth';
import { validationServerAction } from '@/entities/validation';
import { UpdateArticleForm } from '@/features/article';

export default async function UpdateArticlePage({
  params,
}: UpdateArticlePageProps) {
  const { articleSlug } = params;
  const { createHashString } = validationServerAction;
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
