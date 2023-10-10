import React from "react";
import { motion } from "framer-motion";
import { usePivoDispatch, usePivoSelector } from "../../../hooks/storeHooks";
import {
  type IOrder,
  clearCurrOrder,
} from "../../../store/slices/currOrderSlice";
import { addNew_Orders_Item } from "../../../store/slices/ordersSlice";
import { randomFrom } from "../../../libs";
import PivoNotification from "../../../libs/Notification/notification";

function DoOrderButton() {
  const currOrder = usePivoSelector((state) => state.currentOrder);
  const dispatch = usePivoDispatch();

  const handleNewOrder = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    let tmpDt: number = Date.now();
    let tmpNum: string =
      `order № ${randomFrom(100, 999)}/00` + randomFrom(1, 99);
    let tmpOrder: IOrder = Object.assign({}, currOrder);
    tmpOrder.orderDate = tmpDt;
    tmpOrder.orderNum = tmpNum;

    dispatch(addNew_Orders_Item(tmpOrder));

    dispatch(clearCurrOrder());
    PivoNotification(`Текущий заказ - ${tmpNum} - успешно сформирован!`, [
      "has-background-warning",
      "has-text-dark",
    ]);
  };

  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      className="button is-small is-success has-text-light"
      onClick={handleNewOrder}
    >
      <span className="icon mr-1">
        <i className="fas fa-list"></i>
      </span>
      Сформировать заказ
    </motion.button>
  );
}

export default React.memo(DoOrderButton);
