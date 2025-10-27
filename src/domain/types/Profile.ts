import { UserRegister } from "./Auth";
import { Tuneet } from "./Post";
import { UserEntity } from "./User";

export type Profile = {
  id: string;
  bio?: string | null;
  favoriteSong?: string | null;
  urlPhoto?: string | null;
  posts: Tuneet[] | null;
  followers: UserEntity[] | null;
  following: UserEntity[] | null;
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

export type EditConfig = UserRegister & {
};