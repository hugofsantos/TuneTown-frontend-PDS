import React, { forwardRef, useRef } from "react";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  height?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, height, ...props }, ref) => {
    return (
      <div className="flex flex-col w-full space-y-">
        <label className="text-sm font-light select-none">{label}</label>
        <textarea
          ref={ref}
          className={`rounded-sm ${
            height ? `h-${height}` : `h-8`
          } text-start appearance-none bg-slate-200 relative
           px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] 
           sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] 
            bg-transparent ring-1 ring-white/30 placeholder:text-zinc-500 sm:text-sm/6 
            text-base/6
            block
            focus:ring-0 
            hover:ring-white/40
            after:inset-0 after:rounded-lg
           `}
          {...props}
        />
      </div>
    );
  },
);
