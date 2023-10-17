import { IPivoItem } from "../../types";
import { motion } from "framer-motion";
import "./slider.scss";
import React, { useRef, useState, useEffect } from "react";
import SmallSliderItem from "./smallSliderItem";

const MSlider = ({ props }: { props: IPivoItem[] }) => {
  const [width, SetWidth] = useState<number>(0);
  const SliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //console.log(SliderRef.current?.scrollWidth, SliderRef.current?.offsetWidth);
    let tmpWidth: number = 300;
    if (SliderRef.current)
      tmpWidth =
        SliderRef.current!.scrollWidth - SliderRef.current!.offsetWidth;
    SetWidth(tmpWidth);
  }, []);

  if (!props || props.length < 1) return null;

  return (
    <motion.div ref={SliderRef} className="sliderWrapper">
      <motion.div
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
        className="sliderLine"
      >
        {props &&
          props.map((item, index) => {
            return (
              <motion.div key={index} className="slider-item">
                <SmallSliderItem {...item} />
              </motion.div>
            );
          })}
      </motion.div>
    </motion.div>
  );
};

export default React.memo(MSlider);
