import { useEffect, useState } from "react";
import { useAuth } from "@/infra/contexts/auth/UseAuth";
import { Button } from "../Button";
import { CloseButton } from "../CloseButton";
import { FaSpotify } from "react-icons/fa";
import * as Dialog from "@radix-ui/react-dialog";
import { findSongByTitle } from "@/app/services/auth/findSongByTitle";
import { Photo } from "../Photo";
import { makeATuneet } from "@/app/services/auth/makeATuneet";
import { toast } from "sonner";


type track = {
  album: {
    images: {
      url: string;
    }[];
    name: string;
  };
  artists: {
    name: string;
  }[];
  name: string;
  duration_ms: number;
  id: string;
};

type Song = {
  artist: string;
  artworkUrl: string;
  itemId: string;
  itemType: string;
  plataform: string;
  title: string;
}


export const MakeAPost = ({ itemType, onClose }: { itemType: "music" | "album" | "podcast", onClose: () => void }) => {
  const { user, tokenSpotify, posts, setPosts } = useAuth();
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Song[]>([]);
  const [searchClicked, setSearchClicked] = useState<Song | null>(null);
  const [commentInput, setCommentInput] = useState<string>("");

  useEffect(() => {
    const buscarMusica = async () => {
      if (searchInput.trim() === "") {
        setSearchResult([]);
        return;
      }
      const result = await findSongByTitle(searchInput, itemType);

      console.log(result)
      setSearchResult(result);
    };

    buscarMusica();

  }, [searchInput]);

  async function makeAPost() {
    try {
      const response = await makeATuneet(commentInput, searchClicked?.itemId, itemType);
      toast.success("Tuneet criado com sucesso!");
       setPosts([response, ...posts]);
    } catch (e) {
      toast.error("Erro ao criar Tuneet");
    } 
      onClose();
  }

  return (
    <div className="flex justify-between flex-col w-full h-full box-border">
      <div className="flex w-full justify-between">
        <Dialog.Close asChild>
          <CloseButton
            onClick={onClose} aria-label="Close" />
        </Dialog.Close>
        <p className="">@{user?.username}</p>
        <p className="opacity-0">
          <CloseButton onClick={onClose} />
        </p>
      </div>
      <div className="border-b border-stroke" />

      <div
        className="flex h-fit p-4 justify-center
         items flex-col "
      >
        <div
          className="border-b border-stroke border-dotted 
          decoration-dotted w-full"
        />
        <div className="relative">
          <input
            placeholder="Buscar ou colar URL de áudio"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            className={`rounded-sm ${searchClicked
                ? "h-6 text-sm  placeholder:text-lg"
                : "h-8 md:text-xl  placeholder:text-2xl"
              } w-full text-start appearance-none 
          relative
          bg-transparent placeholder:text-theme sm:text-sm/6 
          block
          after:inset-0 after:rounded-lg
          text-theme
          focus:outline-none
          font-bold`}
          />

          {searchResult && searchInput != "" && (
            <div
              className="absolute top-[calc(2rem+8px)] 
              w-[20rem] rounded-lg flex flex-col 
              shadow-sm p-3 shadow-theme bg-fume 
              gap-y-2
              z-20 items-start overflow-auto h-[10rem] text-sm"
            >
              {searchResult?.map((item: Song) => (
                <button
                  onClick={() => {
                    setSearchInput("");
                    setSearchClicked(item)
                  }}
                  className="flex hover:text-theme transition-all duration-75"
                  key={item.itemId}
                >
                  <Photo
                    size="1"
                    src={item.artworkUrl} />
                  {item.artist} - {item.title}
                </button>
              ))}
            </div>
          )}
        </div>
        <div
          className="border-b border-stroke border-dotted decoration-dotted
           w-full"
        />
      </div>

      <div className="flex  flex-col h-full w-full justify-between">
        {searchClicked && (
          <div className="flex gap-3">
            <img
              className="size-32"
              src={searchClicked.artworkUrl}
            ></img>
            <div>
              <p>{searchClicked.artist}</p>
              <p>{searchClicked.title}</p>
              <p>{searchClicked.plataform}</p>
              {/* <p>
                {Math.floor(searchClicked.duration_ms / 60000)}:
                {String(
                  Math.floor((searchClicked.duration_ms % 60000) / 1000)
                ).padStart(2, "0")}
              </p> */}
            </div>
          </div>
        )}


        <input
          placeholder="Comente aqui"
          onChange={(event) => setCommentInput(event.target.value)}
          className=" m-m-0 rounded-sm h-8 w-full text-start appearance-none 
            relative
            bg-transparent placeholder:text-contrast sm:text-sm/6 
            block
            after:inset-0 after:rounded-lg
            placeholder:text-2xl
            focus:outline-none
            md:text-xl font-light p-3"
        />

        <div className="w-full justify-between flex p-2">
          <button className="text-zinc-500 opacity-0">Cancelar</button>

          <div className="overflow-hidden w-1/3 h-fit rounded-3xl">
            <Button onClick={() => makeAPost()}>Postar</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
