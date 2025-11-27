import { Tuneet, TuneetResponse, TuneetTrending } from "@/domain/types/Post";
import AxiosAdapter from "../http/AxiosAdapter";
import IHttpClient from "../http/IHttpClient";
import { PageMetadados, TunableItem } from "@/domain/types/Post";
import { buildApiUrl } from "../http/apiUrl";

type UnknownRecord = Record<string, unknown>;

export default class TuneetGatewayHttp {
  httpClient: IHttpClient;
  url: string;

  constructor() {
    this.url = buildApiUrl("/tuneet");
    this.httpClient = new AxiosAdapter();
  }

  private normalizeTunableItem(payload: unknown): TunableItem | null {
    if (!payload || typeof payload !== "object") return null;
    const data = payload as UnknownRecord;

    return {
      itemId: (data.itemId as string) ?? (data.id as string) ?? (data.tunableItemId as string),
      title:
        (data.title as string) ??
        (data.tunableItemTitle as string) ??
        (data.itemTitle as string),
      artist:
        (data.artist as string) ??
        (data.tunableItemArtist as string) ??
        (data.itemArtist as string),
      artworkUrl:
        (data.artworkUrl as string) ??
        (data.tunableItemArtworkUrl as string) ??
        (data.itemArtworkUrl as string),
      platformId:
        (data.platformId as string) ??
        (data.tunableItemPlataform as string) ??
        (data.plataformId as string),
      type: ((data.type as string) ??
        (data.itemType as string)) as TunableItem["type"],
    };
  }

  private normalizeTuneet(payload: unknown): Tuneet {
    const data = payload as UnknownRecord;
    const author = data.author as UnknownRecord | undefined;
    const authorProfile = author?.profile
      ? {
          ...(author.profile as UnknownRecord),
          photoUrl:
            (author.profile as UnknownRecord)?.photoUrl ??
            (author.profile as UnknownRecord)?.urlPhoto,
        }
      : undefined;

    const normalizedTunableItem =
      (data.tunableItem as unknown) !== undefined
        ? this.normalizeTunableItem(data.tunableItem)
        : this.normalizeTunableItem(payload);

    return {
      ...(payload as object),
      textContent:
        (data.textContent as string) ?? (data.contentText as string) ?? "",
      authorUsername:
        (data.authorUsername as string) ??
        (data.authorName as string) ??
        (author?.username as string) ??
        (data.username as string),
      author: author
        ? {
            ...(author as object),
            profile: authorProfile ?? (author.profile as UnknownRecord),
          }
        : undefined,
      photoUrl: (data.photoUrl as string) ?? (data.urlPhoto as string),
      tunableItem: normalizedTunableItem,
      tunableItemTitle:
        (data.tunableItemTitle as string) ??
        (data.itemTitle as string) ??
        (normalizedTunableItem?.title as string),
      tunableItemArtist:
        (data.tunableItemArtist as string) ??
        (data.itemArtist as string) ??
        (normalizedTunableItem?.artist as string),
      tunableItemArtworkUrl:
        (data.tunableItemArtworkUrl as string) ??
        (data.itemArtworkUrl as string) ??
        (normalizedTunableItem?.artworkUrl as string),
    };
  }

  async findByTitle(word: string, itemType: string): Promise<TunableItem[]> {
    const params = new URLSearchParams({
      query: word,
      itemType: itemType,
    }).toString();

    const response = await this.httpClient.get(
      `${this.url}/search-tunable-item?${params}`,
    );
    if (!Array.isArray(response)) return [];
    return response
      .map((item) => this.normalizeTunableItem(item))
      .filter(Boolean) as TunableItem[];
  }

  async findTuneetsByUserId(
    userId: string,
    metadados: PageMetadados,
  ): Promise<TuneetResponse> {
    let params = "";

    if (metadados.currentPage || metadados.pageSize) {
      params = new URLSearchParams({
        page: metadados.currentPage.toString(),
        size: metadados.pageSize.toString(),
      }).toString();
    }

    const response = await this.httpClient.get(
      `${this.url}/author/${userId}/resume?${params}`,
    );
    const rawItens = (response as { itens?: unknown[] }).itens ?? [];
    const itens = Array.isArray(rawItens)
      ? rawItens.map((item) => this.normalizeTuneet(item))
      : [];

    return {
      ...response,
      itens,
    };
  }

  async findTuneetById(tuneetId: string): Promise<Tuneet> {
    try {
      const response = await this.httpClient.get(`${this.url}/${tuneetId}`);
      return this.normalizeTuneet(response);
    } catch (error: unknown) {
      console.error(`Error in findTuneetById: ${error}`);
      throw new Error((error as Error)?.message || "Erro ao buscar Tuneet");
    }
  }

  async makeATuneet(
    textContent: string,
    itemId: string | undefined,
    itemType: "music" | "album" | "podcast",
  ): Promise<Tuneet> {
    try {
      const response = await this.httpClient.post(`${this.url}`, {
        textContent,
        itemId,
        itemType: itemType.toUpperCase(),
      });
      return this.normalizeTuneet(response);
    } catch (error: unknown) {
      console.error(`Error in makeATuneet: ${error}`);
      throw new Error((error as Error)?.message || "Erro ao criar Tuneet");
    }
  }

  async findTrendingTracks(): Promise<TuneetTrending[]> {
    try {
      const response = await this.httpClient.get(`${this.url}/trending`);
      return (response as TuneetTrending[]).map((item) => ({
        ...item,
        artworkUrl: item.artworkUrl?.toString(),
      }));
    } catch (error: unknown) {
      console.error(`Error in findTrendingTracks: ${error}`);
      throw new Error((error as Error)?.message || "Erro ao buscar trending");
    }
  }
}
