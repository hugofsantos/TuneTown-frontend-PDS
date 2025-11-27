import { Profile } from "./Profile";

export type User = {
  id: string;
  email: string;
  username: string;
  profileId?: string | null;
  createdAt?: string;
};

export type UserWithProfile = User & {
  profile?: Profile | null;
};

export type UserEntity = {
  id: string;
  email: string;
  username: string;
  profileId?: string | null;
  createdAt?: string;
};
