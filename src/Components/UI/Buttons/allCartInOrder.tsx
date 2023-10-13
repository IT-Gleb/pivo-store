import React, { startTransition } from "react";
import { motion } from "framer-motion";
import { usePivoDispatch, usePivoSelector } from "../../../hooks/storeHooks";
import { type TBasketItem } from "../../../store/slices/eCartSlice";
import {
  TOrderItem,
  addNewOrderItem,
} from "../../../store/slices/currOrderSlice";
import PivoNotification from "../../../libs/Notification/notification";

function AllCardInOrder_Button() {
  const cardItems = usePivoSelector((state) => state.eBasket.Items);
  const dispatch = usePivoDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (cardItems.length > 0) {
      startTransition(() => {
        cardItems.forEach((cardItem: TBasketItem) => {
          //Занести данные в заказ
          let tmpOrderItem: TOrderItem = {
            id: cardItem.id,
            count: cardItem.count,
            name: cardItem.title,
            priceOne: cardItem.price!,
            price: cardItem.count * cardItem.price!,
          };

          dispatch(addNewOrderItem(tmpOrderItem));
        });
        PivoNotification(
          `В текущий заказ добавлено - ${cardItems.length} - позиций.`,
          ["has-background-info", "has-text-warning"]
        );
      });
    }
  };

  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      className="button is-small is-primary"
      onClick={handleClick}
    >
      Добавить все
    </motion.button>
  );
}

export default React.memo(AllCardInOrder_Button);
