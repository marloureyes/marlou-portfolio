import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sortType(works: WorkItem[]) {
  const newArr = works;
  newArr.sort((a, b) => {
    const typeA = a.type.toLowerCase();
    const typeB = b.type.toLowerCase();
    if (typeA === "front-end") {
      return -1;
    }
    if (typeB === "graphic-design") {
      return -1;
    }
    return 0;
  });

  return newArr;
}
