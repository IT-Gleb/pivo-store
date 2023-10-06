import React from "react";
import { motion } from "framer-motion";

function DoOrderButton() {
  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      className="button is-small is-primary"
    >
      <span className="icon mr-1">
        <i className="fas fa-list"></i>
      </span>
      Сформировать заказ
    </motion.button>
  );
}

export default React.memo(DoOrderButton);
