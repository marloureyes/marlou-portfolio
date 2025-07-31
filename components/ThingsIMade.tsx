"use client";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import ResizableBox from "./ResizeableBox";
import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Carousel } from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { works } from "@/constants/workMap";
import { cn, sortType } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { ExternalLink, GitBranchIcon, Palette } from "lucide-react";
import ResizeableBoxStatic from "./ResizeableBoxStatic";

interface Props {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  reset: boolean;
}
const ThingsIMade = ({ showModal, setShowModal, reset }: Props) => {
  const rectRef = useRef<SVGRectElement>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [newWorks, setNewWorks] = useState<WorkItem[]>([]);
  const [selectedType, setSelectedType] = React.useState("");
  const workCategory = ["front-end", "graphic-design"];

  useEffect(() => {
    if (works.length > 0) {
      const sorted: WorkItem[] = sortType(works).map((item, index) =>
        index === 0
          ? { ...item, isSelected: true }
          : { ...item, isSelected: false }
      );
      setNewWorks(sorted);
      // setSelectedType(true);
    }
  }, []);

  useEffect(() => {
    const newArr = newWorks.filter(({ isSelected }) => isSelected === true);
    if (newArr.length > 0 && newArr[0].type === "front-end") {
      setSelectedType("front-end");
    } else {
      setSelectedType("graphic-design");
    }
  }, [newWorks]);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      const current = api.selectedScrollSnap();
      const newArr = newWorks;
      const sorted: WorkItem[] = newArr.map((item, index) =>
        index === current
          ? { ...item, isSelected: true }
          : { ...item, isSelected: false }
      );
      setNewWorks(sorted);
    });
  }, [api, newWorks]);

  const handleClickText = (e: number) => {
    const newArr = newWorks;
    const sorted: WorkItem[] = newArr.map((item, index) =>
      index === e
        ? { ...item, isSelected: true }
        : { ...item, isSelected: false }
    );
    setNewWorks(sorted);
    if (api) api.scrollTo(e);
  };

  useEffect(() => {
    let offset = 0;
    const interval = setInterval(() => {
      offset = (offset + 1) % 100;
      if (rectRef.current) {
        rectRef.current.setAttribute("stroke-dashoffset", offset.toString());
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full">
      <div className="flex flex-col gap-0  bg-[#f0eeed] rounded-tr-[100] rounded-br-[100] relative container-border-radius   pb-20 lg:bg-transparent lg:flex-row w-full lg:gap-10 lg:pr-16">
        <div
          className="w-full lg:max-w-[500] lg:h-fit lg:relative works-nav-border-radius "
          aria-labelledby="section-heading"
        >
          <div className="lg:relative lg:bg-[#f0eeed] py-16 lg:pl-16 lg:pr-8   lg:rounded-tr-[120] lg:rounded-br-[120]">
            <h2
              id="section-heading"
              className="font-bold text-center text-4xl md:text-6xl lg:sr-only"
            >
              <ResizeableBoxStatic text="Things I Made" />
            </h2>
            <div className="absolute h-auto w-auto z-50 hidden lg:block">
              <ResizableBox
                width={350}
                height={58}
                src="/images/things-i-made.png"
                alt="Things I Made"
                show={showModal}
                setShow={setShowModal}
                reset={reset}
              />
            </div>
            <ul className="space-y-12 text-gray-800 pl-10 mt-24 hidden lg:block">
              {workCategory.map((category) => (
                <li className="space-y-4" key={category}>
                  <h3
                    id={`tablist-heading-${category}`}
                    className={cn(
                      `font-bold lg:text-2xl xl:text-3xl`,
                      selectedType !== category && "text-gray-500 opacity-80"
                    )}
                  >
                    {category === "front-end" ? "Front-End" : "Graphic Design"}
                  </h3>
                  <ul
                    role="tablist"
                    aria-labelledby={`tablist-heading-${category}`}
                    className="space-y-4 pl-8 font-bold text-2xl flex flex-col"
                  >
                    {newWorks.map(({ type, name, title, isSelected }, index) =>
                      type === category ? (
                        <li key={name}>
                          <div className="relative inline-block group">
                            <button
                              id={`tab-${index}`}
                              role="tab"
                              aria-controls={`slide-${index}`} // 👈 Connects to slide container
                              aria-selected={isSelected}
                              aria-current={isSelected ? "true" : undefined}
                              className={cn(
                                `relative px-2 group-hover:text-gray-900 text-gray-500 cursor-pointer opacity-80`,
                                isSelected && "text-black"
                              )}
                              onClick={() => handleClickText(index)}
                            >
                              {title}
                            </button>
                            {isSelected && (
                              <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 transition-opacity">
                                <rect
                                  ref={rectRef}
                                  x="0"
                                  y="0"
                                  width="100%"
                                  height="100%"
                                  fill="none"
                                  stroke="#000000"
                                  strokeWidth="6"
                                  strokeDasharray="5,5"
                                />
                              </svg>
                            )}
                          </div>
                        </li>
                      ) : null
                    )}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Carousel
          setApi={setApi}
          className="w-full max-w-6xl mx-auto relative group cursor-grab"
          plugins={[Autoplay({ delay: 20000 })]}
        >
          <CarouselPrevious className="opacity-100 lg:opacity-0 disabled:opacity-0 group-hover:opacity-100 group-hover:disabled:opacity-50 transition-all duration-300 ease-in-out" />

          <CarouselContent>
            {newWorks.map(
              ({
                name,
                type,
                demoLink,
                title,
                link,
                image: { altText, imageUrl, isSmallImage },
              }) => (
                <CarouselItem
                  key={name}
                  className="pl-0"
                  id={`slide-${name}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${name}`}
                >
                  <div className="pb-6 px-10 lg:px-6">
                    <div className=" w-full  h-[70vh] lg:h-[600px] drop-shadow-xl bg-gray-800 rounded-4xl overflow-hidden relative">
                      <div className="absolute bottom-0 z-10 w-full bg-gradient-to-t from-neutral-400 to-transparent flex flex-col xl:flex-row gap-2 items-center justify-between  text-white py-6 px-6 opacity-100 transition-all duration-500">
                        <h4 className="font-bold">{title}</h4>
                        <div className="flex flex-wrap justify-center items-center gap-2 font-secondary-bold text-sm">
                          {type &&
                            (type === "front-end" ? (
                              <>
                                <Button size="sm" asChild>
                                  <Link
                                    href={demoLink || ""}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center"
                                    aria-label={`View live demo for ${title}`}
                                  >
                                    Live demo
                                    <ExternalLink className="ml-1" />
                                  </Link>
                                </Button>
                                <Button
                                  variant="link"
                                  className="text-white"
                                  asChild
                                >
                                  <Link
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center"
                                    aria-label={`View source for ${title}`}
                                  >
                                    <GitBranchIcon className="mr-1" />
                                    View Source
                                  </Link>
                                </Button>
                              </>
                            ) : (
                              <Button
                                variant="link"
                                className="text-white"
                                asChild
                              >
                                <Link
                                  href={link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center"
                                  aria-label={`View more for ${title}`}
                                >
                                  <Palette className="mr-1" />
                                  View more
                                </Link>
                              </Button>
                            ))}
                        </div>
                      </div>
                      <Image
                        src={imageUrl}
                        alt={altText}
                        fill
                        className={`h-full w-full ${
                          isSmallImage
                            ? "object-contain"
                            : "object-cover object-top"
                        }`}
                        priority
                      />
                    </div>
                  </div>
                </CarouselItem>
              )
            )}
          </CarouselContent>
          <CarouselNext className="opacity-100  lg:opacity-0 disabled:opacity-0 group-hover:opacity-100 group-hover:disabled:opacity-50 transition-all duration-300 ease-in-out" />
        </Carousel>
      </div>
      {/* </div> */}
    </section>
  );
};

export default ThingsIMade;
