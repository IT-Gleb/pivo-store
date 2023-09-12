import React, { useEffect, useState } from "react";
import useScrollWidth from "../../hooks/scrollHook";
import { motion } from "framer-motion";
import { Props } from "../../types";
import useVideoHeight from "../../hooks/videoHeightHook";

function RightMenu({ children }: Props) {
  const { scrollY, size } = useScrollWidth();
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const { videoHeight } = useVideoHeight();
  let tmpH = videoHeight + 75; //75% от величины экрана
  // console.log(tmpH);

  useEffect(() => {
    // console.log(size.height, tmpH, scrollY);
    if (scrollY <= tmpH) {
      if (menuVisible) setMenuVisible(false);
    }
    if (scrollY > tmpH) {
      if (!menuVisible) setMenuVisible(true);
    }

    // console.log(size.width);
  }, [scrollY]);

  return (
    <>
      {menuVisible && (
        <motion.div
          initial={{
            y: -200,
            // transform: size.width < 760 ? "scale(0.65)" : "scale(0.95)",
          }}
          animate={{
            y: 0,
            transform: size.width < 760 ? "scale(0.65)" : "scale(0.95)",
          }}
          exit={{ opacity: 0 }}
          className="rightMenu has-background-dark"
        >
          <div className="buttons are-small pl-2 pt-2 pb-2 is-flex is-flex-direction-column is-align-items-flex-start is-justify-content-start">
            {children}
          </div>
        </motion.div>
      )}
    </>
  );
}

export default React.memo(RightMenu);
