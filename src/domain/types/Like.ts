import { User } from "./User";

export type Like = {
  postId: string;
  authorId: User;
};

export type LikeEntity = Like & {
  id: string;
  authorId: User;
  createdAt: string;
};
