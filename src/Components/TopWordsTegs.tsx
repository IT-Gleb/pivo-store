import { useEffect, useState, useRef } from "react";
import { randomFrom, TOPMENUVIDEO } from "../libs";
import { motion } from "framer-motion";
import type { TWords } from "../types";

const colors: string[] = [
  "white",
  "aquamarine",
  "lightgreen",
  "yellow",
  "white",
  "aquamarine",
  "lightseagreen",
  "bisque",
  "green",
  "lightseagreen",
  "white",
  "lime",
  "bisque",
];

const WordsP: TWords[] = [
  { Name: "Witbier", fSize: `${randomFrom(10, 72)}px` },
  { Name: "Ale", fSize: `${randomFrom(10, 72)}px` },
  { Name: "Blonde Ale", fSize: `${randomFrom(10, 72)}px` },
  { Name: "Golden Ale", fSize: `${randomFrom(10, 72)}px` },
  { Name: "Tripel", fSize: `${randomFrom(10, 72)}px` },
  { Name: "Dubbel", fSize: `${randomFrom(10, 72)}px` },

  { Name: "Клинское", fSize: `${randomFrom(12, 72)}px` },
  { Name: "Невское", fSize: `${randomFrom(12, 72)}px` },
  { Name: "Балтика", fSize: `${randomFrom(12, 72)}px` },
  { Name: "Старый мельник", fSize: `${randomFrom(10, 36)}px` },
  { Name: "Толстяк", fSize: `${randomFrom(12, 72)}px` },
  { Name: "Солодов", fSize: `${randomFrom(12, 72)}px` },
  { Name: "Бочкарёв", fSize: `${randomFrom(12, 72)}px` },
  { Name: "Золотая бочка", fSize: `${randomFrom(12, 72)}px` },

  { Name: "Quadrupel", fSize: `${randomFrom(10, 72)}px` },
  { Name: "Dunkelweizen", fSize: `${randomFrom(10, 72)}px` },
  { Name: "Porter", fSize: `${randomFrom(10, 72)}px` },
  { Name: "Stout", fSize: `${randomFrom(10, 72)}px` },
  { Name: "Pilsner", fSize: `${randomFrom(10, 72)}px` },
  { Name: "Kellerbier", fSize: `${randomFrom(10, 72)}px` },
  { Name: "Doppelbock", fSize: `${randomFrom(10, 72)}px` },
  { Name: "Bock", fSize: `${randomFrom(10, 72)}px` },
  { Name: "Weizenbock", fSize: `${randomFrom(10, 72)}px` },
  { Name: "Eisbock", fSize: `${randomFrom(10, 72)}px` },
  { Name: "Schwarzbier", fSize: `${randomFrom(10, 72)}px` },
  { Name: "Maibock", fSize: `${randomFrom(10, 72)}px` },
  { Name: "Lambic", fSize: `${randomFrom(10, 72)}px` },
  { Name: "Altbier", fSize: `${randomFrom(10, 72)}px` },
  { Name: "Rauchbier", fSize: `${randomFrom(10, 72)}px` },
  { Name: "Saison Ale", fSize: `${randomFrom(10, 72)}px` },
  { Name: "Amber Ale", fSize: `${randomFrom(10, 72)}px` },
  { Name: "Oud Bruin", fSize: `${randomFrom(10, 72)}px` },
  { Name: "Brown Ale", fSize: `${randomFrom(10, 72)}px` },
  { Name: "Münchener Hell", fSize: `${randomFrom(10, 72)}px` },
  { Name: "Wiener Lager", fSize: `${randomFrom(10, 72)}px` },
  { Name: "Dunkel Lager", fSize: `${randomFrom(10, 72)}px` },
];

function WordsTegs() {
  const [width, setWidth] = useState<number>(400);
  const [height, setHeight] = useState<number>(280);
  const videoRef = useRef<any>();

  const WordsAnimation = {
    visible: (i: any) => ({
      opacity: 1,
      x: 0,
      y: 0,
      scale: width < 961 ? 0.5 : 1,
      transition: { delay: i * 0.12 },
    }),
    hidden: (i: any) => ({
      opacity: 0,
      x: i % 2 === 0 ? -10 : 10,
      y: -150,
      scale: 0.25,
    }),
  };

  function initWidthandHeight(): void {
    //console.log(window.innerWidth);
    videoRef.current = document.getElementById(TOPMENUVIDEO);
    setWidth(window.innerWidth);
    setHeight(calcHeight());
  }

  function calcHeight(): number {
    let h = 0;
    if (videoRef.current) {
      h = videoRef.current.clientHeight - 30;
      //console.log(videoRef.current.clientHeight);
    } else h = Math.floor((window.innerHeight / 100) * 30);
    return h;
  }

  useEffect(() => {
    initWidthandHeight();
    window.addEventListener("resize", initWidthandHeight);
    return () => {
      window.removeEventListener("resize", initWidthandHeight);
      //console.log("remove...");
    };
  }, []);

  // const HandleDiv = (event: React.MouseEvent<HTMLDivElement>) => {
  //   event.preventDefault();
  //   console.log("div clicked");
  // };

  return (
    <div
      className="wordsWrapper"
      style={{
        position: "absolute",
        top: "50px",
        left: 0,
        width: `${width}px`,
        // height: width < 960 ? "42vh" : "80vh",
        height: `${height}px`,
        overflow: "hidden",
        zIndex: 2,
      }}
      // onClick={HandleDiv}
    >
      {WordsP.map((item, index) => {
        return (
          <motion.div
            variants={WordsAnimation}
            custom={index + 1.8}
            initial="hidden"
            animate="visible"
            transition={{
              // delay: 3,
              duration: randomFrom(0.25, 0.5),
              ease: "easeOut",
            }}
            key={index}
            className="wordsItem subtitle"
            style={{
              position: "absolute",
              fontSize: item.fSize,
              color: colors[randomFrom(0, colors.length - 1)],
              left:
                width < 768
                  ? `${randomFrom(
                      0,
                      width - width / 2 - randomFrom(10, 120)
                    )}px`
                  : `${randomFrom(width / 2 - width / 3 - 50, width / 1.6)}px`,
              top:
                height < 500
                  ? `${randomFrom(-10, height / 2.5)}px`
                  : `${randomFrom(1, height / 1.7 + 50)}px`,
              // backgroundColor: `rgba(${randomFrom(100, 255)}, ${randomFrom(
              //   120,
              //   255
              // )}, ${randomFrom(120, 255)}, 0.5)`,
              padding: "1.2rem 2.5rem",
              // borderRadius: "50% 50%",
              // border: "2px solid rgba(255, 255, 255, 0.5)",
              // borderRight: "0 solid transparent",
              // borderLeft: "0 solid transparent",
              overflow: "hidden",
              verticalAlign: "middle",
              textAlign: "center",
              textShadow: "-2px 2px rgba(0, 0, 0, 0.75)",
            }}
          >
            {item.Name}
          </motion.div>
        );
      })}
    </div>
  );
}

export default WordsTegs;
