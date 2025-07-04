"use client";
import Header from "@/components/Header";
import ResizableBox from "@/components/ResizeableBox";
import Image from "next/image";
import { techLogos } from "@/constants/imageMap";
import ImageShowcase from "@/components/ImageShowcase";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ContactForm from "@/components/ContactForm";
import AnimatedLink from "@/components/AnimatedLink";
import { socialLinks } from "@/constants/socialLinks";
export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [reset, setReset] = useState(false);
  const handleReset = () => {
    setReset(true);
    setShowModal(false);
  };
  return (
    <div className="items-center justify-items-center gap-16 w-full">
      <Header />
      <main className="flex flex-col w-full items-center">
        <section className="items-center flex flex-col bg-[#f0eeed] rounded-bl-[250] w-full py-40 gap-9 ">
          <Image
            src="/images/marlou.png"
            alt="Profile Picture"
            width={180}
            height={180}
            className="rounded-full aspect-square object-cover border-white border-8"
          />
          <div className="items-center flex flex-col gap-4 mt-4 ">
            <h1 className="font-bold text-8xl text-center">
              Hi, I&apos;m{" "}
              <span className="bg-black text-white px-5">marlou</span>
              <br />
              <span className="font-secondary text-7xl">
                &lt;front-end developer/&gt;
              </span>{" "}
              <span className="relative before:content-[''] before:bg-white before:w-[7.25rem] before:h-[3.5625rem] before:bottom-2 before:left-9 before:absolute ">
                <span className="relative">&amp;&amp; </span>
              </span>
              <br />
              <span className="sr-only">Graphic Designer</span>
            </h1>
            <div className="relative max-w-[700] h-24">
              <ResizableBox
                width={681}
                height={86}
                src="/images/graphic-designer.png"
                alt="Graphic Designer"
                show={showModal}
                setShow={setShowModal}
                reset={reset}
              />
            </div>
            <p className="text-2xl self-end pr-14">
              turning ideas into interactive and beautiful designs
            </p>
          </div>
        </section>
        <section className="bg-[#f0eeed] w-full">
          <div className="flex justify-between w-full px-52 py-36 bg-white rounded-tr-[250] rounded-bl-[250]">
            {techLogos.map(({ src, alt }) => (
              <ImageShowcase key={src} src={src} alt={alt} />
            ))}
          </div>
        </section>
        <section className="flex items-start justify-between w-full gap-[16px] ">
          <div className="bg-[#f0eeed] pt-24 px-32 h-[800] w-[650] rounded-tr-[250] rounded-br-[250] ">
            <h2 className="font-bold text-8xl text-center sr-only">Projects</h2>
            <div className="relative h-24 w-full">
              <ResizableBox
                width={219}
                height={58}
                src="/images/Projects.png"
                alt="Projects"
                show={showModal}
                setShow={setShowModal}
                reset={reset}
              />
            </div>
          </div>
          <div className="flex items-start">
            <p>sample image</p>
            <div className="flex flex-col">
              <Button>Up</Button>
              <Button>Down</Button>
            </div>
          </div>
        </section>

        <div className="bg-[#f0eeed] w-full">
          <div className="flex justify-between w-full h-32 bg-white rounded-tl-[250] "></div>
        </div>

        <section className="flex flex-col justify-between w-full py-32 bg-[#f0eeed] rounded-tl-[180] rounded-tr-[200]">
          <div className="flex flex-col items-center justify-between gap-14 px-56">
            <div className="flex flex-col relative gap-4 items-center">
              <h2 className="font-bold text-6xl text-center">
                Let&apos;s <span className="opacity-0">Build</span>Something
                Beautiful Together
              </h2>
              <div className="absolute top-2 left-33">
                <ResizableBox
                  src="/images/Build.png"
                  alt="Build"
                  width={133}
                  height={46}
                  show={showModal}
                  setShow={setShowModal}
                  reset={reset}
                />
              </div>
              <p className="text-2xl">
                Whether you need a sleek website or standout visuals, I&apos;ve
                got you covered{" "}
              </p>
            </div>
            <div className="grid grid-cols-4 gap-40 items-center justify-between">
              <div className="flex flex-col items-left gap-4">
                <Image
                  src="/icons/monitor.png"
                  width={100}
                  height={100}
                  alt="monitor icon"
                />
                <h3 className="font-bold text-[18px]">Web Development</h3>
                <p>
                  Responsive, fast, and modern websites using HTML, CSS,
                  Javascript, and React.
                </p>
              </div>
              <div className="flex flex-col items-left gap-4">
                <Image
                  src="/icons/paint.png"
                  width={100}
                  height={100}
                  alt="paint icon"
                />
                <h3 className="font-bold text-[18px]">UI / UX Design </h3>
                <p>
                  Clean and user-friendly interfaces built for greater
                  experience.
                </p>
              </div>
              <div className="flex flex-col items-left gap-4">
                <Image
                  src="/icons/puzzle-piece.png"
                  width={100}
                  height={100}
                  alt="puzzle piece icon"
                />
                <h3 className="font-bold text-[18px]">Branding</h3>
                <p>
                  Logos, color palletes, and visual identity that stand-out.
                </p>
              </div>
              <div className="flex flex-col items-left gap-4">
                <Image
                  src="/icons/rocket.png"
                  width={100}
                  height={100}
                  alt="rocket icon"
                />
                <h3 className="font-bold text-[18px]">Landing Pages</h3>
                <p>
                  High-converting landing pages marketing assets for campaigns.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col justify-between w-full  bg-[#f0eeed] ">
          <div className="grid grid-cols-[1fr_2fr] items-start justify-between bg-white gap-14 pt-32 py-12  px-56 rounded-tl-[180] rounded-tr-[200]">
            <div className="flex flex-col gap-2">
              <div className="flex relative">
                <h3 className="font-bold text-6xl opacity-0">Say Hello</h3>
                <div className="absolute">
                  <ResizableBox
                    width={253}
                    height={58}
                    src="/images/say-hello.png"
                    alt="Say hello"
                    show={showModal}
                    setShow={setShowModal}
                    reset={reset}
                  />
                </div>
                <Image
                  src="/icons/hand-wave.png"
                  alt="hand wave"
                  width={67}
                  height={69}
                  className="ml-6"
                />
              </div>
              <p>
                Big ideas, small questions, or just a friendly wave — I’m
                listening.
              </p>
            </div>
            <ContactForm />
          </div>
        </section>
        <section className="flex flex-col items-center gap-[16px]"></section>
      </main>
      <footer className="  pb-5 px-56 w-full ">
        <div className="border-t-[1px] py-12 border-gray-100 flex justify-between w-full">
          <p>Copyright © 2024 Marlou Reyes. All rights reserved.</p>
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
        </div>
      </footer>
      <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
        <div
          className={`flex transition-all duration-500 ease-out  ${
            showModal
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-10"
          } bg-black text-white shadow-md px-6 py-3 items-center gap-3 rounded-b-3xl`}
        >
          <p className="text-sm">
            <span className="font-bold">Oops!</span> 🌍 You stretched or moved
            the universe. Click here to unbend reality and go back to normal.
          </p>
          <Button
            className="rounded-[6px] bg-white py-1 px-4 font-secondary-bold text-black cursor-pointer hover:bg-gray-200"
            onClick={() => handleReset()}
          >
            Undo
          </Button>
        </div>
      </div>
    </div>
  );
}
