import { PropsWithChildren, useEffect, useState } from "react";
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


export default function AuthProvider({
  children
}: AuthProviderProps) {

  const [user, setUser] = useState<UserWithProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [tokenSpotify, setTokenSpotify] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>("");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<any[]>([]);

  const httpClient = new AxiosAdapter();

  useEffect(() => {
    const token = localStorage.getItem("tunetown@token");
    const user = localStorage.getItem("tunetown@user");
    const profile = localStorage.getItem("tunetown@profile");

    //buscar user pelo token
    if (token && token !== "undefined") {
      httpClient.setHeaders({ Authorization: `Bearer ${token}` });
    }

    setUser(user ? JSON.parse(user) : null);
    setProfile(profile ? JSON.parse(profile) : null);

    console.log("AuthProvider mounted, user:", user, "token:", token);

    setLoading(false);
  }, []);


  async function handleRegister(data: UserRegister) {
    setLoading(true);

    // if (data.accessToken) {
    //   setTokenSpotify(data.accessToken);
    //   localStorage.setItem("tunetown@tokenSpotify", JSON.stringify(data.accessToken));
    // }

    const response = await signUpRequest(data);

    setLoading(false);
  }


  async function handleLogin({ login, password }: UserLogin) {
    setLoading(true)

    const data = await signInRequest({ login, password })

    localStorage.setItem("tunetown@token", data.accessToken);
    localStorage.setItem("tunetown@user", JSON.stringify(data.userDTO));

    httpClient.setHeaders({ Authorization: `Bearer ${data.accessToken}` });

    setUser(data.userDTO);

    if (!(data.userDTO.profileId === null)) {
      const profile = await findUserProfile(data.userDTO.profileId);
      localStorage.setItem("tunetown@profile", JSON.stringify(profile.data));
      setProfile(profile.data);
    } else { 
      const profileData = await createProfile(data.userDTO.id);
      localStorage.setItem("tunetown@profile", JSON.stringify(profileData.profile));
      setProfile(profileData.profile);
    }

    setLoading(false);
  }

  function handleLogout() {
    // setUser(null);
    // localStorage.removeItem("tunetown@token");
    // httpClient.setHeaders("");
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
        tokenSpotify,
        handleRegister,
        setPosts,
        posts
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
