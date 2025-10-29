import { Profile } from "@/domain/types/Profile";
import { User } from "@/domain/types/User";
import AxiosAdapter from "../http/AxiosAdapter";
import IHttpClient from "../http/IHttpClient";
import AuthGatewayHttp from "./AuthGatewayHttp";

export default class UserGatewayHttp {
  httpClient: IHttpClient;
  url: string;

  constructor() {
    this.url = `${import.meta.env.VITE_API_URL}`;
    this.httpClient = new AxiosAdapter();
  }

  async getUsers(): Promise<User[]> {
    const response = await this.httpClient.get(`${this.url}/user/`);
    return response.data;
  }

  async getProfileByUserId(id: string): Promise<Profile> {
    const response = await this.httpClient.get(`${this.url}/profile/${id}`);
    return response.data;
  }

  async getProfileByUsername(username: string): Promise<Profile> {
    const response = await this.httpClient.get(
      `${this.url}/profile/getByUsername/${username}`
    );
    return response.data;
  }

  async findUserProfile(id: string): Promise<any> {
    try {
      const response = await this.httpClient.get(`${this.url}/profile/${id}`);
      return response;
    } catch (error: any) {
      console.error(`Error in findUserProfile: ${error}`);
      throw new Error(error.response.data.message);
    }
  }

  async createProfile(userId: string): Promise<any> {
    try {
      const response = await this.httpClient.post(`${this.url}/profile`, {
        userId,
      });
      return response;
    } catch (error: any) {
      console.error(`Error in createProfile: ${error}`);
      throw new Error(error.response.data.message);
    }
  }

  async uploadPhoto(profileId: string, formData: FormData): Promise<any> {
    try {
      const response = await this.httpClient.post(
        `${this.url}/profile/${profileId}/photo`,
        formData
      );
      // response já é o data correto
      return response;
    } catch (error: any) {
      console.error(`Error in uploadPhoto: ${error}`);
      throw new Error(error.response?.data?.message || "Erro ao enviar foto");
    }
  }

  async updateUser(userData: any): Promise<any> {
    const response = await this.httpClient.put(`${this.url}/user/`, userData);
    return response.data;
  }

  async getTuneScore(userId1: string, userId2: string): Promise<any> {
    try {
      const response = await this.httpClient.get(
        `${this.url}/tunescore/${userId1}/${userId2}`
      );
      return response;
    } catch (error: any) {
      console.error(`Error in getTuneScore: ${error}`);
      throw new Error(
        error.response?.data?.message || "Erro ao buscar TuneScore"
      );
    }
  }
}
