interface ImageProps {
  src: string;
  alt: string;
}

export const Img = ({ src, alt }: ImageProps) => {
  return <img className="w-6 h-auto" src={src} alt={alt} />;
};
