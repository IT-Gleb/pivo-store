import React from "react";
import { motion } from "framer-motion";
import PivoNotification from "../../../libs/Notification/notification";
import { usePivoDispatch } from "../../../hooks/storeHooks";
import {
  addNewOrderItem,
  type TOrderItem,
} from "../../../store/slices/currOrderSlice";

function OrderBtn({ paramOrder }: { paramOrder: TOrderItem }) {
  const dispatch = usePivoDispatch();

  const handleOrderClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    //console.log(paramOrder);
    dispatch(addNewOrderItem(paramOrder));

    PivoNotification("Продукт отправлен в заказ...", [
      "has-background-link",
      "has-text-light",
    ]);
  };

  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
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

export default React.memo(OrderBtn);
