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
    <div className="flex flex-col  gap-1 hover:bg-slate-50/10 w-full mb-2">
      <p className="text-xs text-slate-200">{traduzirTipo(tuneet.itemType)}</p>
      <div className="flex text-sm gap-5  font-bold w-full items-center text-nowrap">
        <p className="flex justify-start w-1/3 flex-wrap text-wrap">
          {tuneet.title}
        </p>
        <p className="flex justify-start w-1/3 flex-wrap">{tuneet.artist}</p>
      </div>
      <p className="text-xs text-slate-200">{tuneet.tuneetCount} tuneets</p>
    </div>
  );
};
