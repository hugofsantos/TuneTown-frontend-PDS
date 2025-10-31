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
  // name: string;
  // email: string;
  // avatarUrl?: string;
  // refreshToken?: string;
  // accessToken?: string;
};

export type userSpotifyToken = {
  userId: string;
  accessToken: string;
  refreshToken: string;
};
