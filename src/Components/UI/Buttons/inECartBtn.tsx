import React from "react";
import { useNavigate } from "react-router-dom";
import { usePivoDispatch, usePivoSelector } from "../../../hooks/storeHooks";
import { checkerAuth } from "../../../libs";
import { motion } from "framer-motion";
import {
  addNewBasketItem,
  type TBasketItem,
} from "../../../store/slices/eCartSlice";
import PivoNotification from "../../../libs/Notification/notification";

function InECartBtn({ itemProps }: { itemProps: TBasketItem | undefined }) {
  const isAuth = usePivoSelector((state) => state.currentUser);
  const isUserAuth = checkerAuth(isAuth);
  const navigate = useNavigate();
  const dispatch = usePivoDispatch();

  const handleCartClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!isUserAuth) {
      return navigate("/login", { replace: true });
    }
    if (itemProps) {
      dispatch(addNewBasketItem(itemProps));
      PivoNotification("Товар добавлен в корзину...", [
        "has-background-warning",
        "has-text-dark",
      ]);
    }
  };

  return (
    <motion.button
      initial={{ x: 600 }}
      animate={{ x: 0 }}
      whileTap={{ scale: 0.55 }}
      className="button is-link is-outlined"
      onClick={handleCartClick}
    >
      <span className="icon mr-1">
        <i className="fas fa-shopping-cart"></i>
      </span>
      В корзину
    </motion.button>
  );
}

export default React.memo(InECartBtn);
