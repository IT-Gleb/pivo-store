import React, { useEffect, useState, startTransition } from "react";
import {
  type TBasketItem,
  TBasketItemNewCount,
  updateBasketItemCount,
} from "../../store/slices/eCartSlice";
import { motion } from "framer-motion";
import Pivovar from "../../assets/imgs/pivovar.png";
import { Link } from "react-router-dom";
import OrderBtn from "../UI/Buttons/inOrderBtn";
import { type TOrderItem } from "../../store/slices/currOrderSlice";
import { usePivoDispatch } from "../../hooks/storeHooks";
import PivoCheckComponent from "../UI/PivoCheck/pivoCheckComponent";

const SmalleBasketItemCard = ({ prop }: { prop: TBasketItem }) => {
  const maxCount: number = 100;
  const [count, setCount] = useState<number>(prop.count);
  const [numValue, setNumValue] = useState<number>(prop.count);
  const [totalPrice, setTotalPrice] = useState<number>(
    prop.price! * prop.count
  );
  const [stars, setStars] = useState<number[]>([]);
  const OrderItem: TOrderItem = {
    id: prop.id,
    name: prop.title,
    count: prop.count,
    price: prop.price!,
    priceOne: Math.floor(prop.price! / prop.count),
  };

  const dispatch = usePivoDispatch();

  const handleCount = (event: React.ChangeEvent<HTMLInputElement>) => {
    let tmpVal: number = Math.max(
      1,
      Math.min(maxCount, Number(event.target.value))
    );
    let paramNewCount: TBasketItemNewCount = { id: prop.id, newCount: tmpVal };
    startTransition(() => {
      setCount(tmpVal);

      setNumValue(tmpVal);
      dispatch(updateBasketItemCount(paramNewCount));

      if (prop.price) setTotalPrice(tmpVal * prop.price!);
    });
  };

  useEffect(() => {
    if (prop.stars) {
      let tmpStars: number[] = [];
      for (let i: number = 0; i < prop.stars; i++) {
        tmpStars.push(i);
      }
      setStars(tmpStars);
    }
  }, [prop.stars]);

  useEffect(() => {
    //Занести данные в заказ
    OrderItem.name = prop.title;
    OrderItem.price = totalPrice;
    OrderItem.count = count;
    OrderItem.id = prop.id;
  }, [handleCount]);

  return (
    <motion.div
      initial={false}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0, scale: 0.1 }}
      className="card is-clipped"
    >
      <div className="card-header has-background-black-ter has-text-light">
        <div className="mx-2 my-1">
          <PivoCheckComponent prop={prop} />
        </div>
        <div className="card-header-title myTitle has-text-light p-0 px-2">
          {prop.title}
        </div>

        <div className="card-header-icon">
          <span className="icon ">
            <i className="fas fa-shopping-cart"></i>
          </span>
        </div>
      </div>
      <div className="card-content p-0">
        <div className="level">
          <div className="level-left" style={{ margin: "0 auto" }}>
            <Link
              to={`/items/${prop.id}`}
              state={{ price: prop.price, stars: prop.stars }}
            >
              <motion.div whileHover={{ scale: 1.1 }} className="level-item">
                <picture className="eCardPicture">
                  <source srcSet={prop.imgPath} />
                  <img src={Pivovar} alt={prop.title} />
                </picture>
              </motion.div>
            </Link>
          </div>
          <div className="level-right has-background-grey-lighter">
            <div
              className="level-item p-4"
              style={{ width: "100%", height: "100%" }}
            >
              <ul>
                <li>
                  {stars &&
                    stars.length > 0 &&
                    stars.map((item) => {
                      return (
                        <span
                          key={item}
                          className="icon has-text-warning textOutlineBlack"
                          style={{ borderBottom: "1px dashed #000" }}
                        >
                          <i className="fas fa-star"></i>
                        </span>
                      );
                    })}
                </li>
                <li>
                  <label className="label">
                    Цена за шт. :
                    <span className="has-text-info is-size-4 ml-2">
                      {prop.price}
                    </span>
                    <span className="is-size-5 ml-1">&#8381;</span>
                  </label>
                </li>
                <li className="control">
                  <label
                    className="label is-flex is-flex-direction-column"
                    style={{ gap: 10 }}
                  >
                    Изменить:
                    <input
                      type="range"
                      min={1}
                      step={1}
                      max={maxCount}
                      value={count}
                      onChange={handleCount}
                      className="is-clickable ml-2"
                    />
                    <input
                      type="number"
                      className="input"
                      value={numValue}
                      onChange={handleCount}
                      style={{ width: 70 }}
                    />
                  </label>
                </li>
                <li>
                  <span className="title is-size-2 has-text-link ml-2">
                    {totalPrice}
                  </span>
                  <span className="is-size-4">.00</span>
                  <span className="is-size-5 ml-1">&#8381;</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="card-footer buttons are-small has-background-black-ter">
        <div className="card-footer-item">
          <OrderBtn paramOrder={OrderItem} />
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(SmalleBasketItemCard);
