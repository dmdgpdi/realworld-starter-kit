import { commentApi } from '@/entities/comment';
import { CommentCard } from './CommentCard';

async function CommentList({ articleSlug }: CommentListProps) {
  const { comments } = await commentApi.getCommentList(articleSlug);

  return (
    <>
      {comments.map(comment => (
        <CommentCard
          key={comment.id}
          comment={comment}
          articleSlug={articleSlug}
        />
      ))}
    </>
  );
}

export { CommentList };

type CommentListProps = {
  articleSlug: string;
};
