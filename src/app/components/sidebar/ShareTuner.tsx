import { TuneetTrending } from "@/domain/types/Post";

export const ShareTuner = (tuneet: TuneetTrending) => {
  function traduzirTipo(tipo: string) {
    switch (tipo?.toUpperCase()) {
      case "MUSIC":
        return "Música";
      case "ALBUM":
        return "Álbum";
      case "PODCAST":
        return "Podcast";
      default:
        return tipo;
    }
  }
  return (
    <div className="flex flex-col gap-1 w-full mb-2 p-2 rounded-md border border-stroke bg-fume/60 hover:bg-fume/80 transition">
      <p className="text-xs text-contrast/60">{traduzirTipo(tuneet.itemType)}</p>
      <div className="flex text-sm gap-3 font-semibold w-full items-center">
        <p className="flex-1 truncate">{tuneet.title}</p>
        <p className="flex-1 truncate text-contrast/80">{tuneet.artist}</p>
      </div>
      <p className="text-xs text-theme">{tuneet.tuneetCount} tuneets</p>
    </div>
  );
};
