import React from "react";
import BackButton from "../UI/Buttons/backButton";

function OrdersPage() {
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
        <BackButton />
      </div>
    </section>
  );
}

export default React.memo(OrdersPage);
