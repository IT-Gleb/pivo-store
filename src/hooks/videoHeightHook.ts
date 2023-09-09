import { useLayoutEffect, useState, useRef } from "react";
import { TOPMENUVIDEO } from "../libs";

function useVideoHeight() {
  const [videoHeight, setVideoHeight] = useState<number>(0);
  const videoRef = useRef<any>(null);

  useLayoutEffect(() => {
    const checkHeight = () => {
      videoRef.current = document.getElementById(TOPMENUVIDEO);
      if (videoRef.current) {
        setVideoHeight(videoRef.current.clientHeight);
      }
    };
    checkHeight();
    window.addEventListener("resize", checkHeight);
    return () => {
      window.removeEventListener("resize", checkHeight);
      videoRef.current = null;
    };
  }, []);

  return {
    videoHeight,
  };
}

export default useVideoHeight;
