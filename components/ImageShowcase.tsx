import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
interface Props {
  src: string;
  alt: string;
  addClasses?: string;
}
const ImageShowcase = ({ src, alt, addClasses }: Props) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={110}
      height={0}
      className={cn(
        "transition-all ease-in-out duration-300 grayscale brightness-50 contrast-1 opacity-25 hover:grayscale-0 hover:brightness-200 hover:contrast-100 hover:opacity-80",
        addClasses
      )}
    />
  );
};

export default ImageShowcase;
