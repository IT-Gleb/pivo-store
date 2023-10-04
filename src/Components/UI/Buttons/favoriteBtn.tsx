import React from "react";
import { usePivoSelector } from "../../../hooks/storeHooks";
import { useNavigate } from "react-router-dom";
import { checkerAuth } from "../../../libs";
import { motion } from "framer-motion";
import PivoNotification from "../../../libs/Notification/notification";

function FavoriteBtn({ addNew }: { addNew: () => void }) {
  const isAuth = usePivoSelector((state) => state.currentUser);

  const userAuth: boolean = checkerAuth(isAuth);
  const navigate = useNavigate();

  const handleFavClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!userAuth) {
      navigate("/login", { replace: true });
    } else {
      addNew();
      PivoNotification("Вы добавили продукт в Избранное...", [
        "has-background-info",
        "has-text-light",
      ]);
    }
  };

  return (
    <motion.button
      initial={{ x: -400 }}
      animate={{ x: 0 }}
      whileTap={{ scale: 0.6 }}
      className="button has-text-dark is-warning is-outlined"
      onClick={handleFavClick}
    >
      <span className="icon mr-1">
        <i className="fas fa-heart"></i>
      </span>
      В избранное
    </motion.button>
  );
}

export default React.memo(FavoriteBtn);
