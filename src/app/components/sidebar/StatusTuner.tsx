import { useEffect } from "react";
import { Photo } from "../Photo";
import { TbMusicStar } from "react-icons/tb";

export const StatusTuner = () => {
  return (
    <div
      className="md:flex relative  items-center  text-sm w-full p-2 border-l 
    border-stroke hidden"
    >
      <Photo size="2.5" bg="B02851" />
      <div className="w-full px-3 ">
        <div className="flex justify-between w-full">
          <p className="font-bold flex items-center"> melzinho da feira</p>
          <p className="text-copacity_25 text-xs">4h</p>
        </div>
        <p className=" flex items-center font-light gap-1">
          {" "}
          <TbMusicStar /> Mulher de fases - Raimundos
        </p>
      </div>
    </div>
  );
};
