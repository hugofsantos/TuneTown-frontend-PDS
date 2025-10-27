import { Profile } from "./Profile";

export type User = {
  email: string;
  name: string;
  username: string | null;

};

export type UserWithProfile = User & {
  id: string;
  username: string;
  email: string;
  profileId: string;
}

export type UserEntity = User & {
  id: string;

  profileId: number;
  createdAt: string;
};
