import {Card} from "../components/posts/Card";
import { MenuFeed } from "../components/feed/menuTop/MenuFeed";
import { ContainerPosts } from "../components/feed/ContainerPosts";
import { useAuth } from "../../infra/contexts/auth/UseAuth";
import { useEffect } from "react";


export const Feed = () => {
  const { user, profile, posts } = useAuth();

  useEffect(() => {
    console.log("Posts updated:", posts);
  }, [posts]);

    return (
      <div className="justify-center 
      mt-4 md:w-[85%] h-full flex flex-col 
      items-center">
        <MenuFeed
          username={user?.username}
          userAvatar={profile?.urlPhoto}
        />
        <ContainerPosts>
          {posts.length > 0 && posts.map((tuneet, index) => (
            <Card
              authorImg={profile?.urlPhoto}
              key={index}
              author={tuneet?.authorId}
              content={tuneet?.textContent}
              created_at={tuneet?.id}
              track={tuneet}
            />
          ))}
        </ContainerPosts>
      </div>
    );
}