import { ISliderItemProp } from "../../types";
import MySliderItem from "./MySliderItem";
import { motion } from "framer-motion";
import "./slider.scss";
import { useRef, useState, useEffect } from "react";

function MSlider() {
  const [width, SetWidth] = useState<number>(0);
  const SliderRef = useRef<HTMLDivElement>(null);

  const rec: ISliderItemProp = {
    title: "Hi! item-1",
    image: "",
    body: "Lorem ipsum jkdhf ker fke...",
    width: 25,
  };

  const Ups: ISliderItemProp[] = [
    rec,
    rec,
    rec,
    rec,
    rec,
    rec,
    rec,
    rec,
    rec,
    rec,
    rec,
  ];

  useEffect(() => {
    //console.log(SliderRef.current?.scrollWidth, SliderRef.current?.offsetWidth);
    SetWidth(SliderRef.current!.scrollWidth - SliderRef.current!.offsetWidth);
  }, []);

  return (
    <motion.div ref={SliderRef} className="sliderWrapper">
      <motion.div
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
        className="sliderLine"
      >
        {Ups.map((item, index) => {
          return (
            <motion.div key={index} className="slider-item">
              <MySliderItem {...item} />
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

export default MSlider;
