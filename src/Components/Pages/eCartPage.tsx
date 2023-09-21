import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserIsLogin from "../userIsLogin";

const ECartPage: React.FC = () => {
  const navigate = useNavigate();
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
      <div className="title is-size-5 title-article">Ваша корзина</div>

      <div className="content">
        <form action="#">
          <ul
            className="is-vcentered"
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <li>
              <label className="label is-flex" style={{ gap: 10 }}>
                1
                <input
                  type="checkbox"
                  className="checkbox mr-2"
                  name="itemId"
                />
              </label>
            </li>
            <li>
              <div className="subtitle is-size-6 mr-2">Тестовое Пиво...</div>
            </li>
            <li>
              <label className="label is-flex mr-2">
                Стоимость за 1шт.
                <input
                  type="text"
                  readOnly
                  value={price}
                  maxLength={3}
                  max={3}
                  style={{ width: 40, marginLeft: 10, marginRight: 5 }}
                />
                &#x20BD;
              </label>
            </li>
            <li>
              <input
                className="mx-4 is-clickable has-background-primary has-text-color-dark"
                type="range"
                name="count"
                id="count"
                value={rangeValue}
                onChange={handleRangeChange}
                max={maxCount}
              />
            </li>
            <li>
              <label className="label is-flex" style={{ gap: 25 }}>
                Количество:
                <input
                  className="input is-small"
                  type="number"
                  maxLength={3}
                  value={rangeValue}
                  onChange={handleRangeChange}
                  style={{ width: 60 }}
                />
              </label>
            </li>
            <li>
              <label className="label ml-3">{Coast} &#x20BD;</label>
            </li>
          </ul>
        </form>
      </div>

      <div className="title is-size-5 title-article">Ваша корзина</div>
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
