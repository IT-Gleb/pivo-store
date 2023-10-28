import React, { useEffect, useState } from "react";
import { useGetRandomItemsQuery } from "../../store/punkApi/pivo.punk.api";
import type { IPivoResponseItem, IPivoItem } from "../../types";
import PivoSpinner from "../UI/Spinner/pivoSpinner";
import MSlider from "../slider/MSlider";
import { motion } from "framer-motion";

function AllSkidkaItems() {
  const { isLoading, isError, data } = useGetRandomItemsQuery();
  const [pivoItems, setPivoItems] = useState<IPivoItem[]>([]);

  useEffect(() => {
    let tmpItems: IPivoItem[] = [];
    if (data) {
      data.forEach((pivoItem: IPivoResponseItem) => {
        if (pivoItem.item) {
          tmpItems.push(pivoItem.item);
          // console.log(tmpItems[tmpItems.length - 1]);
        }
      });
      setPivoItems(tmpItems);
    }
  }, [data, setPivoItems]);

  if (isLoading) {
    return <PivoSpinner text="Гружу скидки..." />;
  }
  if (isError) {
    return (
      <div className="message is-danger is-light">
        <div className="message-body">
          <p>
            <span className="is-size-5 is-size-6-mobile">Ошибка!!!</span>
            Не могу загрузить данные по скидкам...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="block is-size-5 is-size-6-mobile"
      style={{ width: "98%", margin: "0 auto" }}
    >
      {pivoItems && pivoItems.length > 0 && (
        <article className="my-4">
          <motion.h4
            initial={{ scale: 1.5 }}
            animate={{ scale: [0.85, 1] }}
            className="title is-size-4 is-size-6-mobile has-text-link has-text-centered"
            style={{ textTransform: "uppercase" }}
          >
            акция !!!
          </motion.h4>
          <MSlider props={pivoItems} />
          <h4
            className="title is-size-4 is-size-6-mobile has-text-link has-text-right mt-2"
            style={{ textTransform: "uppercase" }}
          >
            акция !!!
          </h4>
        </article>
      )}
    </div>
  );
}

export default React.memo(AllSkidkaItems);
