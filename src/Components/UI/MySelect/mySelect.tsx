import React, { useEffect, useState, startTransition } from "react";
import { usePivoDispatch, usePivoSelector } from "../../../hooks/storeHooks";
import {
  defaultOnPage,
  updateOrdersOnPage,
} from "../../../store/slices/ordersSlice";

type TmySelect = {
  optName: string;
  value: number | undefined;
};

type TmySelValues = TmySelect[];

function MySelect() {
  const selValues: TmySelValues = [
    { optName: "--по умолчанию---", value: defaultOnPage },
    { optName: `${defaultOnPage * 2} последних`, value: defaultOnPage * 2 },
    { optName: `${defaultOnPage * 3} последних`, value: defaultOnPage * 3 },
    { optName: "Все", value: 0 },
  ];
  const [selValue, setSelValue] = useState<TmySelect>(selValues[0]);
  const dispatch = usePivoDispatch();
  const onPageFromStore = usePivoSelector((state) => state.allOrders.onPage);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let tmpVal = Number(event.target.value);
    selValues.forEach((item) => {
      if (item.value === tmpVal) {
        startTransition(() => {
          setSelValue(item);
          dispatch(updateOrdersOnPage(item.value!));
        });
      }
    });
  };

  useEffect(() => {
    let tmpVal: TmySelect;
    for (let i: number = 0; i < selValues.length; i++) {
      if (selValues[i].value === onPageFromStore) {
        tmpVal = selValues[i];
        setSelValue(tmpVal);
        break;
      }
    }
  }, []);

  return (
    <label className="label">
      Показывать:
      <div className="control has-icons-left">
        <div className="select is-success is-small">
          <select
            name="mySelect"
            defaultValue={selValue.optName.toUpperCase()}
            onChange={handleChange}
          >
            {selValues &&
              selValues.map((item, ind) => {
                if (item.value === selValue.value) {
                  return (
                    <option key={ind} value={item.value} selected>
                      {item.optName.toUpperCase()}
                    </option>
                  );
                }
                return (
                  <option key={ind} value={item.value}>
                    {item.optName.toUpperCase()}
                  </option>
                );
              })}
          </select>
        </div>
        <span className="icon is-small is-left">
          <i className="fas fa-list"></i>
        </span>
      </div>
    </label>
  );
}

export default React.memo(MySelect);
