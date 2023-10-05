import React from "react";
import { motion } from "framer-motion";
import PivoNotification from "../../../libs/Notification/notification";

function OrderBtn() {
  const handleOrderClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    PivoNotification("Продукт добавлен в заказ...", [
      "has-background-link",
      "has-text-light",
    ]);
  };

  return (
    <motion.button
      whileTap={{ scale: 0.5 }}
      className="button is-small is-info"
      onClick={handleOrderClick}
    >
      <span className="icon mr-1">
        <i className="fas fa-list"></i>
      </span>
      В заказ
    </motion.button>
  );
}

export default OrderBtn;
