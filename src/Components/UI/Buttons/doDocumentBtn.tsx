import { motion } from "framer-motion";

function DoDocumentButton() {
  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      className="button is-small is-success"
    >
      Документ
    </motion.button>
  );
}

export default DoDocumentButton;
