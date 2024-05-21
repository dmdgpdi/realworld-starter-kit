'use client';

import { articleLib } from '@/entities/article';
import { useAuth } from '@/entities/auth';
import {
  CommentAuthorImage,
  CommentAuthorLink,
  CommentCardBlock,
  CommentCardFooter,
  CommentCardLayout,
  CommentDateSpan,
  CommentText,
  commentType,
} from '@/entities/comment';
import { DeleteCommentIcon } from '@/features/comment/deleteComment';

function CommentCard({ articleSlug, comment }: CommentCardProps) {
  const { id, author, body, updatedAt } = comment;
  const { userInformation } = useAuth();
  const isAuthorEqualUser = author.username === userInformation?.username;

  return (
    <CommentCardLayout>
      <CommentCardBlock>
        <CommentText>{body}</CommentText>
      </CommentCardBlock>
      <CommentCardFooter>
        <CommentAuthorLink href={`/profile/${author.username}`}>
          <CommentAuthorImage
            src={author.image}
            alt={"comment author's image"}
          />
        </CommentAuthorLink>
        &nbsp;
        <CommentAuthorLink href={`/profile/${author.username}`}>
          {author.username}
        </CommentAuthorLink>
        <CommentDateSpan>{articleLib.formatDate(updatedAt)}</CommentDateSpan>
        {isAuthorEqualUser && (
          <DeleteCommentIcon articleSlug={articleSlug} commentId={id} />
        )}
      </CommentCardFooter>
    </CommentCardLayout>
  );
}

export { CommentCard };

type CommentCardProps = {
  comment: commentType.Comment;
  articleSlug: string;
};
