import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserIsLogin from "../userIsLogin";
import { usePivoDispatch, usePivoSelector } from "../../hooks/storeHooks";
import SmalleBasketItemCard from "../PivoItem/smalleCartItem";
import {
  deleteBasketItem,
  type TBasketItem,
} from "../../store/slices/eCartSlice";
import { AnimatePresence } from "framer-motion";

export const TimeInCart: number = 10;

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
  const navigate = useNavigate();
  const itemCount = usePivoSelector((state) => state.eBasket.Items.length);
  const CartItems = usePivoSelector((state) => state.eBasket.Items);
  const dispatch = usePivoDispatch();

  const handleBack = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(-1);
  };

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
    checkerGoogs();
    const timerId = setInterval(() => {
      checkerGoogs();
    }, 10000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <section className="section my-0">
      <UserIsLogin />
      {itemCount > 0 && (
        <div className="message is-info is-light">
          <div className="message-body">
            <span className="is-size-4">Внимание!</span> Товар в корзине будет
            доступен в течении {TimeInCart} мин. c момента добавления. Успейти
            сформировать заказ, или заново добавте товар.
          </div>
        </div>
      )}
      <div
        className="title is-size-5 title-article mt-5 pb-4"
        style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.5)" }}
      >
        Ваша корзина {itemCount}
      </div>

      {itemCount < 1 && (
        <article className="message">
          <div className="message-body is-size-1 has-text-centered">
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
        <button className="button is-info" onClick={handleBack}>
          <span className="icon mr-1">
            <i className="fas fa-arrow-left"></i>
          </span>
          Вернуться
        </button>
      </div>
      <UserIsLogin />
    </section>
  );
};

export default ECartPage;
