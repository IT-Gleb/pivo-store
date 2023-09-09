//Hook возвращает размер экрана устройства
import throttle from "lodash/throttle";
import { useEffect, useState } from "react";
import { ThrottleStep } from "../types";

function useScreenWidth() {
  const [screenWidth, setScreenWidth] = useState<number>(0);

  useEffect(() => {
    const checkScreenWidth = throttle(() => {
      // setScreenWidth(window.screen.width);
      setScreenWidth(window.innerWidth);
    }, ThrottleStep);

    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  return {
    screenWidth,
  };
}

export default useScreenWidth;
