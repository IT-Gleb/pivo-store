import React from "react";
import { IPivoItem } from "../../types";
import Pivovar from "../../assets/imgs/pivovar.png";
import InECartBtn from "../UI/Buttons/inECartBtn";
import type { TBasketItem } from "../../store/slices/eCartSlice";
import { Link } from "react-router-dom";

const SmallSliderItem: React.FC<IPivoItem> = (propItem) => {
  const itemCart: TBasketItem = {
    id: propItem.id,
    timeAdd: Date.now(),
    title: propItem.name,
    imgPath: propItem.image_url,
    count: 1,
    price: Math.floor(propItem._price! - (propItem._price! / 100) * 20),
    stars: propItem._star!,
    isSelected: false,
  };

  return (
    <div
      className="card is-clipped"
      style={{ width: "11rem", height: "13.5rem" }}
    >
      <div className="card-header">
        <div
          className="card-header-title is-size-7 is-size-7-mobile is-clipped has-text-danger-light px-2 py-1"
          style={{ whiteSpace: "nowrap", backgroundColor: "rgb(255, 168, 46)" }}
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
                width: "100%",
                height: "48px",
              }}
            >
              <ul
                className="is-size-7 iz-size-7-mobile mt-1"
                style={{ width: "100%", textAlign: "center" }}
              >
                <li
                  style={{
                    display: "block",
                    width: "1.8rem",
                    height: "auto",
                    margin: "0 auto",
                    paddingTop: "5rem",
                  }}
                >
                  <Link
                    to={`/items/${propItem.id}`}
                    state={{ price: itemCart.price, stars: propItem._star }}
                  >
                    <picture
                      style={{
                        display: "block",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "top center",
                      }}
                    >
                      <source srcSet={propItem.image_url}></source>
                      <img src={Pivovar} alt={propItem.name} />
                    </picture>
                  </Link>
                </li>
                <li
                  style={{ textDecoration: "line-through", color: "lightgrey" }}
                >
                  Старая цена: {propItem._price}.00
                </li>
                <li>
                  Новая цена:{" "}
                  <span className="is-size-5 is-size-6-mobile has-text-info has-text-weight-semibold">
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
        <div className="card-footer-item p-0 buttons are-small">
          <InECartBtn itemProps={itemCart} isFull={true} />
        </div>
      </div>
    </div>
  );
};

export default SmallSliderItem;
