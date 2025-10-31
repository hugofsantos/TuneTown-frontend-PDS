import React, { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  full?: boolean;
  bg?: string;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ full, bg, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`flex items-center border font-semibold justify-center text-center 
      ${
        full
          ? "bg-transparent text-theme border border-theme hover:text-theme/10"
          : bg
            ? `${bg} hover:bg-fume/10 border  border-stroke`
            : `bg-theme hover:bg-fume/10 border border-stroke`
      } 
      hover:opacity-90 transition-opacity 
      w-full py-2 rounded-sm text-base`}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
