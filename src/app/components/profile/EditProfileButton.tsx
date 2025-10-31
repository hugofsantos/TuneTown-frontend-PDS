import * as Dialog from "@radix-ui/react-dialog";
import { FormEditProfile } from "../forms/FormEditProfile";
import { CloseButton } from "../CloseButton";

export const EditProfileButton = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          className="border border-constrast text-sm rounded-2xl p-1 px-2
         hover:bg-copacity_25 hover:bg-opacity-10 transition-all duration-300"
        >
          editar perfil
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="bg-base opacity-60 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content
          className=" bg-fume border border-stroke text-contrast 
        stroke-stroke data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] 
        max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%]
         rounded-[6px] p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] 
         focus:outline-none"
        >
          <div className="flex gap-4  items-center  ">
            <Dialog.Close asChild>
              <CloseButton arial-label="Close" />
            </Dialog.Close>
            <p className="font-semibold text-xl"> Edital perfil </p>
          </div>
          <FormEditProfile />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
