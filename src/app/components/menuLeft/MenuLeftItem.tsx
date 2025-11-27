import { Link } from "react-router-dom";
import { Img } from "../Img";
import { Sheet, SheetContent, SheetTrigger } from "../Sheet";
import { useState } from "react";
import { FormConfig } from "../forms/FormConfig";

interface MenuLeftItemProps {
  src: string;
  alt: string;
  buttonSelected: string;
  setButtonSelected: (value: string) => void;
  to?: string;
}

export const MenuLeftItem = ({
  src,
  alt,
  buttonSelected,
  setButtonSelected,
  to,
}: MenuLeftItemProps) => {
  const [isSheetVisible, setIsSheetVisible] = useState(false);

  function selectMenu(alt: string) {
    setButtonSelected(alt);
    alt === "config" ? setIsSheetVisible(true) : setIsSheetVisible(false);
  }

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Link
            to={to ? to : ""}
            onClick={() => selectMenu(alt)}
            className="flex  h-10 p-6 fill-contrast stroke-contrastw-full items-center justify-center group"
          >
            <Img src={src} alt={alt} />
            <div
              className={`${
                alt !== "more"
                  ? alt === buttonSelected
                    ? `absolute size-12 bg-copacity_25 rounded-full`
                    : "transition-all group-hover:absolute group-hover:size-12 group-hover:bg-copacity_25 group-hover:rounded-full"
                  : `md:-z-10  absolute size-12 bg-theme rounded-full hover:bg-copacity_theme/5 transition-all`
              }`}
            ></div>
          </Link>
        </SheetTrigger>

        {isSheetVisible && (
          <SheetContent isOpen={isSheetVisible}>
            <FormConfig />
          </SheetContent>
        )}
      </Sheet>
    </>
  );
};
