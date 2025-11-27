import { Photo } from "../Photo";
import { FaRegCommentAlt } from "react-icons/fa";
import { HeartButton } from "./HeartButton";
import { Tuneet } from "@/domain/types/Post";
import { useState } from "react";
import { useAuth } from "@/infra/contexts/auth/UseAuth";
import { likeATuneet } from "@/app/services/auth/likeATuneet";
import { useNavigate } from "react-router-dom";
import { TbTrash } from "react-icons/tb";
import { toast } from "sonner";

interface CardProps {
  author?: string | null;
  authorImg?: string;
  track: Tuneet;
  content: string;
  children?: React.ReactNode;
}

export function Card({ author, authorImg, content, track }: CardProps) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState<number>(track.totalLikes ?? 0);

  const { profile, user } = useAuth();

  const navigate = useNavigate();

  async function likeTuneet() {
    if (!profile) return;
    const nextLiked = !liked;
    const delta = nextLiked ? 1 : -1;

    setLiked(nextLiked);
    setLikesCount((prev) => Math.max(0, prev + delta));

    try {
      await likeATuneet(track.id, profile.id);
    } catch (error) {
      // rollback on failure
      setLiked(!nextLiked);
      setLikesCount((prev) => Math.max(0, prev - delta));
      toast.error("Não foi possível atualizar o like. Tente novamente.");
    }
  }

  function handleCardClick() {
    navigate(`/tuneet/${track.id}`);
  }

  const authorAvatar =
    authorImg ?? track.author?.profile?.photoUrl ?? track.photoUrl ?? undefined;

  const tunableArtwork =
    track.tunableItem?.artworkUrl ??
    track.tunableItemArtworkUrl ??
    track.itemArtworkUrl;
  const tunableArtist =
    track.tunableItem?.artist ??
    track.tunableItemArtist ??
    track.itemArtist;
  const tunableTitle =
    track.tunableItem?.title ?? track.tunableItemTitle ?? track.itemTitle;
  const totalComments = track.totalComments ?? 0;

  return (
    <div
      onClick={handleCardClick}
      className={`flex cursor-pointer w-full sm:h-[20%] md:h-fit
    border-stroke border text-contrast flex-col bg-fume hover:bg-fume/50 p-2 
    rounded-lg`}
    >
      <div className="flex w-full h-[30%] items-center gap-2">
        <Photo size="1.9" src={authorAvatar} />
        <div className="flex flex-col w-full text-sm">
          <span className="flex w-full justify-between ">
            <p>@{author ?? track.authorUsername ?? track.author?.username}</p>
            <p>
              {" "}
              {user?.id === track?.authorId && (
                <TbTrash className=" right-2 text-slate-300 top-2 cursor-pointer text-contrast/50 hover:text-red-500" />
              )}
            </p>
          </span>
          <span className="text-xs text-copacity_25">
            {track?.createdAt
              ? new Date(track?.createdAt).toLocaleString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : ""}
          </span>
        </div>
      </div>

      <div className="flex justify-center flex-col max-h-full  text-pretty p-3 px-7 w-full">
        <div className="flex-grow">{content}</div>
        <div className="w-full bg-copacity_25 rounded-lg p-4">
          <div className="flex gap-3">
            {" "}
            <img
              className="w-32 h-32 object-cover"
              src={tunableArtwork}
              alt={tunableTitle}
            />
            <div>
              <p>{tunableArtist}</p>
              <p>{tunableTitle}</p>
              {/* <p>
                {Math.floor(track?.duration_ms / 60000)}:
                {String(
                  Math.floor((track?.duration_ms % 60000) / 1000)
                ).padStart(2, "0")}
              </p> */}
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full h-[20%] gap-6 px-7 ">
        <HeartButton liked={liked} onToggle={likeTuneet} likes={likesCount} />
        <button
          className="hover:text-blue-500
        hover:border-b-violet-600 flex items-center gap-1"
        >
          <FaRegCommentAlt />
          {totalComments > 0 ? (
            <span className="ml-1 text-sm">{totalComments}</span>
          ) : (
            <p>0</p>
          )}
        </button>
      </div>
    </div>
  );
}
