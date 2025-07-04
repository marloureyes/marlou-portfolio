import Image from "next/image";
import React from "react";
import CtaButton from "./CtaButton";
import { socialLinks } from "@/constants/socialLinks";
import AnimatedLink from "./AnimatedLink";

const Header = () => {
  return (
    <header className="flex items-center justify-between w-full px-20 py-16 absolute top-0 left-0 z-10 ">
      <div className="flex items-center gap-12">
        <Image src="/logo.svg" alt="Logo" width={172} height={57} />
        <CtaButton />
      </div>
      <div className="flex items-center gap-10">
        {socialLinks.map((item) => (
          <AnimatedLink
            key={item.name}
            name={item.name}
            href={item.url}
            color={item.color}
          />
        ))}
      </div>
    </header>
  );
};

export default Header;
