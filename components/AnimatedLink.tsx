"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

interface Props {
  color: string;
  href: string;
  name: string;
}
export default function MarchingAntsTailwind({ color, href, name }: Props) {
  const rectRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    let offset = 0;
    const interval = setInterval(() => {
      offset = (offset + 1) % 100;
      if (rectRef.current) {
        rectRef.current.setAttribute("stroke-dashoffset", offset.toString());
      }
    }, 50); // adjust speed here

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative inline-block group">
      <Link
        href={href}
        className={`relative z-10 px-2 group-hover:text-[color:var(--link-hover)] `}
        style={
          { "--link-hover": color } as React.CSSProperties &
            Record<string, string>
        }
        target="_blank"
        rel="noopener noreferrer"
      >
        {name}
      </Link>
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <rect
          ref={rectRef}
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeDasharray="5,5"
        />
      </svg>
    </div>
  );
}
