import React, { useCallback, useState } from "react";
import { usePivoDispatch, usePivoSelector } from "../../../hooks/storeHooks";
import { updateHowSort } from "../../../store/slices/filterSlice";

function SortComponent() {
  const FilterData = usePivoSelector((state) => state.filterD);
  const dispatch = usePivoDispatch();
  const [rValue, setRvalue] = useState<number>(FilterData.howSort);

  const handledValue = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      //console.log(event.target.value);
      setRvalue(Number(event.target.value));
      // handlerSortP(Number(event.target.value));
      dispatch(updateHowSort(Number(event.target.value)));
      // handlerSortP(rValue);
    },
    [rValue]
  );

  return (
    <label className="is-size-7">
      <span className="is-size-7 has-text-weight-semibold">Сортировать </span>
      <ul className="mt-3 is-flex is-flex-direction-column is-align-items-start is-justify-content-space-between is-flex-wrap-wrap">
        <li className="mb-1">
          <label className="radio mr-2 is-size-7" aria-label="stars">
            <input
              className="mx-1"
              type="radio"
              value={0}
              name="FilterRadio"
              checked={rValue === 0}
              onChange={handledValue}
            />
            Не сортировать
          </label>
        </li>
        <li className="mb-1">
          <label className="radio mr-1 is-size-7" aria-label="priced">
            <input
              className="mx-1"
              type="radio"
              value={1}
              name="FilterRadio"
              checked={rValue === 1}
              onChange={handledValue}
            />
            По цене
          </label>
        </li>
        <li className="mb-1">
          <label className="radio mr-2 is-size-7" aria-label="stars">
            <input
              className="mx-1"
              type="radio"
              value={2}
              name="FilterRadio"
              checked={rValue === 2}
              onChange={handledValue}
            />
            По качеству
          </label>
        </li>
        <li>
          <label className="radio mr-2 is-size-7" aria-label="stars">
            <input
              className="mx-1"
              type="radio"
              value={3}
              name="FilterRadio"
              checked={rValue === 3}
              onChange={handledValue}
            />
            По наименованию
          </label>
        </li>
        <li>
          <label className="radio mr-2 is-size-7" aria-label="abv">
            <input
              className="mx-1"
              type="radio"
              value={4}
              name="FilterRadio"
              checked={rValue === 4}
              onChange={handledValue}
            />
            По крепости /abv/
          </label>
        </li>
      </ul>
    </label>
  );
}

export default React.memo(SortComponent);
