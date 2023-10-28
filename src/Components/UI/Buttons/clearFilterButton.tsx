//Сбросить все данные по фильтрам

import { usePivoDispatch } from "../../../hooks/storeHooks";
import { clearFilters } from "../../../store/slices/filterSlice";
import { motion } from "framer-motion";

function ClearFilterButton({ toggleFilter, closeParent }: any) {
  const dispatch = usePivoDispatch();

  function handleClearBtn(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    dispatch(clearFilters());
    toggleFilter();
    closeParent();
  }

  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      className="button is-primary is-small"
      onClick={handleClearBtn}
    >
      Очистить
    </motion.button>
  );
}

export default ClearFilterButton;
