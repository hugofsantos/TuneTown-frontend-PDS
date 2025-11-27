import { Profile } from "@/domain/types/Profile";
import { User, UserWithProfile } from "@/domain/types/User";
import AxiosAdapter from "../http/AxiosAdapter";
import IHttpClient from "../http/IHttpClient";
import { buildApiUrl } from "../http/apiUrl";

export default class UserGatewayHttp {
  httpClient: IHttpClient;
  url: string;
  private readonly emptyProfile: Profile | null = null;

  constructor() {
    this.url = buildApiUrl("");
    this.httpClient = new AxiosAdapter();
  }

  private normalizeProfile(profile: unknown): Profile {
    if (!profile || typeof profile !== "object") {
      return this.emptyProfile as unknown as Profile;
    }

    const dataWrapper = profile as Record<string, unknown>;
    const data =
      (dataWrapper.data as Record<string, unknown> | undefined) || dataWrapper;

    return {
      ...(data as object),
      photoUrl:
        (data.photoUrl as string) ??
        (data.urlPhoto as string) ??
        (data.photo as Record<string, unknown>)?.url,
      followers: (data.followers as User[]) ?? null,
      following: (data.following as User[]) ?? null,
    };
  }

  private normalizeUserWithProfile(user: unknown): UserWithProfile {
    if (!user || typeof user !== "object") return user as UserWithProfile;
    const data = user as Record<string, unknown>;
    return {
      ...(data as object),
      profile: this.normalizeProfile(data?.profile),
    };
  }

  async getUsers(): Promise<User[]> {
    const response = await this.httpClient.get(`${this.url}/user/`);
    return response as User[];
  }

  async getProfileByUserId(id: string): Promise<Profile> {
    const response = await this.httpClient.get(`${this.url}/profile/${id}`);
    return this.normalizeProfile(response);
  }

  async getProfileByUsername(username: string): Promise<Profile> {
    const response = await this.httpClient.get(
      `${this.url}/profile/getByUsername/${username}`,
    );
    return this.normalizeProfile(response);
  }

  async searchProfileByUsername(username: string): Promise<UserWithProfile> {
    const response = await this.httpClient.get(
      `${this.url}/user/with-profile/username/${username}`,
    );
    return this.normalizeUserWithProfile(response);
  }

  async followUser(
    followerId: string,
    followedId: string,
  ): Promise<unknown> {
    const response = await this.httpClient.post(
      `${this.url}/follows/${followerId}/follow/${followedId}`,
    );
    return response;
  }

  async deleteFollowUser(
    followerId: string,
    followedId: string,
  ): Promise<unknown> {
    const response = await this.httpClient.delete(
      `${this.url}/follows/${followerId}/unfollow/${followedId}`,
    );
    return response;
  }

  async findUserProfile(id: string): Promise<Profile> {
    try {
      const response = await this.httpClient.get(`${this.url}/profile/${id}`);
      return this.normalizeProfile(response);
    } catch (error: unknown) {
      console.error(`Error in findUserProfile: ${error}`);
      throw new Error((error as Error)?.message || "Erro ao buscar perfil");
    }
  }

  async searchProfiles(query: string): Promise<UserWithProfile[]> {
    try {
      const response = await this.httpClient.get(
        `${this.url}/user/with-profile/search-by-username-part/${query}`,
      );

      const itens = (response as { itens?: unknown[] }).itens ?? [];
      if (!Array.isArray(itens)) return [];
      return itens.map((item: unknown) => this.normalizeUserWithProfile(item));
    } catch (error: unknown) {
      console.error(`Error in searchProfiles: ${error}`);
      throw new Error((error as Error)?.message || "Erro ao buscar perfis");
    }
  }

  async createProfile(userId: string): Promise<Profile> {
    try {
      const response = await this.httpClient.post(`${this.url}/profile`, {
        userId,
      });
      return this.normalizeProfile(response);
    } catch (error: unknown) {
      console.error(`Error in createProfile: ${error}`);
      throw new Error((error as Error)?.message || "Erro ao criar perfil");
    }
  }

  async uploadPhoto(profileId: string, formData: FormData): Promise<Profile> {
    try {
      const response = await this.httpClient.post(
        `${this.url}/profile/${profileId}/photo`,
        formData,
      );
      return this.normalizeProfile(response);
    } catch (error: unknown) {
      console.error(`Error in uploadPhoto: ${error}`);
      throw new Error(
        (error as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Erro ao enviar foto",
      );
    }
  }

  async updateUser(userData: User): Promise<User> {
    const response = await this.httpClient.put<User>(
      `${this.url}/user/`,
      userData,
    );
    return response;
  }

  async getTuneScore(userId1: string, userId2: string): Promise<unknown> {
    try {
      const response = await this.httpClient.get(
        `${this.url}/tunescore/${userId1}/${userId2}`,
      );
      return response;
    } catch (error: unknown) {
      console.error(`Error in getTuneScore: ${error}`);
      throw new Error((error as Error)?.message || "Erro ao buscar TuneScore");
    }
  }
}
