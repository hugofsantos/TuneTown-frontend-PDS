import { User } from "@/domain/types/User";
import AxiosAdapter from "../http/AxiosAdapter";
import IHttpClient from "../http/IHttpClient";
import { PageMetadados } from "@/domain/types/Post";

export default class TuneetGatewayHttp {
  httpClient: IHttpClient;
  url: string;

  constructor() {
    this.url = `${import.meta.env.VITE_API_URL}/tuneet`;
    this.httpClient = new AxiosAdapter();
  }

    async findByTitle(word: string, itemType: string): Promise<any> {
    const params = new URLSearchParams({
        query: word,
        itemType: itemType
    }).toString();

    const response = await this.httpClient.get(`${this.url}/search-tunable-item?${params}`);
    return response;
    }

   async findTuneetsByUserId(userId: string, metadados: PageMetadados): Promise<any> {
    let params = "";

    if (metadados.currentPage || metadados.pageSize) {
          params = new URLSearchParams({
      page: metadados.currentPage.toString(),
      size: metadados.pageSize.toString()
    }).toString();
    } 

    console.log("Fetching tuneets with params:", params);

   return await this.httpClient.get(`${this.url}/author/${userId}?${params}`);
  }

  async findTuneetById(tuneetId: string): Promise<any> {
    try {
      return await this.httpClient.get(`${this.url}/${tuneetId}`);
    } catch (error: any) {
      console.error(`Error in findTuneetById: ${error}`);
      throw new Error(error.response.data.message);
    }
  }

  async makeATuneet(textContent: string, itemId: string | undefined, itemType: "music" | "album" | "podcast"): Promise<any> {
    try {
      return await this.httpClient.post(`${this.url}`, { textContent, itemId, itemType: itemType.toUpperCase() });
    } catch (error: any) {
      console.error(`Error in makeATuneet: ${error}`);
      throw new Error(error.response.data.message);
    }
  }

  async findTrendingTracks(): Promise<any> {
    try {
      return await this.httpClient.get(`${this.url}/trending`);
    } catch (error: any) {
      console.error(`Error in findTrendingTracks: ${error}`);
      throw new Error(error.response.data.message);
    }
  }

 
}