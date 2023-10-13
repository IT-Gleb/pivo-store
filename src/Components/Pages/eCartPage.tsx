import React, { useEffect, useState } from "react";
import UserIsLogin from "../userIsLogin";
import { usePivoDispatch, usePivoSelector } from "../../hooks/storeHooks";
import SmalleBasketItemCard from "../PivoItem/smalleCartItem";

import {
  deleteBasketItem,
  type TBasketItem,
} from "../../store/slices/eCartSlice";
import { AnimatePresence } from "framer-motion";
import BackButton from "../UI/Buttons/backButton";
import RightECartMenu from "../Menu/rightECartMenu";
import AllCardInOrder_Button from "../UI/Buttons/allCartInOrder";
import RemoveSelectedBasketItems from "../UI/Buttons/removeSelectedBasketItems";

export const TimeInCart: number = 30;

function checkCartItem(paramItem: TBasketItem): boolean {
  let res: boolean = false;

  let startTime = new Date(paramItem.timeAdd);
  let endTime = new Date(paramItem.timeAdd);
  let tmpTime = startTime.getMinutes() + TimeInCart;
  endTime.setMinutes(tmpTime);

  let nowTime = new Date();
  if (endTime < nowTime) {
    res = true;
  }

  return res;
}

const ECartPage: React.FC = () => {
  const itemCount = usePivoSelector((state) => state.eBasket.Items.length);
  const CartItems = usePivoSelector((state) => state.eBasket.Items);
  const dispatch = usePivoDispatch();
  const [checkSelected, setCheckSelected] = useState<boolean>(false);

  useEffect(() => {
    const checkerGoogs = () => {
      if (itemCount > 0) {
        CartItems.forEach((item) => {
          if (checkCartItem(item)) {
            dispatch(deleteBasketItem(item.id));
          }
        });
      }
    };
    const timerId = setInterval(() => {
      checkerGoogs();
    }, 3500);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    if (CartItems.length > 0) {
      let tmpV: boolean = false;
      for (let i: number = 0; i < CartItems.length; i++) {
        if (CartItems[i].isSelected) {
          tmpV = true;
          break;
        }
      }
      setCheckSelected(tmpV);
    }
  }, [CartItems]);

  return (
    <>
      <RightECartMenu />
      <section className="section my-0">
        <UserIsLogin />
        {itemCount > 0 && (
          <>
            <div className="message is-info is-light">
              <div className="message-body">
                <span className="is-size-4">Внимание!</span> Товар в корзине
                будет доступен в течении {TimeInCart} мин. c момента добавления.
                Успейти сформировать заказ, или заново добавте товар.
              </div>
            </div>

            <div className="message is-primary">
              <div className="message-body">
                <span className="is-size-4">Подсказка!</span> Понравившиеся
                сорта пива, храните в избранном. Легче найти и добавить в
                корзину.
              </div>
            </div>
          </>
        )}
        <div
          className="title is-size-5 title-article mt-5 pb-4"
          style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.5)" }}
        >
          Ваша корзина {itemCount}
        </div>
        {itemCount > 0 && (
          <div className="buttons are-small is-centered">
            <AllCardInOrder_Button />
            {checkSelected && <RemoveSelectedBasketItems />}
          </div>
        )}

        {itemCount < 1 && (
          <article className="message">
            <div className="message-body is-size-2 has-text-centered">
              У Вас нет товаров в корзине.
            </div>
          </article>
        )}

        <div className="small-item-grid">
          <AnimatePresence>
            {CartItems &&
              itemCount > 0 &&
              CartItems.map((item) => {
                return <SmalleBasketItemCard key={item.id} prop={item} />;
              })}
          </AnimatePresence>
        </div>
        <div
          className="title is-size-5 title-article mt-5 pt-4"
          style={{ borderTop: "1px solid rgba(0, 0, 0, 0.5)" }}
        >
          Ваша корзина {itemCount}
        </div>
        <div
          className="buttons are-small is-centered my-5 py-5"
          style={{ borderTop: "1px solid rgba(0, 0, 0, 0.5)" }}
        >
          <BackButton />
        </div>
        <UserIsLogin />
      </section>
    </>
  );
};

export default React.memo(ECartPage);
