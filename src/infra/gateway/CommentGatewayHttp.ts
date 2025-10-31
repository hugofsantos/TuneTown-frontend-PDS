import IHttpClient from "../http/IHttpClient";
import AxiosAdapter from "../http/AxiosAdapter";

export default class CommentGatewayHttp {
  httpClient: IHttpClient;
  url: string;

  constructor() {
    this.url = `${import.meta.env.VITE_API_URL}/comments`;
    this.httpClient = new AxiosAdapter();
  }

  async makeAComment(
    tuneetId: string,
    authorId: string,
    contentText: string,
  ): Promise<any> {
    try {
      return await this.httpClient.post(`${this.url}`, {
        authorId,
        tuneetId,
        contentText,
      });
    } catch (error: any) {
      console.error(`Error in makeAComment: ${error}`);
      throw new Error(error.response.data.message);
    }
  }

  async findTunetsComments(tuneetId: string): Promise<any> {
    try {
      return await this.httpClient.get(`${this.url}/tuneet/${tuneetId}`);
    } catch (error: any) {
      console.error(`Error in findTunetsComments: ${error}`);
      throw new Error(error.response.data.message);
    }
  }
}
