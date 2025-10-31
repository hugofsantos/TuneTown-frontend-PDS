import sza_music from "../../../app/assets/sza_music.svg";
import { MdFindReplace } from "react-icons/md";
export const FavoriteMusic = () => {
  return (
    <div className="flex md:px-3 gap-3 h-1/2 w-3/4">
      <img className="flex size-20" src={sza_music} />
      <div className="flex flex-col">
        <div className="flex items-center gap-2 md:text-md text-sm">
          <p>Snooze - SZA</p>
          <div>
            <MdFindReplace />
          </div>
        </div>
        <p className="text-xs text-pretty">
          i can't lose when i'm with you how can i snooze and miss the moment?
        </p>
      </div>
    </div>
  );
};
