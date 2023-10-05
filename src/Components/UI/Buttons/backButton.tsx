import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function BackButton() {
  const navigate = useNavigate();

  const handleBackclick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(-1);
  };

  return (
    <motion.button
      whileTap={{ scale: 0.5 }}
      className="button is-small is-info"
      onClick={handleBackclick}
    >
      <span className="icon mr-1">
        <i className="fas fa-arrow-left"></i>
      </span>
      Вернуться
    </motion.button>
  );
}

export default BackButton;
