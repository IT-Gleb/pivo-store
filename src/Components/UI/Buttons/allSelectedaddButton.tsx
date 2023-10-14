import React, { startTransition } from "react";
import { usePivoDispatch, usePivoSelector } from "../../../hooks/storeHooks";
import {
  type TOrderItem,
  addNewOrderItem,
} from "../../../store/slices/currOrderSlice";
import { motion } from "framer-motion";

function AllSelectedAddButton() {
  const allItems = usePivoSelector((state) => state.eBasket.Items);
  const dispatch = usePivoDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    startTransition(() => {
      if (allItems.length > 0) {
        allItems.forEach((item) => {
          if (item.isSelected) {
            //Занести данные в заказ
            let tmpOrderItem: TOrderItem = {
              id: item.id,
              count: item.count,
              name: item.title,
              priceOne: item.price!,
              price: item.count * item.price!,
            };

            dispatch(addNewOrderItem(tmpOrderItem));
          }
        });
      }
    });
  };
  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      className="button is-small is-success"
      onClick={handleClick}
    >
      <span className="icon is-small mr-1">
        <i className="fas fa-plus"></i>
      </span>
      Добавить все выделенные
    </motion.button>
  );
}

export default AllSelectedAddButton;
