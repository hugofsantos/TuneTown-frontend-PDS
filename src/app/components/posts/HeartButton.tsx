import { useEffect, useState } from "react";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeart } from "react-icons/io5";

export const HeartButton = ({ liked, setLiked, likes }: { liked: boolean; setLiked: (liked: boolean) => void; likes: any[] }) => {
  


    return (
      <button
        className="hover:text-rose-500
        hover:border-b-violet-600 flex "
        onClick={() => setLiked(!liked)}
      >
        {liked ? (
          <IoHeart size={20} className="text-theme" />
        ) : (
          <IoHeartOutline size={20} />
        )} {likes.length > 0 && <span className="ml-1 text-sm">{likes.length}</span>}
      </button>
    );

}