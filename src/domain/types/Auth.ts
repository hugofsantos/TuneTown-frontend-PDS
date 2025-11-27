import { UserWithProfile } from "./User";

export type AuthProvider = {
  isSignedIn?: boolean;
};

export type UserLogin = {
  login: string;
  password: string;
};

export type UserRegister = {
  username: string;
  email: string;
  password: string;
  name?: string;
  avatarUrl?: string;
  refreshToken?: string;
  accessToken?: string;
};

export type SignInResponse = {
  accessToken: string;
  userDTO: UserWithProfile & { profileId?: string | null };
};

export type RegisterResponse = {
  id: string;
  username: string;
  email: string;
};
