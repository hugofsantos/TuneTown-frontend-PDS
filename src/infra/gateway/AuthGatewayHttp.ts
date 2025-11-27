import {
  RegisterResponse,
  SignInResponse,
  UserLogin,
  UserRegister,
} from "@/domain/types/Auth";
import IHttpClient from "../http/IHttpClient";
import AxiosAdapter from "../http/AxiosAdapter";
import { buildApiUrl } from "../http/apiUrl";

export default class AuthGatewayHttp {
  httpClient: IHttpClient;
  url: string;

  constructor() {
    this.url = buildApiUrl("/auth");
    this.httpClient = new AxiosAdapter();
  }

  async signIn(data: UserLogin): Promise<SignInResponse> {
    try {
      const response = await this.httpClient.post<SignInResponse>(
        `${this.url}/login`,
        data,
      );
      return response;
    } catch (error: unknown) {
      console.error(`Error in signIn: ${error}`);
      throw new Error(
        (error as Error)?.message || "Erro ao realizar autenticação",
      );
    }
  }

  async signUp(data: UserRegister): Promise<RegisterResponse> {
    try {
      const response = await this.httpClient.post<RegisterResponse>(
        `${this.url}/register`,
        data,
      );
      return response;
    } catch (error: unknown) {
      throw new Error(
        (error as Error)?.message || "Erro ao criar usuário",
      );
    }
  }

}
