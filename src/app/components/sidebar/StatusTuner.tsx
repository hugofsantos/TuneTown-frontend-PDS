import { Photo } from "../Photo";
import { TbMusicStar } from "react-icons/tb";
import { useAuth } from "@/infra/contexts/auth/UseAuth";

export const StatusTuner = () => {
  const { profile } = useAuth();
  const favorite = profile?.favoriteSong;

  return (
    <div
      className="md:flex relative items-center text-sm w-full p-3 rounded-lg border border-stroke bg-fume/80 shadow-sm hidden"
    >
      <Photo size="2.5" />
      <div className="w-full px-3 ">
        <div className="flex justify-between w-full">
          <p className="font-semibold flex items-center text-theme">
            {profile?.username ? `@${profile.username}` : "Seu perfil"}
          </p>
          <p className="text-copacity_25 text-xs">agora mesmo</p>
        </div>
        <p className=" flex items-center font-light gap-1 text-contrast/70">
          <TbMusicStar /> {favorite ? favorite : "Escolha algo para ouvir"}
        </p>
      </div>
    </div>
  );
};
