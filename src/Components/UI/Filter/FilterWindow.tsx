import { motion } from "framer-motion";
import ProgressXScroll from "../progressUI/ProgressXScroll";
import { MinPriceValue, MaxPriceValue } from "../../../types";
import SerchInput from "./SerchInput";
import SortComponent from "../Filter/sortComponent";
import React from "react";
import { usePivoSelector } from "../../../hooks/storeHooks";
import ClearFilterButton from "../Buttons/clearFilterButton";

function FilterWindow({ toggleFilter, close }: any) {
  const FilterD = usePivoSelector((state) => state.filterD);
  return (
    <>
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: [20, -5, 0], opacity: 1 }}
        className="box has-background-white p-4 is-unselectable"
      >
        <div
          className="block is-flex is-align-items-stretch is-justify-content-space-between is-flex-wrap-wrap"
          style={{ gap: 20 }}
        >
          <SerchInput />

          <SortComponent />

          <ProgressXScroll
            paramMin={MinPriceValue}
            paramMax={MaxPriceValue}
            currentVal={FilterD.priceData}
          />
        </div>
        <div className="buttons are-small is-centered">
          <ClearFilterButton toggleFilter={toggleFilter} closeParent={close} />
          <button className="button " onClick={close}>
            Закрыть
          </button>
        </div>
      </motion.div>
    </>
  );
}

export default React.memo(FilterWindow);
