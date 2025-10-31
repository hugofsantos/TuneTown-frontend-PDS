import { User } from "./User";

export type Comment = {
  content: string;
  postId: number;
  authorId: User;
};

export type CommentEntity = Comment & {
  id: string;
  authorId: User;
  createdAt: string;
};
