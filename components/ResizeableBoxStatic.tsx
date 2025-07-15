import { cn } from "@/lib/utils";
import React from "react";
interface Props {
  text: string;
  addClasses?: string;
  spanClass?: string;
}
const ResizeableBoxStatic = ({ text, addClasses, spanClass }: Props) => {
  const handleClasses =
    "absolute bg-white border-2 border-black w-3 h-3 lg:w-4 lg:h-4";
  return (
    <span
      className={cn(
        "not-sr-only lg:sr-only relative border-2 border-black ",
        spanClass
      )}
    >
      <span className={cn("text-black ", addClasses)}>{text}</span>

      {/* Corners */}
      <span
        className={`${handleClasses} top-0 left-0 -mt-2 -ml-2 cursor-nwse-resize`}
      />
      <span
        className={`${handleClasses} top-0 right-0 -mt-2 -mr-2 cursor-nesw-resize`}
      />
      <span
        className={`${handleClasses} bottom-0 left-0 -mb-2 -ml-2 cursor-nesw-resize`}
      />
      <span
        className={`${handleClasses} bottom-0 right-0 -mr-2 -mb-2 cursor-nwse-resize`}
      />

      {/* Sides */}
      <span
        className={`${handleClasses} top-0 left-1/2 -translate-x-1/2 -mt-2 cursor-ns-resize`}
      />
      <span
        className={`${handleClasses} bottom-0 left-1/2 -translate-x-1/2 -mb-2 cursor-ns-resize`}
      />
      <span
        className={`${handleClasses} left-0 top-1/2 -translate-y-1/2 -ml-2 cursor-ew-resize`}
      />
      <span
        className={`${handleClasses} right-0 top-1/2 -translate-y-1/2 -mr-2 cursor-ew-resize`}
      />
    </span>
  );
};

export default ResizeableBoxStatic;
