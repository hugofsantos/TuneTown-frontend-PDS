import { useEffect, useState } from "react";
import { BoxSidebar } from "./BoxSidebar";
import SearchInput from "./SearchInput";
import { ShareTuner } from "./ShareTuner";
import { StatusTuner } from "./StatusTuner";
import { findTrendingTracks } from "@/app/services/auth/findTrendingTracks";
import { TuneetTrending } from "@/domain/types/Post";

export const Sidebar = () => {
  const [trendingTracks, setTrendingTracks] = useState<TuneetTrending[]>([]);

  useEffect(() => {
    fetchTrendingTracks();

    async function fetchTrendingTracks() {
      const response = await findTrendingTracks();
      setTrendingTracks(response);
    }
  }, []);

  return (
    <div className="md:flex flex-col items-center h-full w-96 gap-10 p-8 border-l border-stroke hidden ">
      <SearchInput />

      <div className="w-full h-[90%] md:flex justify-start items-start flex-col gap-3 ">
        <BoxSidebar>
          <StatusTuner />
        </BoxSidebar>
        <BoxSidebar>
          <div className="flex gap-3 w-full p-3 flex-col items-start justify-start h-full font-light">
            <p className="font-bold text-pretty text-xl text-theme">
              Hits do momento
            </p>
            {trendingTracks.map((track: TuneetTrending, index: number) => (
              <ShareTuner
                itemId={track.itemId}
                title={track.title}
                artist={track.artist}
                artworkUrl={track.artworkUrl}
                itemType={track.itemType}
                platformId={track.platformId}
                tuneetCount={track.tuneetCount}
              />
            ))}
          </div>
        </BoxSidebar>
      </div>
    </div>
  );
};
