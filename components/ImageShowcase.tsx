import React from "react";
import Image from "next/image";
interface Props {
  src: string;
  alt: string;
}
const ImageShowcase = ({ src, alt }: Props) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={110}
      height={110}
      className="transition-all ease-in-out duration-300 grayscale brightness-50 contrast-1 opacity-25 hover:grayscale-0 hover:brightness-200 hover:contrast-100 hover:opacity-80"
    />
  );
};

export default ImageShowcase;
