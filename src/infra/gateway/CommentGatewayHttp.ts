import IHttpClient from "../http/IHttpClient";
import AxiosAdapter from "../http/AxiosAdapter";
import { AxiosError } from "axios";
import { buildApiUrl } from "../http/apiUrl";

export default class CommentGatewayHttp {
  httpClient: IHttpClient;
  url: string;

  constructor() {
    this.url = buildApiUrl("/comments");
    this.httpClient = new AxiosAdapter();
  }

  async makeAComment(
    tuneetId: string,
    authorId: string,
    contentText: string,
  ): Promise<unknown> {
    try {
      return await this.httpClient.post(`${this.url}`, {
        authorId,
        tuneetId,
        contentText,
      });
    } catch (error: unknown) {
      console.error(`Error in makeAComment: ${error}`);
      throw new Error((error as Error)?.message || "Erro ao comentar");
    }
  }

  async findTunetsComments(tuneetId: string): Promise<unknown> {
    try {
      return await this.httpClient.get(`${this.url}/tuneet/${tuneetId}`);
    } catch (error: unknown) {
      const axiosErr = error as AxiosError;
      if (axiosErr?.response?.status === 404) {
        // Sem comentários é um caso esperado
        return { content: [] };
      }
      console.error(`Error in findTunetsComments: ${error}`);
      throw new Error((error as Error)?.message || "Erro ao buscar comentários");
    }
  }
}
