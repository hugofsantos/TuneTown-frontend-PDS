import { ContainerPosts } from "../components/profile/ContainerPosts";
import { Card } from "../components/posts/Card";
import { useAuth } from "../../infra/contexts/auth/UseAuth";
import { ProfileMenu } from "../components/profile/ProfileMenu";
import { useCallback, useEffect, useRef, useState } from "react";
import { findTuneetsByUserId } from "../services/auth/findTuneetsByUserId";
import { PageMetadados, Tuneet } from "@/domain/types/Post";
import { useParams } from "react-router-dom";
import { UserWithProfile } from "@/domain/types/User";
import { searchProfileByUsername } from "../services/auth/findProfileByUsername";
import { Spinner } from "../components/Spinner";

export const Profile = () => {
  const { user, profile } = useAuth();
  const [pageMetadados, setPageMetadados] = useState<PageMetadados>({
    currentPage: 1,
    pageItens: 0,
    totalItens: 0,
    totalPages: 1,
    pageSize: 10,
  });
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Tuneet[]>([]);
  const [userProfile, setUserProfile] = useState<UserWithProfile | null>(user);
  const [initialLoading, setInitialLoading] = useState(true);

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const { profileId } = useParams();

  const fetchProfilePosts = useCallback(
    async (page = 0, userId?: string) => {
      setLoading(true);

      if (posts.length > 0 && posts.length === pageMetadados?.totalItens) {
        setHasMore(false);
        setLoading(false);
        return;
      }

      const metadados = { ...pageMetadados, currentPage: page };
      if (userId) {
        const tuneets = await findTuneetsByUserId(userId, metadados);

        if (!tuneets) {
          setHasMore(false);
          setLoading(false);
          return;
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
      }
      setLoading(false);
    },
    [pageMetadados, posts],
  );

  useEffect(() => {
    if (!profileId) return;

    const loadProfile = async () => {
      // Limpa posts e metadados ao trocar de perfil
      setPosts([]);
      setPageMetadados({
        currentPage: 1,
        pageItens: 0,
        totalItens: 0,
        totalPages: 1,
        pageSize: 10,
      });
      setHasMore(true);

      const profileResponse = await searchProfileByUsername(profileId);

      if (!profileResponse) {
        setHasMore(false);
        setInitialLoading(false);
        return;
      }
      setUserProfile(profileResponse);

      const targetUserId =
        profileResponse.profile?.userId ?? profileResponse.id;

      await fetchProfilePosts(0, targetUserId);
      setInitialLoading(false);
    };

    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileId]);

  useEffect(() => {
    if (!loaderRef.current || !hasMore || loading) return;

    const currentLoader = loaderRef.current;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchProfilePosts((pageMetadados?.currentPage || 1) + 1);
      }
    });

    observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [pageMetadados, hasMore, loading, fetchProfilePosts]);

  return (
    <div className="w-full h-full items-center">
      <div
        className="h-full md:w-11/12 w-full rounded-lg border-box relative border-r-[1px] 
       border-stroke overflow-hidden flex flex-col items-center overflow-y-auto"
      >
        <ProfileMenu
          isOwner={Boolean(profile && profileId === user?.username)}
          isLoggedUser={Boolean(user)}
          userId={userProfile?.profile?.id ?? userProfile?.profileId ?? ""}
          username={userProfile?.username ?? userProfile?.profile?.username ?? ""}
          amountTuneets={pageMetadados.totalItens}
          photo_url={userProfile?.profile?.photoUrl ?? ""}
        />

        <ContainerPosts>
          {initialLoading ? (
            Array.from({ length: 3 }).map((_, idx) => (
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
          ) : posts.length > 0 ? (
            posts.map((tuneet, index) => {
              return (
                <Card
                  key={tuneet.id || index}
                  authorImg={
                    tuneet.author?.profile?.photoUrl ||
                    tuneet.photoUrl ||
                    undefined
                  }
                  author={
                    tuneet.authorUsername ??
                    tuneet.author?.username ??
                    tuneet.author?.profile?.username ??
                    ""
                  }
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

        {loading && !initialLoading && (
          <div className="flex items-center gap-2 text-sm text-contrast/70">
            <Spinner size={18} />
            <span>Carregando mais tuneets...</span>
          </div>
        )}

        <div ref={loaderRef} className="h-10" />
      </div>
    </div>
  );
};
