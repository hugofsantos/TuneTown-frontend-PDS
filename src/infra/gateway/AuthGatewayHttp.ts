import { UserLogin, UserRegister, userSpotifyToken } from "@/domain/types/Auth";
import IHttpClient from "../http/IHttpClient";
import AxiosAdapter from "../http/AxiosAdapter";

export default class AuthGatewayHttp {
  httpClient: IHttpClient;
  url: string;

  constructor() {
    this.url = `${import.meta.env.VITE_API_URL}/auth`;
    console.log("AuthGatewayHttp URL:", this.url);
    this.httpClient = new AxiosAdapter();
  }

  async signIn(data: UserLogin): Promise<any> {
    try {
      console.log("AuthGatewayHttp signIn data:", data);
      console.log("AuthGatewayHttp URL in signIn:", this.url);
      console.log("headers enviados:", this.httpClient);

      const response = await this.httpClient.post(`${this.url}/login`, data);
      console.log("signIn response:", response);
      return response;
    } catch (error: any) {
      console.error(`Error in signIn: ${error}`);
      throw new Error(error.response.data.message);
    }
  }

  async signUp(data: UserRegister): Promise<any> {
    try {
      const response = await this.httpClient.post(`${this.url}/register`, data);
      return response;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }


  async storeTokenSpotify({ refreshToken, accessToken, userId }: userSpotifyToken): Promise<any> {
    try {
      console.log("storeTokenSpotify gateway", refreshToken, accessToken, userId);
      const response = await this.httpClient.post(`${this.url}/spotifyTokens`, { refreshToken, accessToken, userId });
      console.log(response)
      return response;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }
}