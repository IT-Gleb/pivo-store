import React from "react";
import { usePivoDispatch } from "../../../hooks/storeHooks";
import { deleteFromFav } from "../../../store/slices/favorites";
import { motion } from "framer-motion";
import PivoNotification from "../../../libs/Notification/notification";

function DeleteFromFavoritesBtn({ paramId }: { paramId: number }) {
  const dispatch = usePivoDispatch();

  const handleDeleteFav = (pId: number) => {
    dispatch(deleteFromFav(pId));
    PivoNotification("Товар удален из избранного...", [
      "has-background-danger",
      "has-text-light",
    ]);
  };

  return (
    <motion.button
      initial={{ scale: 0.1 }}
      animate={{ scale: 1 }}
      whileTap={{ scale: 0.8 }}
      className="button is-small is-danger is-outlined"
      onClick={(e) => {
        e.preventDefault();
        handleDeleteFav(paramId);
      }}
    >
      <span className="icon mr-1">
        <i className="fas fa-minus"></i>
      </span>
      Удалить из избранного
    </motion.button>
  );
}

export default React.memo(DeleteFromFavoritesBtn);
