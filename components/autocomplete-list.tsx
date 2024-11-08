"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "components/ui/button";

type AutoCompleteListProps = {
  searchTerm?: string;
  show: boolean;
  onHide: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: (datum: any) => void;
};

export default function AutoCompleteList({
  searchTerm = "",
  show,
  onHide,
  data = [],
  onClick,
}: AutoCompleteListProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onHide();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onHide]);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 200); // Match this with your transition duration
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!isVisible && !show) return null;

  return (
    <div
      ref={ref}
      className={`absolute mt-1 min-w-[160px] max-w-[250px] overflow-auto rounded-md border border-border bg-popover text-base shadow-md focus:outline-none sm:text-sm
        ${
          show
            ? "animate-in fade-in slide-in-from-top-1 duration-200"
            : "animate-out fade-out slide-out-to-top-1 duration-150"
        }`}
    >
      {data.length > 0 &&
        data.map((datum) => {
          const { name: datumName, id } = datum;
          const name = datumName.toLowerCase();
          let string, highlightedText, endString;
          const nameIndex = name.indexOf(searchTerm);

          console.log(name);
          if (searchTerm.length) {
            string = datumName.substr(0, nameIndex);
            endString = datumName.substr(nameIndex + searchTerm.length);
            highlightedText = datumName.substr(nameIndex, searchTerm.length);
          }
          return (
            <Button
              className="w-full justify-start rounded-none border-border px-3 py-2 [&:not(:last-child)]:border-b"
              variant="ghost"
              key={id}
              onClick={() => onClick(datum)}
            >
              {searchTerm.length ? (
                <span>
                  {string}
                  <span className="font-semibold">{highlightedText}</span>
                  {endString}
                </span>
              ) : (
                name
              )}
            </Button>
          );
        })}
    </div>
  );
}
