import { useState, useEffect } from "react";
import { IWindowSize, ThrottleStep } from "../types";
import throttle from "lodash/throttle";

function useScrollWidth() {
  const [size, setSize] = useState<IWindowSize>({ width: 0, height: 0 });
  const [scrollY, setScrollY] = useState<number>(window.screenY);

  useEffect(() => {
    const handleSize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    const handleScroll = throttle(() => {
      setScrollY(window.scrollY);
    }, ThrottleStep);

    handleSize();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleSize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleSize);
    };
  }, []);

  return { size, scrollY };
}

export default useScrollWidth;
