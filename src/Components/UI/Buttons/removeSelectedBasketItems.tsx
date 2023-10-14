import React, { startTransition } from "react";
import { motion } from "framer-motion";
import { usePivoDispatch } from "../../../hooks/storeHooks";
import { deleteBasketSelected } from "../../../store/slices/eCartSlice";

function RemoveSelectedBasketItems() {
  const dispatch = usePivoDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    startTransition(() => {
      dispatch(deleteBasketSelected());
    });
  };
  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      className="button is-small is-danger is-light"
      onClick={handleClick}
    >
      <span className="icon mr-1 is-small">
        <i className="fas fa-minus"></i>
      </span>
      Удалить выделенное
    </motion.button>
  );
}

export default React.memo(RemoveSelectedBasketItems);
