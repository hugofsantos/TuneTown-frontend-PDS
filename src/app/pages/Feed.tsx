import { Card } from "../components/posts/Card";
import { MenuFeed } from "../components/feed/menuTop/MenuFeed";
import { ContainerPosts } from "../components/feed/ContainerPosts";
import { useAuth } from "../../infra/contexts/auth/UseAuth";
import { useEffect, useState } from "react";
import { Tuneet } from "@/domain/types/Post";

export const Feed = () => {
  const { user, profile } = useAuth();

  const [posts, setPosts] = useState<Tuneet[]>([]);

  useEffect(() => {}, [posts]);

  return (
    <div
      className="justify-center 
      mt-4 md:w-[85%] h-full flex flex-col 
      items-center"
    >
      <MenuFeed username={user?.username} userAvatar={profile?.urlPhoto} />
      <ContainerPosts>
        {posts.length > 0 &&
          posts.map((tuneet, index) => (
            <Card
              authorImg={tuneet?.author?.profile?.urlPhoto}
              key={index}
              author={tuneet?.author?.username}
              content={tuneet?.textContent}
              created_at={tuneet?.id}
              track={tuneet}
            />
          ))}
      </ContainerPosts>
    </div>
  );
};
