import React, { forwardRef, useRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  height?: string;
}
export const LineInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, height, ...props }, ref) => {
    return (
      <div className="flex gap-3 w-full justify-between items-center">
        <label className="text-sm font-light select-none">{label}</label>
        <input
          ref={ref}
          className={`text-start appearance-none bg-slate-200 relative
           px-[calc(theme(spacing[3.5])-1px)] 
           sm:px-[calc(theme(spacing[3])-1px)] w-4/5
            bg-transparent  border-b border-black/50 placeholder:text-zinc-500 sm:text-sm/6 
            text-base/6
            block outline-none focus:outline-none focus:ring-0
            after:inset-0 after:rounded-lg
           `}
          {...props}
        />
      </div>
    );
  },
);
