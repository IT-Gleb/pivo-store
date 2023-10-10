import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function DoDocumentButton() {
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate("/pdf");
  };

  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      className="button is-small is-success"
      onClick={handleClick}
    >
      Документ
    </motion.button>
  );
}

export default React.memo(DoDocumentButton);
