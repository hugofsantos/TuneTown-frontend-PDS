import { TbArrowBackUp } from "react-icons/tb";
import { FavoriteMusic } from "./FavoriteMusic";
import { EditProfileButton } from "./EditProfileButton";
import { MenuItem } from "./MenuItem";
import { useState } from "react";
import { Photo } from "../Photo";
import { useNavigate } from "react-router-dom";
import { TuneScoreButton } from "../TuneScoreButton";
import { useAuth } from "@/infra/contexts/auth/UseAuth";
import { FollowButton } from "./FollowButton";

interface ProfileMenuProps {
  isOwner: boolean;
  isLoggedUser?: boolean;
  username: string;
  photo_url: string;
  amountTuneets?: number;
  userId?: string;
}

export const ProfileMenu = ({
  isOwner,
  isLoggedUser,
  username,
  amountTuneets,
  photo_url,
  userId,
}: ProfileMenuProps) => {
  const [selectedButton, setSelectedButton] = useState<string>("posts");
  const items = ["posts", "foruns", "curtidas"];

  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="h-[35%] border-b-[1px] border-stroke">
      {/* GO BACK */}
      <div
        className="h-[16%] px-3 border-b-[1px] justify-center border-stroke cursor-pointer"
        onClick={() => navigate("/home")}
      >
        <div className="flex items-center gap-3 pt-2">
          <TbArrowBackUp /> @{username}
        </div>
      </div>
      {/* HEADER */}
      <div className="flex flex-col relative h-[84%] justify-between">
        {/* PROFILE INFO */}
        <div className="flex justify-between  h-full px-6 pt-4">
          <div className="flex flex-row items-start  w-1/2">
            <div className="flex flex-col justify-between h-full gap-12">
              <div className="flex gap-2 items-center">
                <Photo src={photo_url} size="4" />
                <div
                  className="w-24 z-10 top-[4.5rem] left-16 absolute h-8
                     bg-fume rounded-tr-xl rounded-bl-xl rounded-br-xl border p-0
                      border-theme text-center text-sm font-semibold"
                >
                  @{username}
                </div>
                <div className="flex flex-col text-sm">
                  <span>
                    listen now <b> beautiful thins - benson boone</b>
                  </span>
                  <span> {amountTuneets} tuneets feitos</span>
                </div>
              </div>
              {!isOwner && isLoggedUser && (
                <div>
                  <TuneScoreButton
                    userId1={username}
                    userId2={user?.username || ""}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="w-1/2 h-full flex gap-4 flex-col md:items-end">
            <FavoriteMusic />
            <div>{isOwner && <EditProfileButton />}</div>

            {!isOwner && isLoggedUser && <FollowButton followedId={userId} />}
          </div>
        </div>

        {/* MENU */}
        <div className="flex h-[16%] mt-4 w-full ">
          <div className="flex flex-row gap-9 pl-4">
            {items.map((item, index) => (
              <MenuItem
                key={index}
                buttonSelected={selectedButton}
                setButtonSelected={setSelectedButton}
              >
                {item}
              </MenuItem>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
