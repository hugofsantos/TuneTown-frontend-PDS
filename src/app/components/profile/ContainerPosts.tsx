export const ContainerPosts = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  return (
    <div className="items-center w-[90%]  justify-center  place-items-center flex flex-col gap-3 py-4">
      {children}
    </div>
  );
};
