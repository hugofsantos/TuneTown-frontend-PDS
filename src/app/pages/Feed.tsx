import { Card } from "../components/posts/Card";
import { MenuFeed } from "../components/feed/menuTop/MenuFeed";
import { ContainerPosts } from "../components/feed/ContainerPosts";
import { useAuth } from "../../infra/contexts/auth/UseAuth";
import { useEffect } from "react";
import { Tuneet } from "@/domain/types/Post";
import { usePosts } from "@/infra/contexts/posts/PostsContext";
import { findTuneetsByUserId } from "../services/auth/findTuneetsByUserId";

export const Feed = () => {
  const { user, profile } = useAuth();
  const { posts, setPosts, loading, setLoading } = usePosts();

  useEffect(() => {
    const fetchInitial = async () => {
      if (!user?.id || posts.length > 0) return;
      setLoading(true);
      const response = await findTuneetsByUserId(user.id, {
        currentPage: 0,
        pageItens: 0,
        totalItens: 0,
        totalPages: 1,
        pageSize: 10,
      });
      if (response?.itens) {
        setPosts(response.itens as Tuneet[]);
      }
      setLoading(false);
    };
    fetchInitial();
  }, [user?.id, posts.length, setLoading, setPosts]);

  return (
    <div
      className="justify-center 
      mt-4 md:w-[85%] h-full flex flex-col 
      items-center"
    >
      <MenuFeed username={user?.username} userAvatar={profile?.photoUrl} />
      <ContainerPosts>
        {loading
          ? Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="w-full border border-stroke rounded-lg bg-fume p-4 animate-pulse space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-stroke h-10 w-10" />
                  <div className="flex-1 h-3 bg-stroke rounded" />
                </div>
                <div className="h-4 bg-stroke rounded w-3/4" />
                <div className="h-32 bg-stroke/70 rounded" />
              </div>
            ))
          : posts.length > 0
            ? posts.map((tuneet, index) => (
                <Card
                  authorImg={
                    tuneet?.author?.profile?.photoUrl ??
                    tuneet?.photoUrl ??
                    undefined
                  }
                  key={tuneet.id || index}
                  author={tuneet?.author?.username}
                  content={tuneet?.textContent}
                  track={tuneet}
                />
              ))
            : (
              <div className="flex flex-col items-center text-contrast/70 mt-6">
                <p>Nenhum tuneet ainda.</p>
              </div>
            )}
      </ContainerPosts>
    </div>
  );
};
