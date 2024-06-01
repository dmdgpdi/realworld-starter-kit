import { Author } from '@/shared/api';

type Comment = {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: Author;
};

type CommentListResponse = {
  comments: Comment[];
};

type CommentResponse = {
  comment: Comment;
};

type CommentFormState = {
  articleSlug: string;
  isSuccess: boolean;
  errorList: string[];
};

export type { CommentListResponse, Comment, CommentResponse, CommentFormState };
