//Сбросить все данные по фильтрам

import { usePivoDispatch } from "../../../hooks/storeHooks";
import { clearFilters } from "../../../store/slices/filterSlice";

function ClearFilterButton({ toggleFilter, closeParent }: any) {
  const dispatch = usePivoDispatch();

  function handleClearBtn(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    dispatch(clearFilters());
    toggleFilter();
    closeParent();
  }

  return (
    <button className="button is-primary is-small" onClick={handleClearBtn}>
      Очистить
    </button>
  );
}

export default ClearFilterButton;
