/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import { UserWithProfile } from "../../../domain/types/User";
import { UserLogin, UserRegister } from "../../../domain/types/Auth";
import { Profile } from "@/domain/types/Profile";

type AuthContextType = {
  user: UserWithProfile | null;
  loading: boolean;
  profile?: Profile | null;
  setProfile: (value: Profile | null) => void;
  handleLogin: (data: UserLogin) => Promise<void>;
  handleRegister: (data: UserRegister) => Promise<void>;
  handleLogout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>({
  user: null,
  loading: true,
  profile: null,
  setProfile: () => {},
  handleLogin: async () => {},
  handleRegister: async () => {},
  handleLogout: () => {},
} as AuthContextType);

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("UseAuth must be used within a AuthProvider");
  }

  return context;
}
