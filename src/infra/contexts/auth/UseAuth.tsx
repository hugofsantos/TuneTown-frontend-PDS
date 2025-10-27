import { createContext, useContext } from "react";
import { UserWithProfile } from "../../../domain/types/User";
import { UserLogin, UserRegister, userSpotifyToken } from "../../../domain/types/Auth";
import { Profile } from "@/domain/types/Profile";
import { Tuneet } from "@/domain/types/Post";

type AuthContextType = {
  user: UserWithProfile | null;
  posts: Tuneet[];
  loading: boolean;
  profile?: Profile | null;
  setProfile: (value: Profile | null) => void;
  handleLogin: (data: UserLogin) => Promise<void>;
  handleRegister: (data: UserRegister) => Promise<void>;
  handleLogout: () => void;
  setPosts: (posts: any[]) => void;
  tokenSpotify: string | null;
};

export const AuthContext = createContext<AuthContextType | undefined>({
  user: null,
  loading: true,
  tokenSpotify: null,
  profile: null,
  setProfile: () => {},
  handleLogin: async () => {},
  handleRegister: async () => {},
  handleLogout: () => {},
  setPosts: () => {},
  posts: [],
} as AuthContextType);

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("UseAuth must be used within a AuthProvider");
  }

  return context;
}
