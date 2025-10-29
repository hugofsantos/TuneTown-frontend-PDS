import { TbArrowBackUp } from "react-icons/tb";
import { FavoriteMusic } from "./FavoriteMusic";
import { EditProfileButton } from "./EditProfileButton";
import { MenuItem } from "./MenuItem";
import { useAuth } from "../../../infra/contexts/auth/UseAuth";
import { useEffect, useState } from "react";
import { Photo } from "../Photo";

export const ProfileMenu = () => {
  const { user, profile, posts } = useAuth();
  const [selectedButton, setSelectedButton] = useState<string>("posts");
  const items = ["posts", "foruns", "curtidas"];
  
  return (
    <div className="h-[30%] border-b-[1px] border-stroke ">
      {/* GO BACK */}
      <div
        className="h-[16%] px-3 border-b-[1px] 
        justify-center border-stroke"
      >
        <div className="flex items-center gap-3 pt-2">
          <TbArrowBackUp /> @{user?.username}
        </div>
      </div>
      {/* HEADER */}
      <div className="flex flex-col relative h-[84%] justify-between">
        {/* PROFILE INFO */}
        <div className="flex justify-between  h-[84%] px-6 pt-4 h-">
          <div className="flex flex-row items-start  w-1/2">
            <div className="flex gap-2 items-center ">
              <Photo src={user?.profile?.photo.url} size="4" />
              <div
                className="w-24 z-10 top-[4.5rem] left-16 absolute h-8
                     bg-fume rounded-tr-xl rounded-bl-xl rounded-br-xl border p-0
                      border-theme text-center text-sm font-semibold"
              >
                @{user?.username}
              </div>
              <div className="flex flex-col text-sm ">
                <span>
                  listen now <b> beautiful thins - benson boone</b>
                </span>
                <span> {posts.length} tuners shared</span>
              </div>
            </div>
          </div>
          <div className="w-1/2 h-full flex gap-4 flex-col md:items-end">
            <FavoriteMusic />
            <div>
              <EditProfileButton />
            </div>
          </div>
        </div>

        {/* MENU */}
        <div className="flex h-[16%] w-full ">
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
