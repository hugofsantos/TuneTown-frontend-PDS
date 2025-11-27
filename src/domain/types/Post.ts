import { Comment } from "./Comment";
import { Like } from "./Like";
import { UserWithProfile } from "./User";

export type TunableItem = {
  itemId: string;
  title: string;
  artist: string;
  artworkUrl: string;
  platformId?: string;
  type?: "MUSIC" | "ALBUM" | "PODCAST";
};

export type Tuneet = {
  id: string;
  authorId: string;
  textContent: string;
  createdAt?: string;
  authorUsername?: string;
  author?: UserWithProfile | null;
  tunableItem?: TunableItem | null;
  tunableItemTitle?: string;
  tunableItemArtist?: string;
  tunableItemArtworkUrl?: string;
  itemArtworkUrl?: string;
  itemArtist?: string;
  itemTitle?: string;
  tunableContent?: string;
  totalLikes?: number;
  totalComments?: number;
  comments?: Comment[];
  likes?: Like[];
  photoUrl?: string | null;
};

export type PageMetadados = {
  currentPage: number;
  pageItens: number;
  totalItens: number;
  totalPages: number;
  pageSize: number;
};

export type TuneetResponse = PageMetadados & {
  itens: Tuneet[];
};

export type TuneetTrending = {
  itemId: string;
  title: string;
  artist: string;
  platformId: string;
  itemType: string;
  artworkUrl: string;
  tuneetCount: number;
};
