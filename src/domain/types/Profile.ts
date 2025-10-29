import { UserRegister } from "./Auth";
import { UserEntity } from "./User";

export type Profile = {
  id: string;
  bio?: string | null;
  favoriteSong?: string | null;
  urlPhoto?: string | null;
  // posts: Tuneet[] | null;
  followers: UserEntity[] | null;
  following: UserEntity[] | null;
  totalFollowers: number;
  totalFollowing: number;
  photo: Photo;
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
  // password: null;
};

export type EditConfig = UserRegister & {};
