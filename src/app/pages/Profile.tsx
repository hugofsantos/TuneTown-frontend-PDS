import { ContainerPosts } from "../components/profile/ContainerPosts";
import { Card } from "../components/posts/Card";
import { useAuth } from "../../infra/contexts/auth/UseAuth";
import { ProfileMenu } from "../components/profile/ProfileMenu";
import { useEffect, useRef, useState } from "react";
import { findTuneetsByUserId } from "../services/auth/findTuneetsByUserId";
import { PageMetadados, TuneetResponse } from "@/domain/types/Post";
import { useParams } from "react-router-dom";
import { UserWithProfile } from "@/domain/types/User";
import { searchProfileByUsername } from "../services/auth/findProfileByUsername";

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
  const [posts, setPosts] = useState<any[]>([]);
  const [userProfile, setUserProfile] = useState<any | null>(user);

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
    console.log("fetching for ", profileId);

 
    tuneets = await findTuneetsByUserId(profileId!, metadados);

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
    fetchProfilePosts(0);
    fetchUserProfile();

  }, [profileId]);


  async function fetchUserProfile() {
    if (!profileId) return;

    const userProfile = await searchProfileByUsername(profileId);

    console.log("userProfile", userProfile);
    if (!userProfile) return;
    setUserProfile(userProfile);
  }

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
          userId={userProfile?.profileId}
          username={userProfile?.username}
          amountTuneets={pageMetadados.totalItens}
          photo_url={userProfile?.photoUrl || ""}
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
