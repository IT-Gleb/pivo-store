import React, { useState, startTransition } from "react";
import { usePivoDispatch } from "../../../hooks/storeHooks";
import {
  type TBasketItem,
  updateBasketItemSelected,
  type TBasketItemSelected,
} from "../../../store/slices/eCartSlice";

function PivoCheckComponent({ prop }: { prop: TBasketItem }) {
  const [isChecked, setIsChecked] = useState<boolean>(prop.isSelected);
  const dispatch = usePivoDispatch();

  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    let tmpVal = event.target.checked;
    let tmpItem: TBasketItemSelected = {
      id: prop.id,
      newSelected: prop.isSelected,
    };

    startTransition(() => {
      setIsChecked(tmpVal);
      tmpItem.newSelected = tmpVal;
      dispatch(updateBasketItemSelected(tmpItem));
    });
  };

  return (
    <label className="checkbox">
      <input
        type="checkbox"
        name="PivoCheckBox"
        checked={isChecked}
        onChange={handleChecked}
        title="Отметить товар"
      />
    </label>
  );
}

export default React.memo(PivoCheckComponent);
