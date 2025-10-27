import { MenuLeftItem } from "./MenuLeftItem";
import {
  home,
  home2,
  search,
  search2,
  profile,
  profile2,
  foruns,
  foruns2,
  more, more2,
  config,
  config2
} from "../../assets/left_menu";
import logo_small_purple from "../../assets/logo_small_purple.svg";
import { useEffect, useState } from "react";
import { useAuth } from "../../../infra/contexts/auth/UseAuth";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../Sheet";


type MenuLeftProps = {
  buttonSelected: string;
  setButtonSelected: (value: string) => void;
};


export const MenuLeft = ({
  buttonSelected,
  setButtonSelected,
}: MenuLeftProps) => {

  const [theme, setTheme] = useState<string>("light");
  const { user } = useAuth();

  useEffect(() => {
    setTheme(localStorage.getItem("theme")!);
  }, []);


  const items = {
    home: { src: theme === "light" ? home2 : home, alt: "home", to: "/home" },
    search: {
      src: theme === "light" ? search2 : search,
      alt: "search",
      to: "/search",
    },
    foruns: {
      src: theme === "light" ? foruns2 : foruns,
      alt: "foruns",
      to: "/foruns",
    },
    profile: {
      src: theme === "light" ? profile2 : profile,
      alt: "profile",
      to: `/${user?.username}`,
    },
    more: { src: theme === "light" ? more : more2, alt: "more", to: "/more" },
  };

  return (
    <div
      className="md:h-full md:w-[20rem] 
      justify-around items-center flex 
      h-12 w-full absolute bottom-0 border-box 
      border border-stroke md:relative md:flex-col md:items-center
      overflow-hidden md:z-0 z-30 "
    >
      <div className="flex w-full justify-end  mr-2">
        <img className="size-16 flex" src={logo_small_purple} />
      </div>
      <div
        className="h-2/3 w-full justify-between sm:flex-row text-contrast gap-4 
      md:flex-col flex md:bg-transparent bg-fume items-end mr-2 "
      >
        <div
          className="h-[80%] flex md:flex-col md:bg-transparent 
        flex-row bg-fume w-full sh-full gap-6 items-end"
        >
          {Object.values(items).map((item, index) => (
            <MenuLeftItem
              key={index}
              src={item.src}
              alt={item.alt}
              to={item.to}
              buttonSelected={buttonSelected}
              setButtonSelected={setButtonSelected}
            />
          ))}
        </div>
      </div>
      <div className="flex w-full justify-end  mr-2">
        {" "}
        <MenuLeftItem
          buttonSelected={buttonSelected}
          setButtonSelected={setButtonSelected}
          src={config}
          alt={"config"}
        />
      </div>

      <div
        className={`absolute pointer-events-none h-[100%] w-10 bg-copacity_theme rotate-45 blur-2xl mix-blend-color-burn translate-y-40 `}
      />
    </div>
  );
};
