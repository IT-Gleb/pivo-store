import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gamburgerMenu } from "../../types";

function SmallMenu({
  paramLogIn,
  paramLogOut,
  paramClose,
}: {
  paramLogIn: (event: React.MouseEvent<HTMLButtonElement>) => void;
  paramLogOut: (event: React.MouseEvent<HTMLButtonElement>) => void;
  paramClose: () => void;
}): JSX.Element {
  const thisMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outFunc = (event: MouseEvent) => {
      //console.log(event.target);
      const gamburger = document.getElementById(gamburgerMenu);

      if (event.target !== thisMenuRef.current && gamburger !== event.target) {
        //        console.log("No menu clicked...");
        paramClose();
      }
    };

    if (thisMenuRef.current) {
      document.body.addEventListener("click", outFunc);
    }
    return () => {
      if (thisMenuRef.current) {
        document.body.removeEventListener("click", outFunc);
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ scale: 0.1 }}
      animate={{ scale: 1 }}
      //   exit={{ scale: 0.1 }}
      className="has-background-dark"
      style={{ top: 40, right: 5, position: "absolute", minWidth: 130 }}
      id="smallMenu"
      ref={thisMenuRef}
    >
      <div className="block p-2 is-flex is-flex-direction-column">
        <motion.button
          className="button is-small is-primary"
          onClick={(e) => paramLogIn(e)}
        >
          Войти
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.8 }}
          className="button is-small is-danger mt-2"
          onClick={(e) => paramLogOut(e)}
        >
          Выйти
        </motion.button>
      </div>
    </motion.div>
  );
}

export default React.memo(SmallMenu);
