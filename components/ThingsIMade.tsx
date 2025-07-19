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
  // CarouselNext,
  // CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Carousel } from "./ui/carousel";
import { works } from "@/constants/workMap";
import { cn, sortType } from "@/lib/utils";
// import Link from "next/link";
// import Image from "next/image";
// import { Button } from "./ui/button";
// import { ExternalLink, GitBranchIcon, Palette } from "lucide-react";
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
  const [isFrontEnd, setIsFrontEnd] = React.useState(true);

  useEffect(() => {
    if (works.length > 0) {
      const sorted: WorkItem[] = sortType(works).map((item, index) =>
        index === 0
          ? { ...item, isSelected: true }
          : { ...item, isSelected: false }
      );
      setNewWorks(sorted);
      setIsFrontEnd(true);
    }
  }, []);

  useEffect(() => {
    const newArr = newWorks.filter(({ isSelected }) => isSelected === true);
    if (newArr.length > 0 && newArr[0].type === "front-end") {
      setIsFrontEnd(true);
    } else {
      setIsFrontEnd(false);
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
    <section className="grid lg:grid-cols-[1fr_2fr] w-full gap-12 ">
      <div className="bg-[#f0eeed] pt-24 px-32 h-[800] w-[650] rounded-tr-[250] rounded-br-[250] hidden lg:block">
        <h2 className="font-bold text-8xl text-center sr-only">
          Things I Made
        </h2>
        <div className="relative h-24 w-full z-50">
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
        <ul className="space-y-12 text-gray-800 pl-10 mt-4">
          <li className="space-y-4">
            <h3
              className={cn(
                `font-bold text-3xl`,
                !isFrontEnd && "text-gray-500 opacity-80"
              )}
            >
              Front-end
            </h3>
            <ul className="space-y-4 pl-8 font-bold text-2xl">
              {newWorks.map(({ type, name, title, isSelected }, index) =>
                type === "front-end" ? (
                  <li key={name} className="relative inline-block group">
                    <button
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
                  </li>
                ) : null
              )}
            </ul>
          </li>
          <li className="space-y-4">
            <h3
              className={cn(
                `font-bold text-3xl`,
                isFrontEnd && "text-gray-500 opacity-80"
              )}
            >
              Graphic Design
            </h3>
            <ul className="space-y-4 pl-8 font-bold text-2xl">
              {newWorks.map(({ type, name, title, isSelected }, index) =>
                type === "graphic-design" ? (
                  <li key={name} className="relative inline-block group">
                    <button
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
                  </li>
                ) : null
              )}
            </ul>
          </li>
        </ul>
      </div>
      <div className="w-full items-center bg-[#f0eeed] py-16 lg:rounded-[100px] lg:shadow-inner">
        <div>
          <h2 className="font-bold text-4xl sm:text-5xl lg:text-6xl text-center leading-tight lg:leading-none">
            <ResizeableBoxStatic
              text="Things I Made"
              addClasses="text-3xl sm:text-6xl bg-gradient-to-r from-black to-[#919191] bg-clip-text text-transparent"
            />
          </h2>
        </div>
        <Carousel setApi={setApi} className="flex w-full lg:max-w-3xl mx-auto ">
          {/* <CarouselPrevious className="hidden lg:block" />
          <CarouselContent className="flex gap-20">
            {newWorks.map(
              ({
                name,
                type,
                demoLink,
                title,
                link,
                image: { altText, imageUrl },
              }) => (
                <CarouselItem key={name} className="w-full py-4 lg:px-16 -ml-0">
                  <div className="h-full w-full lg:max-h-[600px] rounded-2xl overflow-hidden shadow-lg relative group">
                    <div className="absolute bottom-0 bg-gradient-to-t from-neutral-500 to-transparent flex items-center justify-between w-full text-white py-6 px-6 opacity-0 transition-all duration-500 group-hover:opacity-100">
                      <h4 className="font-bold">{title}</h4>
                      <div className="flex items-center gap-2 font-secondary-bold text-sm">
                        {type &&
                          (type === "front-end" ? (
                            <>
                              <Button size="sm">
                                <Link
                                  href={demoLink || ""}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center"
                                >
                                  Live demo
                                  <ExternalLink className="ml-1" />
                                </Link>
                              </Button>
                              <Button variant="link" className="text-white">
                                <Link
                                  href={link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center"
                                >
                                  <GitBranchIcon className="mr-1" />
                                  View Source
                                </Link>
                              </Button>
                            </>
                          ) : (
                            <Button variant="link" className="text-white">
                              <Link
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center"
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
                      width={800}
                      height={0}
                      className="h-[300px] w-full object-cover object-top"
                      priority
                    />
                  </div>
                </CarouselItem>
              )
            )}
          </CarouselContent>
          <CarouselNext className="hidden lg:block" /> */}
        </Carousel>
      </div>
    </section>
  );
};

export default ThingsIMade;
