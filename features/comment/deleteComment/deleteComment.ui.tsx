'use client';

import { useAuth } from '@/entities/auth';
import { CommentDeleteSpan, commentApi } from '@/entities/comment';
import { toastContext } from '@/entities/toast';
import { ERROR_MESSAGE } from '@/shared/constant';
import { useShallow } from 'zustand/react/shallow';

function DeleteCommentIcon({ articleSlug, commentId }: DeleteCommentIconProps) {
  const { token } = useAuth();
  const createToast = toastContext.useToastStore(
    useShallow(state => state.createToast),
  );

  const deleteComment = async () => {
    if (!token) {
      createToast({ message: ERROR_MESSAGE.AUTH_REQUIRED });
      return;
    }

    await commentApi.deleteComment(articleSlug, commentId, token);
  };

  return <CommentDeleteSpan onClick={deleteComment} />;
}

export { DeleteCommentIcon };

type DeleteCommentIconProps = {
  articleSlug: string;
  commentId: number;
};
