import { ContainerPosts } from "../components/profile/ContainerPosts";
import { Card } from "../components/posts/Card";
import { useAuth } from "../../infra/contexts/auth/UseAuth";
import { ProfileMenu } from "../components/profile/ProfileMenu";
import { useEffect, useRef, useState } from "react";
import { findTuneetsByUserId } from "../services/auth/findTuneetsByUserId";
import { PageMetadados, TuneetResponse } from "@/domain/types/Post";
import { useParams } from "react-router-dom";

export const Profile = () => {
  const { user, profile, posts, setPosts } = useAuth();
  const [pageMetadados, setPageMetadados] = useState<PageMetadados>({
    currentPage: 1,
    pageItens: 0,
    totalItens: 0,
    totalPages: 1,
    pageSize: 10,
  });
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const { profileId } = useParams();

  async function fetchProfilePosts(page = 0) {
    setLoading(true);

    if (posts.length > 0 && posts.length === pageMetadados?.totalItens) {
      setHasMore(false);
      setLoading(false);
      return;
    }

    const metadados = { ...pageMetadados, currentPage: page };
    let tuneets: TuneetResponse;

    if (user?.username == profileId) {
      tuneets = await findTuneetsByUserId(user!.username, metadados);
    } else {
      tuneets = await findTuneetsByUserId(profileId!, metadados);
    }

    const ids = new Set(posts.map((t) => t.id));
    const novos = tuneets.itens.filter((t) => !ids.has(t.id));
    setPosts([...posts, ...novos]);

    const newMetadados: PageMetadados = {
      totalItens: tuneets.totalItens,
      totalPages: tuneets.totalPages,
      currentPage: tuneets.currentPage,
      pageItens: tuneets.pageItens,
      pageSize: tuneets.pageSize,
    };

    setPageMetadados(newMetadados);
    setHasMore(newMetadados.currentPage < newMetadados.totalPages);
    setLoading(false);
  }

  useEffect(() => {
    fetchProfilePosts(0);
  }, []);

  useEffect(() => {
    if (!loaderRef.current || !hasMore || loading) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchProfilePosts((pageMetadados?.currentPage || 1) + 1);
      }
    });

    observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [pageMetadados, hasMore, loading]);

  return (
    <div className="w-full h-full items-center">
      <div
        className="h-full md:w-11/12 w-full rounded-lg border-box relative border-r-[1px] 
       border-stroke overflow-hidden flex flex-col items-center overflow-y-auto"
      >
        <ProfileMenu
          isOwner={Boolean(profile && profileId === user?.username)}
          isLoggedUser={Boolean(user)}
          username={profileId!}
          amountTuneets={pageMetadados.totalItens}
          photo_url={profile?.photo?.url || ""}
        />

        <ContainerPosts>
          {posts.length > 0 ? (
            posts.map((tuneet, index) => {
              return (
                <Card
                  key={tuneet.id || index}
                  authorImg={tuneet.author.profile?.urlPhoto || ""}
                  author={tuneet.author.username!}
                  content={tuneet.textContent}
                  track={tuneet}
                />
              );
            })
          ) : (
            <p className="text-center text-gray-500 mt-10">
              Nenhum tuneet encontrado. Comece a compartilhar suas músicas
              favoritas!
            </p>
          )}
        </ContainerPosts>

        <div ref={loaderRef} className="h-10" />
      </div>
    </div>
  );
};
