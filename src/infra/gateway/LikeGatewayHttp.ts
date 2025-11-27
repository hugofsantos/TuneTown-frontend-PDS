import IHttpClient from "../http/IHttpClient";
import AxiosAdapter from "../http/AxiosAdapter";
import { buildApiUrl } from "../http/apiUrl";

export default class LikeGatewayHttp {
  httpClient: IHttpClient;
  url: string;

  constructor() {
    this.url = buildApiUrl("/likes");
    this.httpClient = new AxiosAdapter();
  }

  async likeATuneet(tuneetId: string, profileId: string): Promise<unknown> {
    try {
      const response = await this.httpClient.post(`${this.url}`, {
        profileId,
        tuneetId,
      });
      return (response as { data?: unknown }).data ?? response;
    } catch (error: unknown) {
      console.error(`Error in likeATuneet: ${error}`);
      throw new Error((error as Error)?.message || "Erro ao curtir Tuneet");
    }
  }

  async findTunetsInfos(tuneetId: string): Promise<unknown> {
    try {
      return await this.httpClient.get(`${this.url}/tuneet/${tuneetId}`);
    } catch (error: unknown) {
      console.error(`Error in findTunetsInfos: ${error}`);
      throw new Error((error as Error)?.message || "Erro ao buscar info");
    }
  }
}
