import { MenuLeft } from "../components/menuLeft/MenuLeft.tsx";
import { ThemeButton } from "../components/ThemeButton.tsx";
import { Sidebar } from "../components/sidebar/Sidebar.tsx";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

export const ContainerCentral = ({
  children,
}: {
  children: JSX.Element | JSX.Element[] | string | string[];
}) => {
  const location = useLocation();

  const [buttonSelected, setButtonSelected] = useState<string>(
    location.pathname,
  );
  const items = useMemo(
    () => ["home", "search", "foruns", "more", "config"],
    [],
  );

  useEffect(() => {
    const path = location.pathname.split("/")[1];
    if (!items.includes(path)) {
      setButtonSelected("profile");
    } else {
      setButtonSelected(path);
    }
  }, [location.pathname, items]);

  return (
    <div className="bg-base text-contrast items-center  flex fixed w-screen h-screen text-balance">
      <div className="absolute hidden md:flex md:top-4 md:z-40 md:left-4">
        <ThemeButton />
      </div>

      <MenuLeft
        buttonSelected={buttonSelected}
        setButtonSelected={setButtonSelected}
      />

      <div
        className="h-full space-y-5 mx-2 md:mx-0 
        w-full md:w-[55rem] flex relative 
        flex-col overflow-y-auto scroll-smooth scroll items-center"
      >
        {children}
      </div>

      <Sidebar />
    </div>
  );
};
