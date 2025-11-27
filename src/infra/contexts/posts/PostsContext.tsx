/* eslint-disable react-refresh/only-export-components */
import { Tuneet } from "@/domain/types/Post";
import { createContext, useContext, useState } from "react";

type PostsContextType = {
  posts: Tuneet[];
  setPosts: (posts: Tuneet[]) => void;
  addPost: (post: Tuneet) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
};

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export function PostsProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Tuneet[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const addPost = (post: Tuneet) => setPosts((prev) => [post, ...prev]);

  return (
    <PostsContext.Provider
      value={{ posts, setPosts, addPost, loading, setLoading }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const ctx = useContext(PostsContext);
  if (!ctx) throw new Error("usePosts must be used within PostsProvider");
  return ctx;
}
