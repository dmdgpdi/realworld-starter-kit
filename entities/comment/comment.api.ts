'use server';

import { BASE_URL, API, checkError } from '@/shared/api';
import { CommentListResponse, CommentResponse } from './comment.type';
import { revalidatePath } from 'next/cache';

const getCommentList = async (
  articleSlug: string,
): Promise<CommentListResponse> => {
  const url = `${BASE_URL}/${API.ARTICLES}/${articleSlug}/${API.COMMENTS}`;

  const res = await fetch(url);

  checkError(res);

  return res.json();
};

const postComment = async (
  articleSlug: string,
  comment: string,
  token: string,
): Promise<CommentResponse> => {
  const url = `
  ${BASE_URL}/${API.ARTICLES}/${articleSlug}/${API.COMMENTS}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      comment: {
        body: comment,
      },
    }),
  });

  checkError(res);

  return res.json();
};

const deleteComment = async (
  articleSlug: string,
  commentId: number,
  token: string,
) => {
  const url = `${BASE_URL}/${API.ARTICLES}/${articleSlug}/${API.COMMENTS}/${commentId}`;

  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });

  revalidatePath(`${BASE_URL}/${API.ARTICLES}/${articleSlug}`);
  checkError(res);
};

export { getCommentList, postComment, deleteComment };
