import React, { useEffect, useState, useRef } from "react";
import useDebonced from "../../hooks/debonce";
import { usePivoSelector } from "../../hooks/storeHooks";

export interface ISerchByName {
  doSerch: (paramS: string) => void;
}

function SerchString(paramDo: ISerchByName) {
  const serchText: string = usePivoSelector(
    (state) => state.serchData.SerchText
  );
  const [serchVal, setSerchVal] = useState<string>(serchText);
  const deboncedStr = useDebonced(serchVal);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setSerchVal("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    let tmpStr: string = "";
    deboncedStr && deboncedStr.length > 0
      ? (tmpStr = deboncedStr)
      : (tmpStr = "");
    paramDo.doSerch(tmpStr);
  }, [deboncedStr]);

  useEffect(() => {
    if (serchVal.toLowerCase() !== serchText.toLowerCase())
      setSerchVal(serchText);
  }, [serchText]);

  return (
    <label className="is-size-7 has-text-weight-semibold">
      Найти
      <div className="control has-icons-left has-icons-right">
        <input
          className="input is-small is-warning"
          ref={inputRef}
          type="text"
          placeholder="Поиск..."
          value={serchVal}
          onChange={(e) => {
            setSerchVal(e.target.value);
          }}
          maxLength={30}
          size={30}
          autoComplete="on"
          autoFocus
        ></input>
        <span className="icon is-small is-left mr-1">
          <i className="fas fa-glasses"></i>
        </span>
        <span
          className="icon is-small is-right ml-1 is-clickable"
          title="Очистить"
          onClick={handleClick}
        >
          <i className="fas fa-minus-circle"></i>
        </span>
      </div>
    </label>
  );
}

export default SerchString;
