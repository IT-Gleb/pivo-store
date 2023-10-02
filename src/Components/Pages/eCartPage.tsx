import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserIsLogin from "../userIsLogin";
import { usePivoSelector } from "../../hooks/storeHooks";
import SmalleBasketItemCard from "../PivoItem/smalleCartItem";

const ECartPage: React.FC = () => {
  const navigate = useNavigate();
  const itemCount = usePivoSelector((state) => state.eBasket.Items.length);
  const CartItems = usePivoSelector((state) => state.eBasket.Items);
  const [rangeValue, setRangeValue] = useState<number>(1);
  const maxCount: number = 100;
  const [price, setPrice] = useState<number>(125);
  const [Coast, setCoast] = useState<number>(price * rangeValue);

  const handleBack = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(-1);
  };

  const handleRangeChange = (event: any) => {
    let tmpNum = Number(event.target.value);
    // if (tmpNum > maxCount) tmpNum = maxCount;
    // if (tmpNum < 1) tmpNum = 1;
    tmpNum = Math.max(1, Math.min(maxCount, tmpNum));

    setRangeValue(tmpNum);
    let tmpCoast = price * tmpNum;
    setCoast(tmpCoast);
  };

  return (
    <section className="section my-0">
      <UserIsLogin />

      <div
        className="title is-size-5 title-article mt-5 pb-4"
        style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.5)" }}
      >
        Ваша корзина {itemCount}
      </div>

      <div className="small-item-grid">
        {CartItems &&
          itemCount > 0 &&
          CartItems.map((item) => {
            return <SmalleBasketItemCard key={item.id} prop={item} />;
          })}
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
