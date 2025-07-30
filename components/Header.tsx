import Image from "next/image";
import React from "react";
import CtaButton from "./CtaButton";
import { socialLinks } from "@/constants/socialLinks";
import AnimatedLink from "./AnimatedLink";
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "./ui/sheet";
import { Menu } from "lucide-react";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="flex items-center justify-between w-full px-6 py-6 sm:px-20 sm:py-16 absolute top-0 left-0 z-10 ">
      <div className="flex items-center gap-12">
        <Logo className="w-10 h-auto" />
        <CtaButton addClasses="hidden lg:flex" />
      </div>
      <div className="items-center gap-8 hidden lg:flex">
        {socialLinks.map((item) => (
          <AnimatedLink
            key={item.name}
            name={item.name}
            href={item.url}
            color={item.color}
          />
        ))}
      </div>
      <div className="lg:hidden">
        <Sheet>
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <SheetTrigger aria-label="Toggle Navigation" asChild>
            <Menu />
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-3xs p-8 justify-between h-[100dvh] "
          >
            <div>
              <Image
                src="/images/logo-right-text.png"
                alt="Marlou Logo"
                width={130}
                height={0}
                className="mb-8"
              />

              <ul className="flex flex-col gap-6">
                {socialLinks.map((item) => (
                  <li key={item.name}>
                    <AnimatedLink
                      name={item.name}
                      href={item.url}
                      color={item.color}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <CtaButton />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
