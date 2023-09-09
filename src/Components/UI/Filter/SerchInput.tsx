import { useRef, useState, useEffect } from "react";
import useDebonced from "../../../hooks/debonce";
import { usePivoDispatch, usePivoSelector } from "../../../hooks/storeHooks";
import { updateSerchText } from "../../../store/slices/filterSlice";

function SerchInput() {
  const filterData = usePivoSelector((state) => state.filterD);
  const dispatch = usePivoDispatch();
  const SerchRef = useRef<HTMLInputElement>(null);
  const [serch, setSerch] = useState<string>(filterData.serchText);
  const debonceStr = useDebonced(serch);

  const handleInputFocus = () => {
    setSerch("");
    SerchRef.current?.focus();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSerch(event.target.value);
    // console.log(debonceStr);
  };

  useEffect(() => {
    // console.log(debonceStr);
    dispatch(updateSerchText(debonceStr));
  }, [debonceStr]);

  return (
    <>
      <div className="field">
        <label className="is-size-7">
          <span className="is-size-7 has-text-weight-semibold">Поиск </span>

          <div className="control has-icons-left has-icons-right">
            <input
              ref={SerchRef}
              type="text"
              className="input is-small"
              placeholder="Введите что-нибудь..."
              value={serch}
              onChange={handleChange}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-glasses"></i>
            </span>
            <span
              className="icon is-small is-right is-clickable"
              title="Очистить"
              onClick={handleInputFocus}
            >
              <i className="fas fa-minus-circle"></i>
            </span>
          </div>
        </label>
      </div>
    </>
  );
}

export default SerchInput;
