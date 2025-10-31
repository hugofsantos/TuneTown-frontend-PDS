import { User } from "./User";

export type Like = {
  postId: number;
  authorId: User;
};

export type LikeEntity = Like & {
  id: string;
  authorId: User;
  createdAt: string;
};
