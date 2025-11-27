import { BiPlus } from "react-icons/bi";
import React, { useState } from "react";
import { followUser } from "@/app/services/auth/followUser";
import { useAuth } from "@/infra/contexts/auth/UseAuth";
import { deleteFollowUser } from "@/app/services/auth/deleteFollowUser";

interface FollowButtonProps {
  followedId?: string;
  isFollowing?: boolean;
}

export const FollowButton: React.FC<FollowButtonProps> = ({
  followedId = "",
  isFollowing = false,
}) => {
  const [loading, setLoading] = useState(false);
  const [following, setFollowing] = useState(isFollowing);

  const { profile } = useAuth();

  const handleFollow = async () => {
    if (!followedId || loading) return;
    setLoading(true);
    try {
      if (following) {
        await deleteFollowUser(profile!.id, followedId);
      } else {
        await followUser(profile!.id, followedId);
      }
      setFollowing(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`flex items-center gap-1 px-3 py-1 rounded-full border border-theme text-theme font-medium transition-all duration-150 shadow-sm hover:bg-theme hover:text-fume hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed`}
      onClick={handleFollow}
      disabled={loading}
    >
      <BiPlus /> {loading ? "aguarde..." : following ? "seguindo" : "seguir"}
    </button>
  );
};
