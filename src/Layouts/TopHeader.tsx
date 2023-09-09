import React, { useEffect, useRef } from "react";

import MainTopMenu from "../Components/Menu/MainTopMenu";

import myVideo1 from "../assets/imgs/video/pivo_back_1.mp4";
import WordsTegs from "../Components/TopWordsTegs";
import { TOPMENUVIDEO } from "../libs";
import useScrollWidth from "../hooks/scrollHook";

const VIDEO_STOP_PADDING = 150;

function TopVideo() {
  const { scrollY } = useScrollWidth();
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleContextMenu = (event: React.MouseEvent<HTMLVideoElement>) => {
    event.preventDefault();
    return false;
  };

  useEffect(() => {
    if (videoRef.current) {
      let tmpHeight = videoRef.current.clientHeight;
      if (scrollY > tmpHeight - VIDEO_STOP_PADDING) {
        if (videoRef.current.played) videoRef.current.pause();
      } else if (scrollY < tmpHeight - VIDEO_STOP_PADDING) {
        if (videoRef.current.paused) videoRef.current.play();
      }
    }
  }, [scrollY]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      onContextMenu={handleContextMenu}
      id={TOPMENUVIDEO}
      placeholder=""
    >
      <source src={myVideo1} type="video/mp4" />
    </video>
  );
}

function TopHeader() {
  return (
    <div className="hero p-0 has-background-dark">
      <div className="hero-body is-relative p-0">
        <MainTopMenu />
        <TopVideo />
        <WordsTegs />
      </div>
    </div>
  );
}

export default React.memo(TopHeader);
