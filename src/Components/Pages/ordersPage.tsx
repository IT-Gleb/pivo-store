import React from "react";
import { useNavigate } from "react-router-dom";

function OrdersPage() {
  const navigate = useNavigate();

  const handleBack = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(-1);
  };

  return (
    <section className="section">
      <h3
        className="title is-size-5 title-article pb-2"
        style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.25)" }}
      >
        Ваши заказы
      </h3>

      <div className="message">
        <div className="message-body is-size-1 has-text-centered">
          У вас нет заказов.
        </div>
      </div>

      <h3 className="title is-size-5 title-article">Ваши заказы</h3>

      <div className="buttons are-small is-centered">
        <button className="button is-link" onClick={handleBack}>
          <span className="icon mr-1">
            <i className="fas fa-arrow-left"></i>
          </span>
          Вернуться
        </button>
      </div>
    </section>
  );
}

export default React.memo(OrdersPage);
