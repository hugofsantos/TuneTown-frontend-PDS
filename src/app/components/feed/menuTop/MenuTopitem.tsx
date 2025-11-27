import { Img } from "../../Img";
import * as Dialog from "@radix-ui/react-dialog";
import { MakeAPost } from "../MakeAPost";
import { useState } from "react";

type MenuitemShareProps = {
  src: string;
  alt?: string;
  name: string;
  type: itemType;
};

type itemType = "music" | "album" | "podcast";

export const MenuitemShare = ({ src, name, type }: MenuitemShareProps) => {
  const [open, setOpen] = useState(false);
  const [itemType, setItemType] = useState<itemType>("music");

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          onClick={() => setItemType(type.toLowerCase() as itemType)}
          className="w-[25%] py-2 px-5 text-center 
        items-center gap-2 justify-center flex rounded-full
        border border-stroke color-constrast hover:bg-black/10
        duration-200 md:text-sm text-xs
        transition-all"
        >
          <div className=" flex w-[25%] h-auto">
            <Img src={src} alt="Logo" />
          </div>
          {name}
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="bg-[#292929] opacity-50 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content
          className=" bg-fume border border-stroke text-contrast 
        rounded-xl
        stroke-stroke data-[state=open]:animate-contentShow fixed top-[40%] 
        left-[50%] w-[90vw] max-w-[30rem] h-[20rem] max-h-[45rem] translate-x-[-50%] 
        translate-y-[-50%]  px-7 py-3
        shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] 
        focus:outline-none"
        >
          <MakeAPost itemType={itemType} onClose={() => setOpen(false)} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
