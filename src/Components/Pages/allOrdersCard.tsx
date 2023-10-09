import React, { useEffect } from "react";
import BackButton from "../UI/Buttons/backButton";
import { usePivoDispatch, usePivoSelector } from "../../hooks/storeHooks";
import { type IOrder } from "../../store/slices/currOrderSlice";
import { motion, AnimatePresence } from "framer-motion";
import { Dt_To_String, FormatSumString } from "../../libs";
import { updateOrdersUserId } from "../../store/slices/ordersSlice";
import DoDocumentButton from "../UI/Buttons/doDocumentBtn";

function AllOrdersCard() {
  const allOrdersCount = usePivoSelector(
    (state) => state.allOrders.orderItems.length
  );
  const allOrders = usePivoSelector((state) => state.allOrders.orderItems);
  const currUserOrdersId = usePivoSelector(
    (state) => state.currentUser.ordersId
  );
  const currOrdersId = usePivoSelector((state) => state.allOrders.userId);
  const dispatch = usePivoDispatch();

  useEffect(() => {
    if (currOrdersId === "" || currOrdersId !== currUserOrdersId) {
      dispatch(updateOrdersUserId(currUserOrdersId));
    }
  }, [currOrdersId, currUserOrdersId, dispatch]);

  return (
    <section className="section mt-0">
      <h3
        className="title is-size-5 title-article pb-2"
        style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.25)" }}
      >
        Ваши заказы
      </h3>
      {allOrdersCount < 1 && (
        <div className="message is-info is-light">
          <div className="message-body is-size-3 has-text-centered">
            У Вас нет заказов
          </div>
        </div>
      )}
      {allOrders && allOrdersCount > 0 && (
        <div className="table-container">
          <table className="table is-fullwidth is-striped">
            <thead className="is-size-6 is-size-6-mobile">
              <tr>
                <th>№/№</th>
                <th>Дата</th>
                <th>Номер заказа</th>
                <th>Итог</th>
                <th>Документ</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {allOrders.map((item: IOrder, ind) => {
                  return (
                    <motion.tr
                      initial={{ scale: 0.1 }}
                      animate={{ scale: [1.3, 0.65, 1] }}
                      transition={{
                        duration: 0.25,
                      }}
                      key={item.id}
                    >
                      <td className="is-size-6 is-size-7-mobile">{ind + 1}.</td>
                      <td className="has-text-info is-size-6 is-size-7-mobile">
                        {Dt_To_String(item.orderDate)}
                      </td>
                      <td className="subtitle is-size-6 is-size-7-mobile has-text-weight-semibold">
                        {item.orderNum}
                      </td>
                      <td className="subtitle" style={{ whiteSpace: "nowrap" }}>
                        <span className="is-size-6 is-size-6-mobile has-text-link">
                          {FormatSumString(item.totalPrice)}
                        </span>
                        <span className="is-size-7 is-size-7-mobile">.00</span>
                        <span className="is-size-7 is-size-7-mobile">
                          &nbsp; &#8381;
                        </span>
                      </td>
                      <td className="has-text-right">
                        <DoDocumentButton />
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}
      <div className="buttons are-small is-centered">
        <BackButton />
      </div>
    </section>
  );
}

export default React.memo(AllOrdersCard);
