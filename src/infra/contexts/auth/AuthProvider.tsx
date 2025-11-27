import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./UseAuth";
import AxiosAdapter from "../../http/AxiosAdapter";
import { UserWithProfile } from "../../../domain/types/User";
import { signInRequest } from "../../../app/services/auth/signInRequest";
import { UserLogin, UserRegister } from "../../../domain/types/Auth";
import { signUpRequest } from "../../../app/services/auth/signUpRequest";
import { Profile } from "@/domain/types/Profile";
import { findUserProfile } from "@/app/services/auth/findUserProfile";
import { createProfile } from "@/app/services/auth/createProfile";

type AuthProviderProps = PropsWithChildren & {
  isSignedIn?: boolean;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserWithProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);

  const httpClient = useMemo(() => new AxiosAdapter(), []);

  useEffect(() => {
    const token = localStorage.getItem("tunetown@token");
    const user = localStorage.getItem("tunetown@user");
    const profile = localStorage.getItem("tunetown@profile");

    //buscar user pelo token
    if (token && token !== "undefined") {
      httpClient.setHeaders({ Authorization: `Bearer ${token}` });
    }

    const parsedUser = user ? JSON.parse(user) : null;
    const parsedProfile = profile ? JSON.parse(profile) : null;
    const normalizedProfile = parsedProfile
      ? { ...parsedProfile, photoUrl: parsedProfile.photoUrl ?? parsedProfile.urlPhoto }
      : null;

    if (parsedUser) {
      setUser(parsedUser);
    }
    if (normalizedProfile) {
      setProfile(normalizedProfile);
      setLoading(false);
      return;
    }

    // Fallback: if we have a token and user but no stored profile, try fetching/creating once
    const bootstrapProfile = async () => {
      if (token && parsedUser) {
        try {
          if (parsedUser.profileId) {
            const fetched = await findUserProfile(parsedUser.profileId);
            if (fetched) {
              setProfile(fetched);
              localStorage.setItem("tunetown@profile", JSON.stringify(fetched));
            }
          }
        } catch (error) {
          console.error("Erro ao recuperar perfil:", error);
        }
      }
      setLoading(false);
    };

    bootstrapProfile();
  }, [httpClient]);

  async function handleRegister(data: UserRegister) {
    setLoading(true);
    try {
      await signUpRequest(data);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin({ login, password }: UserLogin) {
    setLoading(true);

    try {
      const data = await signInRequest({ login, password });

      if (!data) {
        setLoading(false);
        return;
      }

      localStorage.setItem("tunetown@token", data.accessToken);
      localStorage.setItem("tunetown@user", JSON.stringify(data.userDTO));

      httpClient.setHeaders({ Authorization: `Bearer ${data.accessToken}` });

      setUser(data.userDTO);

      if (data.userDTO.profileId) {
        const profile = await findUserProfile(data.userDTO.profileId);
        if (profile) {
          localStorage.setItem("tunetown@profile", JSON.stringify(profile));
          setProfile(profile);
        }
      } else {
        const profileData = await createProfile(data.userDTO.id);
        if (profileData) {
          localStorage.setItem("tunetown@profile", JSON.stringify(profileData));
          setProfile(profileData);
        }
      }
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    setUser(null);
    setProfile(null);
    localStorage.removeItem("tunetown@token");
    localStorage.removeItem("tunetown@user");
    localStorage.removeItem("tunetown@profile");
    httpClient.setHeaders(null);
  }

  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        profile,
        setProfile,
        handleLogin,
        handleLogout,
        handleRegister,
      }}
    >
      {loading ? (
        <div className="w-screen h-screen flex items-center justify-center bg-base text-contrast">
          Carregando...
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
