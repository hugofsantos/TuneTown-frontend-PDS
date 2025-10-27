
import { Photo } from "../Photo";
import { IoHeartOutline } from "react-icons/io5";
import { FaRegCommentAlt } from "react-icons/fa";
import { HeartButton } from "./HeartButton";
import { Tuneet } from "@/domain/types/Post";
import { useEffect, useState } from "react";
import { useAuth } from "@/infra/contexts/auth/UseAuth";
import { likeATuneet } from "@/app/services/auth/likeATuneet";
import { findTunetsInfos } from "@/app/services/auth/findInfoTuneet";
import { useNavigate } from "react-router-dom";
import { TbTrash } from "react-icons/tb";


interface CardProps {
  author: string;
  authorImg?: string;
  track: Tuneet;
  content: string;
  children?: React.ReactNode;
}

export function Card({ author, authorImg, content, track }: CardProps) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState<any>([]);
  const { profile, user} = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
    fetchTuneet();
  }, [liked]);

  async function fetchTuneet() {
    const response = await findTunetsInfos(track.id);
    setLikes(response?.content || []);
  }

  async function likeTuneet() {
    const response = await likeATuneet(track.id, profile!.id);
    if (response?.id) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }

  function handleCardClick() {
    navigate(`/tuneet/${track.id}`);
  }

  return (
    <div
      onClick={handleCardClick}
      className={`flex cursor-pointer w-full sm:h-[20%] md:h-fit
    border-stroke border text-contrast flex-col bg-fume hover:bg-fume/50 p-2 
    rounded-lg`}
    >
      <div className="flex w-full h-[30%] items-center gap-2">
        <Photo size="1.9" src={authorImg} />
        <div className="flex flex-col w-full text-sm">
          <span className="flex w-full justify-between ">
            <p>@{author}</p>
            <p> {
            user?.id === track?.authorId && (
              <TbTrash 
              
              className=" right-2 text-slate-300 top-2 cursor-pointer text-contrast/50 hover:text-red-500"
              />
            )
          }</p>
           </span>
          <span className="text-xs text-copacity_25">{new Date().toISOString()}</span>
          
        </div>
      </div>

      <div className="flex justify-center flex-col max-h-full  text-pretty p-3 px-7 w-full">
        <div className="flex-grow">{content}</div>
        <div className="w-full bg-copacity_25 rounded-lg p-4">
          <div className="flex gap-3">
            {" "}
            <img className="w-32 h-32 object-cover" src={track?.itemArtworkUrl} alt={track?.itemTitle} />

            <div>
              <p>{track?.itemArtist}</p>
              <p>{track?.itemTitle}</p>
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
        <HeartButton
          liked={liked}
          setLiked={likeTuneet}
          likes={likes}
        />
        <button
          className="hover:text-blue-500
        hover:border-b-violet-600"
        >
          <FaRegCommentAlt />
        </button>
      </div>
    </div>
  );
}
