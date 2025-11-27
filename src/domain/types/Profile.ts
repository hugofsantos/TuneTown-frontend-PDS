import { UserRegister } from "./Auth";
import { UserEntity } from "./User";

export type Profile = {
  id: string;
  userId?: string;
  username?: string;
  bio?: string | null;
  favoriteSong?: string | null;
  photoUrl?: string | null;
  followers?: UserEntity[] | null;
  following?: UserEntity[] | null;
  totalFollowers?: number;
  totalFollowing?: number;
  followersCount?: number;
  followingCount?: number;
  photo?: Photo;
};

export type Photo = {
  id: string;
  url: string;
};

export type ProfileEntity = Profile & {
  id: number;
  lastLoginAt: string;
  createdAt: string;
  updatedAt: string;
};

export type EditProfile = UserRegister & {
  bio?: string | null;
  favoriteSong?: string;
};

export type EditConfig = UserRegister & Record<string, never>;
