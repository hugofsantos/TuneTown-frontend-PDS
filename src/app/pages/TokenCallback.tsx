import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { InitialPage } from "./InitialPage";

export const TokenCallback = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>();

  const getQueryParams = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("code");
  };

  useEffect(() => {
    const fetchTokens = async () => {
      const code = getQueryParams();

      const redirect_uri = "http://localhost:22223000/callback";
      const clientId = "3ac3788f57dc4ea3bccc70d37a4d8697";
      const clientSecret = "20d852123588428daef56b6c9d63431f";

      console.log("TokenCallback code:", code);
      if (!code) {
        console.error("Authorization code is missing");
        return;
      }

      try {
        const tokenResponse = await axios.post(
          "https://accounts.spotify.com/api/token",
          new URLSearchParams({
            code,
            redirect_uri,
            grant_type: "authorization_code",
          }).toString(),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: "Basic " + btoa(`${clientId}:${clientSecret}`),
            },
          },
        );

        console.log(tokenResponse.data);
        let accessToken = tokenResponse.data.access_token;
        let refreshToken = tokenResponse.data.refresh_token;
        // Use o token de acesso para obter informações do usuário
        const userResponse = await axios.get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        console.log(userResponse.data);
        setUserData({ ...userResponse.data, accessToken, refreshToken });
      } catch (error) {
        console.error("Error fetching tokens", error);
      }
    };

    fetchTokens();
  }, []);

  return (
    <div>
      {userData ? (
        <InitialPage
          form="signUp"
          avatarUrl={userData.images[1].url}
          name={userData.display_name}
          email={userData.email}
          username={userData.id}
          accessToken={userData.accessToken}
          refreshToken={userData.refreshToken}
        />
      ) : (
        <div>Processando...</div>
      )}
    </div>
  );
};
