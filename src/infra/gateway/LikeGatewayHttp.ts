
import IHttpClient from "../http/IHttpClient";
import AxiosAdapter from "../http/AxiosAdapter";

export default class LikeGatewayHttp {
    httpClient: IHttpClient;
    url: string;

    constructor() {
        this.url = `${import.meta.env.VITE_API_URL}/likes`;
        this.httpClient = new AxiosAdapter();
    }

    async likeATuneet(tuneetId: string, profileId: string): Promise<any> {
        try {
            return await this.httpClient.post(`${this.url}`, { profileId, tuneetId });
        } catch (error: any) {
            console.error(`Error in likeATuneet: ${error}`);
            throw new Error(error.response.data.message);
        }
    }

    async findTunetsInfos(tuneetId: string): Promise<any> {
        try {
            return await this.httpClient.get(`${this.url}/tuneet/${tuneetId}`);
        } catch (error: any) {
            console.error(`Error in findTunetsInfos: ${error}`);
            throw new Error(error.response.data.message);
        }
    }
}

