import { RefObject, useEffect } from "react";

interface ClickOutsideProps {
  ref: RefObject<HTMLDivElement>;
  callback: () => void;
}

const useClickOutside = ({ ref, callback }: ClickOutsideProps) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
};

export default useClickOutside;
