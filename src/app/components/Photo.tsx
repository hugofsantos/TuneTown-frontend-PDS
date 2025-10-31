interface PhotoProps {
  size?: string;
  bg?: string;
  src?: string | null;
}
export const Photo = ({ size, bg, src }: PhotoProps) => {
  return src ? (
    <img
      style={{
        height: `${size}rem`,
        width: `${size}rem`,
        backgroundColor: `#${bg}`,
      }}
      className={`flex-none rounded-full ${!bg ? "bg-[#d9d9d9]" : ""}`}
      src={src}
    />
  ) : (
    <div
      style={{
        height: `${size}rem`,
        width: `${size}rem`,
        backgroundColor: `#${bg}`,
      }}
      className={`flex-none rounded-full ${!bg ? "bg-[#d9d9d9]" : ""}`}
    />
  );
};
