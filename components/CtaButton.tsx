"use client";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

const CtaButton = () => {
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <Link href="/files/Marlou-cv.pdf" target="_blank" rel="noopener noreferrer">
      <Button
        className="font-secondary-bold cursor-pointer shadow-[3px_3px_0_0_rgba(0,0,0,0.15)] hover:bg-black hover:shadow-[3px_3px_0_0_rgba(0,0,0,0.25)] transition-all  duration-400 ease-in-out rounded-lg  active:translate-y-[3px] active:translate-x-[3px] active:shadow-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Unlock my CV{" "}
        <Image
          src={isHovered ? "/icons/unlock-padlock.png" : "/icons/padlock.png"}
          alt={isHovered ? "Unlock Padlock Icon" : "Padlock Icon"}
          width={20}
          height={20}
        />
      </Button>
    </Link>
  );
};

export default CtaButton;
