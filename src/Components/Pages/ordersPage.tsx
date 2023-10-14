import React, { Suspense, useEffect } from "react";
import BackButton from "../UI/Buttons/backButton";
import { usePivoDispatch, usePivoSelector } from "../../hooks/storeHooks";
import MyCheckBox from "../UI/checkBox/myCheckBox";
import {
  deleteOrderItem,
  type TOrderItem,
} from "../../store/slices/currOrderSlice";
import { motion, AnimatePresence } from "framer-motion";
import UserIsLogin from "../userIsLogin";
import DoOrderBtn from "../UI/Buttons/doOrderBtn";
import RightOrdersMenu from "../Menu/rightOrdersMenu";
import { FormatSumString } from "../../libs";
import PivoSpinner from "../UI/Spinner/pivoSpinner";
import CurrentOrderChart from "../UI/Chart/currentOrderChart";

type TOrderTempItem = {
  id: number;
  isNoDelete: boolean;
}[];

function initTempItem(param: TOrderItem[]): TOrderTempItem {
  let res: TOrderTempItem = [];

  if (param && param.length > 0) {
    param.forEach((item) => {
      res.push({ id: item.id, isNoDelete: true });
    });
  }
  return res;
}

const AllOrdersCardComponent = React.lazy(() => import("./allOrdersCard"));

function OrdersPage() {
  const orderItems = usePivoSelector((state) => state.currentOrder.Items);
  const itemsCount = usePivoSelector(
    (state) => state.currentOrder.Items.length
  );
  const totalPrice = usePivoSelector((state) => state.currentOrder.totalPrice);
  const dispatch = usePivoDispatch();

  let orders: TOrderTempItem = initTempItem(orderItems);

  useEffect(() => {
    orders = initTempItem(orderItems);
    // console.log(orders);
  }, [itemsCount, orderItems]);

  const isCheck = (param: number, paramBool: boolean) => {
    orders[param].isNoDelete = paramBool;
    // console.log(param, orders[param].id, orders[param].isNoDelete);
    if (!orders[param].isNoDelete) {
      dispatch(deleteOrderItem(orders[param].id));
    }
  };

  return (
    <>
      <RightOrdersMenu />
      <UserIsLogin />
      <section className="section is-center">
        {itemsCount > 0 && (
          <div className="message is-primary">
            <div className="message-body">
              <span className="is-size-4">Подсказка!</span> Если убрали товар и
              хотите его перезаказать. Или изменить количество товара. Удалите
              позицию из заказа. Вернитесь в корзину и снова добавте нужное
              количество.
            </div>
          </div>
        )}

        <h3
          className="title is-size-5 title-article pb-2"
          style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.25)" }}
        >
          Текущий заказ
        </h3>
        {itemsCount > 0 && <CurrentOrderChart />}
        {itemsCount < 1 && (
          <div className="message">
            <div className="message-body is-size-2 has-text-centered">
              У вас нет текущих заказов.
            </div>
          </div>
        )}
        {/* <span className="is-size-5 has-text-dark"> &#8381;</span> */}
        {itemsCount > 0 && (
          <div className="table-container">
            <table className="table is-striped is-fullwidth">
              <thead>
                <tr>
                  <th>№/№</th>
                  <th>Убрать</th>
                  <th>Название</th>
                  <th>Цена за&nbsp;1шт.</th>
                  <th>Выбрано</th>
                  <th>Общая&nbsp;сумма</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {orderItems.map((item, ind) => {
                    return (
                      <motion.tr
                        initial={false}
                        animate={{ x: 0, scale: 1, opacity: 1 }}
                        exit={{ scale: 0.1, opacity: 0.1 }}
                        key={item.id}
                      >
                        <th className="subtitle is-size-6">{ind + 1}.</th>
                        <th className="has-text-centered">
                          <MyCheckBox
                            paramVal={orders[ind].isNoDelete}
                            paramId={ind}
                            onchange={isCheck}
                          />
                        </th>
                        <th className="myTitle">{item.name}</th>
                        <th className="subtitle is-size-6 has-text-link has-text-center">
                          {item.priceOne}
                          <span className="is-size-7 has-text-link">
                            .00
                          </span>{" "}
                          <span className="is-size-6 has-text-dark">
                            &#8381;
                          </span>
                        </th>
                        <th className="subtitle is-size-6 has-text-centered">
                          {item.count}
                        </th>
                        <th className="subtitle is-size-6 has-text-info has-text-right">
                          {item.price}
                          <span className="is-size-7 has-text-info">.00</span>
                          <span className="is-size-6 has-text-dark">
                            {" "}
                            &#8381;
                          </span>
                        </th>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
        {itemsCount > 0 && (
          <div
            className="box has-background-white-ter is-flex is-justify-content-flex-end p-2 pb-0"
            style={{ gap: 10 }}
          >
            <div className="buttons are-small mr-6">
              <DoOrderBtn />
            </div>
            <div className="title is-size-4">Итог:</div>
            <div className="title is-size-4 has-text-dark">
              {FormatSumString(totalPrice)}.00
              <span className="is-size-5 has-text-dark"> &#8381;</span>
            </div>
          </div>
        )}
        <div className="buttons are-small is-centered">
          <BackButton />
        </div>
      </section>
      {/* Заказы уже созданные */}
      <Suspense fallback={<PivoSpinner text="Загрузка компонента..." />}>
        <AllOrdersCardComponent />
      </Suspense>
      <UserIsLogin />
    </>
  );
}

export default React.memo(OrdersPage);
