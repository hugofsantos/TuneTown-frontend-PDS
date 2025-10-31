import { Profile } from "./Profile";

export type User = {
  id?: string;
  email: string;
  username: string | null;
};

export type UserWithProfile = User & {
  id: string;
  profile: Profile;
};

export type Profile = {
  id: string;
  bio: string | null;
  favoriteSong: string | null;
  followingCount: number;
  followersCount: number;
  userId: string;
  avatarUrl: string | null;
};

export type UserEntity = User & {
  id: string;

  profileId: number;
  createdAt: string;
};
