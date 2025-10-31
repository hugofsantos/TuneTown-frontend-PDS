import React from "react";

export const CloseButton = ({
  onClick,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      className="flex items-center justify-center group"
      aria-label="Close"
      onClick={onClick}
    >
      <p className="flex self-end ">X</p>
      <div className="group-hover:absolute group-hover:size-8 group-hover:bg-copacity_25 opacity-35 group-hover:rounded-full transition-colors duration-300"></div>
    </button>
  );
};
