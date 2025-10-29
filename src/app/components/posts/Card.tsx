import { Photo } from "../Photo";
import { FaRegCommentAlt } from "react-icons/fa";
import { HeartButton } from "./HeartButton";
import { Tuneet } from "@/domain/types/Post";
import { useState } from "react";
import { useAuth } from "@/infra/contexts/auth/UseAuth";
import { likeATuneet } from "@/app/services/auth/likeATuneet";
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

  const { profile, user} = useAuth();

  const navigate = useNavigate();


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
          <span className="text-xs text-copacity_25">
            {track?.createdAt ? new Date(track?.createdAt).toLocaleString('pt-BR', {
              day: '2-digit', month: '2-digit', year: '2-digit',
              hour: '2-digit', minute: '2-digit'
            }) : ''}
          </span>
          
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
          likes={track?.totalLikes}
        />
        <button
          className="hover:text-blue-500
        hover:border-b-violet-600 flex items-center gap-1"
        >
          <FaRegCommentAlt />
          {track?.totalComments > 0 ? <span className="ml-1 text-sm">{track?.totalComments}</span> : <p>0</p>}
        </button>
      </div>
    </div>
  );
}
