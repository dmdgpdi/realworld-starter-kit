'use client';

import { useEffect, useState } from 'react';
import { articleLib } from '@/entities/article';
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
import { authApi, authServerAction } from '@/entities/auth';
import { DeleteCommentIcon } from '@/features/comment/deleteComment';

function CommentCard({ articleSlug, comment }: CommentCardProps) {
  const { id, author, body, updatedAt } = comment;
  const [userIsAuthor, setUserIsAuthor] = useState(false);

  useEffect(() => {
    const checkUserIsAuthor = async () => {
      try {
        const token = await authServerAction.getAuthCookie();

        if (!token) {
          return;
        }

        const { user: userInformation } = await authApi.getUserInfor(token!);

        if (userInformation?.username === author.username) {
          setUserIsAuthor(true);
          return;
        }
      } catch (error) {
        setUserIsAuthor(false);
      }
    };

    checkUserIsAuthor();
  }, [author.username]);

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
        {userIsAuthor && (
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
