import { Comment } from "./Comment";
import { Like } from "./Like";
import { User, UserWithProfile } from "./User";

export type Tuneet = {
  id: string;
  authorId: string;
  textContent: string;
  tunableItem: {
    plataformId: string;
    title: string;
    artist: string;
    artworkUrl: string;
    type: "MUSIC" | "ALBUM" | "PODCAST";
    itemId: string;
  };
  itemId: string;
  itemPlataform: string;
  itemArtist: string;
  itemArtworkUrl: string;
  tunableContent: string;
  itemTitle: string;
  authorName: string;
  createdAt: string;
  totalLikes: number;
  totalComments: number;
  comments: Comment[];
  likes: Like[];
  author: UserWithProfile;
};

export type PostEntity = Tuneet & {
  id: string;
  authorId: string;
  createdAt: string;
};

export type PageMetadados = {
  currentPage: number;
  pageItens: number;
  totalItens: number;
  totalPages: number;
  pageSize: number;
};

export type TuneetResponse = PageMetadados & {
  itens: any[];
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
