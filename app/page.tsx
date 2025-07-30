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
import ThingsIMade from "@/components/ThingsIMade";
import ResizeableBoxStatic from "@/components/ResizeableBoxStatic";
import { services } from "@/constants/servicesMap";
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
        <section className="w-full">
          <div className=" bg-[#f0eeed] sm:px-20 rounded-bl-[100] lg:rounded-bl-[250] ">
            <div className="items-center flex flex-col px-6  w-full pt-32 pb-26 md:py-40 gap-9 2xl:max-w-7xl mx-auto">
              <Image
                src="/images/marlou.png"
                alt="Profile Picture"
                width={180}
                height={180}
                className="rounded-full aspect-square object-cover border-white border-8"
              />
              <div className="flex flex-col gap-4 mt-4 w-full">
                <h1 className="font-bold text-4xl sm:text-6xl lg:text-7xl xl:text-8xl text-center leading-tight lg:leading-none">
                  Hi, I&apos;m{" "}
                  <span className="bg-black text-white px-5">marlou</span>
                  <br />
                  <span className="font-secondary text-3xl sm:text-5xl lg:text-6xl xl:text-7xl">
                    &lt;front-end developer/&gt;
                  </span>{" "}
                  <span className="relative inline-block">
                    <span className=" bg-white h-[20px] w-[40px]  sm:h-[40px] sm:w-[80px] xl:h-[50px] xl:w-[110px] absolute bottom-1 sm:bottom-2 lg:bottom-1 -right-4"></span>
                    <span className="relative z-10">&amp;&amp; </span>
                  </span>
                  <br />
                  <ResizeableBoxStatic
                    text="Graphic Designer"
                    addClasses="font-black text-3xl sm:text-6xl bg-gradient-to-r from-black to-[#919191] bg-clip-text text-transparent"
                  />
                </h1>
                <div className="relative w-[700] mx-auto h-24 z-50 hidden lg:block">
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
                <p className=" text-center text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl lg:ml-[400px]">
                  turning ideas into interactive and beautiful designs.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-[#f0eeed] w-full">
          <div className="overflow-hidden whitespace-nowrap w-full h-[10rem] md:h-[23rem] bg-white rounded-tr-[100] rounded-bl-[100] lg:rounded-tr-[250] lg:rounded-bl-[250]">
            <div className="animate-marquee flex justify-between items-center gap-6 md:gap-20 w-full h-full">
              {techLogos.map(({ src, alt }) => (
                <ImageShowcase
                  key={src}
                  src={src}
                  alt={alt}
                  addClasses="h-[50px] md:h-full"
                />
              ))}
              {techLogos.map(({ src, alt }) => (
                <ImageShowcase
                  key={src}
                  src={src}
                  alt={alt}
                  addClasses="h-[50px] md:h-full"
                />
              ))}
              {techLogos.map(({ src, alt }) => (
                <ImageShowcase
                  key={src}
                  src={src}
                  alt={alt}
                  addClasses="h-[50px] md:h-full"
                />
              ))}
            </div>
          </div>
        </section>
        <ThingsIMade
          showModal={showModal}
          setShowModal={setShowModal}
          reset={reset}
        />
        <section className="flex w-full py-20 mt-24 lg:mt-18 lg:py-32 bg-[#f0eeed] rounded-tl-[100] rounded-tr-[100] lg:rounded-tl-[180] lg:rounded-tr-[180]">
          <div className="flex flex-col items-center justify-between gap-20 px-10 md:px-20 lg:px-32">
            <div className="flex flex-col gap-4 items-center text-center">
              <h2 className="font-black text-4xl sm:text-5xl lg:text-6xl bg-gradient-to-r from-black to-[#919191] bg-clip-text text-transparent leading-[1.2]">
                Let&apos;s{" "}
                <span className="relative">
                  <ResizeableBoxStatic
                    text="Build"
                    spanClass="lg:not-sr-only lg:opacity-0 opacity-100"
                  />
                  <ResizableBox
                    src="/images/Build.png"
                    alt="Build"
                    width={133}
                    height={46}
                    show={showModal}
                    setShow={setShowModal}
                    reset={reset}
                    yAxis={13}
                    xAxis={5}
                  />{" "}
                </span>
                Something Beautiful Together
              </h2>
              <p className="sm:text-md md:text-base lg:text-lg xl:text-xl">
                Whether you need a sleek website or standout visuals, I&apos;ve
                got you covered{" "}
              </p>
            </div>
            <div className="grid md:grid-cols-2 md:grid-rows-2 xl:grid-cols-4 xl:grid-rows-none gap-20 items-center justify-between">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center max-w-prose gap-4"
                >
                  <Image
                    src={service.icon}
                    width={100}
                    height={100}
                    alt={`${service.title} icon`}
                  />
                  <h3 className="font-bold text-[18px]">{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="flex flex-col justify-between w-full  bg-[#f0eeed] ">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] items-center lg:items-start justify-between bg-white gap-10 md:gap-14 pt-20 xl:pt-32  px-10 lg:px-32 rounded-tl-[100] rounded-tr-[100] lg:rounded-tl-[180] lg:rounded-tr-[180]">
            <div className="flex flex-col  gap-4 items-center lg:items-start text-center lg:text-left">
              <Image
                src="/icons/hand-wave.png"
                alt="hand wave"
                width={67}
                height={69}
                className="hidden lg:block xl:hidden"
              />
              <div className="flex items-center gap-3 sm:gap-4">
                <h2 className="font-black text-4xl sm:text-6xl text-center leading-tight lg:leading-none lg:sr-only ">
                  <ResizeableBoxStatic
                    text="Say Hello"
                    addClasses="bg-gradient-to-r from-black to-[#919191] bg-clip-text text-transparent"
                  />
                </h2>
                <div className="relative w-[253] mx-auto h-[58px] z-50 hidden lg:block">
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
                  className="lg:hidden xl:block"
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
      <footer className=" px-10 lg:px-32 w-full ">
        <div className="border-t-[1px] py-12 border-gray-100 flex flex-col lg:flex-row gap-7 items-center text-center justify-between w-full">
          <p>Copyright © 2025 Marlou Reyes. All rights reserved.</p>
          <div className="flex items-center gap-5 md:gap-10">
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
