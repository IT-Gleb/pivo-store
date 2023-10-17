import React from "react";
import { IPivoItem } from "../../types";
import Pivovar from "../../assets/imgs/pivovar.png";
import { motion } from "framer-motion";

const SmallSliderItem: React.FC<IPivoItem> = (propItem) => {
  return (
    <div
      className="card is-clipped"
      style={{ width: "11rem", height: "13.5rem" }}
    >
      <div className="card-header">
        <div
          className="card-header-title is-size-7 is-size-7-mobile is-clipped has-background-danger has-text-warning px-2 py-1"
          style={{ whiteSpace: "nowrap" }}
        >
          {propItem.name}
        </div>
      </div>
      <div
        className="card-content p-0 pt-4 m-0 is-relative infoSale"
        style={{ height: "73%" }}
      >
        <div className="level is-flex is-flex-direction-column">
          <div className="level-left">
            <div
              className="level-item p-0 m-0"
              style={{
                width: "24px",
                height: "auto",
                objectFit: "cover",
                objectPosition: " top center",
              }}
            >
              <picture style={{ width: "100%", height: "100%" }}>
                <source srcSet={propItem.image_url}></source>
                <img src={Pivovar} alt={propItem.name} />
              </picture>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">
              <ul className="is-size-7 iz-size-7-mobile">
                <li
                  style={{ textDecoration: "line-through", color: "darkcyan" }}
                >
                  Старая цена: {propItem._price}.00
                </li>
                <li>
                  Новая цена:{" "}
                  <span className="is-size-6 is-size-6-mobile has-text-info has-text-weight-semibold">
                    {Math.floor(
                      propItem._price! - (propItem._price! / 100) * 20
                    )}
                  </span>
                  .00
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="card-footer">
        <div className="card-footer-item p-0">
          <motion.button
            whileTap={{ scale: 0.8 }}
            className="button is-fullwidth is-small is-danger is-outlined "
          >
            В корзину
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default SmallSliderItem;
