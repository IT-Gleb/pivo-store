import { useEffect, useRef, useState } from "react";
import { usePivoDispatch } from "../../../hooks/storeHooks";
import { updateFilterPriceData } from "../../../store/slices/filterSlice";
import { IProgressParam, ThrottleStep } from "../../../types";
import throttle from "lodash/throttle";

function ProgressXScroll(props: IProgressParam) {
  //from store
  const dispatch = usePivoDispatch();
  //------------------------

  const ProgressRef = useRef<any>(undefined);
  let mouseD: boolean = false;
  const [Val, setVal] = useState<number>(props.currentVal || props.paramMin);
  let CurrValue: number = 0;

  function CalcValues(event: MouseEvent) {
    let TempValue: number = props.paramMin;
    let TempMaxValue: number = props.paramMax;

    let rect = ProgressRef.current?.getBoundingClientRect();
    TempValue = Math.floor(event.clientX - rect.x);
    TempMaxValue = rect.width;
    CurrValue = Math.floor((TempValue * props.paramMax) / TempMaxValue);
    if (CurrValue < props.paramMin) CurrValue = props.paramMin;
    if (CurrValue > props.paramMax) CurrValue = props.paramMax;
    setVal(CurrValue);
  }

  const handleProgress = (event: React.FormEvent<HTMLProgressElement>) => {
    if (mouseD) setVal(CurrValue);
  };

  useEffect(() => {
    const handleMouseLeave = (event: MouseEvent) => {
      if (mouseD) {
        mouseD = false;
        CalcValues(event);
        dispatch(updateFilterPriceData(CurrValue));
      }
    };
    const handleMouseUp = (event: MouseEvent) => {
      if (mouseD) {
        CalcValues(event);
        mouseD = false;
        dispatch(updateFilterPriceData(CurrValue));
      }
    };

    const handleXMouseMove = throttle((event: MouseEvent) => {
      if (mouseD) {
        CalcValues(event);
        // console.log("move");
      }
    }, ThrottleStep);

    const handleMouseDown = (event: MouseEvent) => {
      if (!mouseD) {
        mouseD = true;
        CalcValues(event);
      }
    };

    if (ProgressRef.current) {
      ProgressRef.current?.addEventListener("mousedown", handleMouseDown);
      ProgressRef.current?.addEventListener("mouseup", handleMouseUp);
      ProgressRef.current?.addEventListener("mousemove", handleXMouseMove);
      ProgressRef.current?.addEventListener("mouseleave", handleMouseLeave);
    }
    return () => {
      if (ProgressRef.current) {
        ProgressRef.current?.removeEventListener("mousemove", handleXMouseMove);
        ProgressRef.current?.removeEventListener("mousedown", handleMouseDown);
        ProgressRef.current?.removeEventListener("mouseup", handleMouseUp);
        ProgressRef.current?.removeEventListener(
          "mouseleave",
          handleMouseLeave
        );
      }
    };
  }, []);

  return (
    <label className="is-size-7">
      <span className="is-size-7 has-text-weight-semibold">Фильтр по цене</span>

      <div
        className="content is-unselectable mt-1"
        style={{ minWidth: 100, width: 250 }}
      >
        <div className="has-text-centered is-size-7 has-text-weight-light">{`${Val}/${props.paramMax} (руб.)`}</div>
        <progress
          className="progress is-info is-small is-clickable"
          ref={ProgressRef}
          value={Val}
          max={props.paramMax}
          onChange={handleProgress}
        ></progress>
      </div>
    </label>
  );
}

export default ProgressXScroll;
