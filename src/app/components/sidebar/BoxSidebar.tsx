export const BoxSidebar = ({ children }: { children: React.ReactNode }) => {


    return (
      <div
        className="flex overflow-hidden 
        items-start justify-start flex-col 
        h-[55%] gap-2 rounded-md w-full overflow-y-auto
        bg-fume border border-stroke clip-path "
      >
        {children}
      </div>
    );
}