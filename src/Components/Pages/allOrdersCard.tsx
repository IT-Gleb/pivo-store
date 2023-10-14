import React, { Suspense, useEffect, useState, useTransition } from "react";
import BackButton from "../UI/Buttons/backButton";
import { usePivoDispatch, usePivoSelector } from "../../hooks/storeHooks";
import { TOrderItem, type IOrder } from "../../store/slices/currOrderSlice";
import { motion, AnimatePresence } from "framer-motion";
import { Dt_To_String, FormatSumString } from "../../libs";
import { updateOrdersUserId } from "../../store/slices/ordersSlice";
import Pdf_Invoice from "../PDF/pdfInvoice";
import MyModal from "../UI/MsgBox/myModal";
import PdfView from "../PDF/pdfView";
import PivoSpinner from "../UI/Spinner/pivoSpinner";
import MySelect from "../UI/MySelect/mySelect";

function AllOrdersCard() {
  const allOrdersCount = usePivoSelector(
    (state) => state.allOrders.orderItems.length
  );
  const allOrders = usePivoSelector((state) => state.allOrders.orderItems);
  const [itemsOnPage, setItemsOnPage] = useState<IOrder[]>([]);
  const currUserOrdersId = usePivoSelector(
    (state) => state.currentUser.ordersId
  );
  const onPageOrders = usePivoSelector((state) => state.allOrders.onPage);
  const ClientName = usePivoSelector((state) => state.currentUser.Name);
  const ClientEmail = usePivoSelector((state) => state.currentUser.email);
  const currOrdersId = usePivoSelector((state) => state.allOrders.userId);
  const dispatch = usePivoDispatch();
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [orderNum, setOrderNum] = useState<string>("");
  const [orderDate, setOrderDate] = useState<string>("");
  const [OrderItems, setOrderItems] = useState<TOrderItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<string>("0");
  const [image64, setImage64] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (currOrdersId === "" || currOrdersId !== currUserOrdersId) {
      dispatch(updateOrdersUserId(currUserOrdersId));
    }
  }, [currOrdersId, currUserOrdersId, dispatch]);

  const handlePreview = (
    paramNumOrder: string,
    paramDateOrder: string,
    paramTotalPrice: string,
    paramOrderItems: TOrderItem[],
    paramImage64: string | undefined
  ) => {
    startTransition(() => {
      setIsPreview(!isPreview);
      setOrderNum(paramNumOrder);
      setOrderDate(paramDateOrder);
      setOrderItems(paramOrderItems);
      setTotalPrice(paramTotalPrice);
      if (paramImage64) setImage64(paramImage64);
    });
  };

  useEffect(() => {
    let tmpOrders: IOrder[] = [];
    let tmpOnPageOrders: number = 0;
    //console.log(onPageOrders);
    if (onPageOrders !== -1 && allOrders) {
      tmpOnPageOrders =
        allOrdersCount > onPageOrders ? onPageOrders : allOrdersCount;
      if (tmpOnPageOrders > 0) {
        for (let ind = 0; ind < tmpOnPageOrders; ind++) {
          tmpOrders.push(allOrders[ind]);
        }
      }
      tmpOnPageOrders === 0
        ? setItemsOnPage(allOrders)
        : setItemsOnPage(tmpOrders);
    }
    //console.log(tmpOrders);
  }, [onPageOrders, allOrders, setItemsOnPage]);

  if (isPending) return <PivoSpinner text="Данные загружаются..." />;

  return (
    <section className="section mt-0">
      {isPreview && (
        <MyModal
          title="Предварительный просмотр"
          onClose={() => {
            setIsPreview(false);
          }}
        >
          <Suspense fallback={<PivoSpinner text="Загружаю..." />}>
            <PdfView
              paramNumOrder={orderNum}
              paramNameClient={ClientName}
              paramClientEmail={ClientEmail}
              paramDateOrder={orderDate}
              paramTotalPrice={totalPrice}
              paramOrderItems={OrderItems}
              paramImage64={image64}
            />
          </Suspense>
        </MyModal>
      )}
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
      {itemsOnPage && allOrdersCount > 0 && (
        <>
          <MySelect />
          <div className="table-container">
            <table className="table is-fullwidth is-striped">
              <thead className="is-size-6 is-size-6-mobile">
                <tr>
                  <th>№/№</th>
                  <th>Дата</th>
                  <th>Номер заказа</th>
                  <th>Итог</th>
                  <th>Документ</th>
                  <th>Предпросмотр</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {itemsOnPage.map((item: IOrder, ind) => {
                    return (
                      <motion.tr
                        initial={{ scale: 0.1 }}
                        animate={{
                          scale: [1.3, 0.8, 1],
                        }}
                        transition={{
                          duration: 0.25,
                        }}
                        key={item.id}
                      >
                        <td className="is-size-6 is-size-7-mobile">
                          {ind + 1}.
                        </td>
                        <td className="has-text-info is-size-6 is-size-7-mobile">
                          {Dt_To_String(item.orderDate)}
                        </td>
                        <td className="subtitle is-size-6 is-size-7-mobile has-text-weight-semibold">
                          {item.orderNum}
                        </td>
                        <td
                          className="subtitle"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          <span className="is-size-6 is-size-6-mobile has-text-link">
                            {FormatSumString(item.totalPrice)}
                          </span>
                          <span className="is-size-7 is-size-7-mobile">
                            .00
                          </span>
                          <span className="is-size-7 is-size-7-mobile">
                            &nbsp; &#8381;
                          </span>
                        </td>
                        <td className="has-text-left">
                          {item && (
                            <Suspense
                              fallback={<PivoSpinner text="Загрузка..." />}
                            >
                              <Pdf_Invoice
                                filename={(item.orderNum + ".pdf").replaceAll(
                                  " ",
                                  "_"
                                )}
                                paramNumOrder={item.orderNum}
                                paramNameClient={ClientName}
                                paramClientEmail={ClientEmail}
                                paramDateOrder={Dt_To_String(item.orderDate)}
                                paramTotalPrice={FormatSumString(
                                  item.totalPrice
                                )}
                                paramOrderItems={item.Items}
                                paramImage64={item.orderImgBase64!}
                              />
                            </Suspense>
                          )}
                        </td>
                        <td className="has-tex-center">
                          <button
                            className="button is-small is-primary has-text-dark"
                            onClick={(event) => {
                              event.preventDefault();
                              startTransition(() => {
                                handlePreview(
                                  item.orderNum,
                                  Dt_To_String(item.orderDate),
                                  FormatSumString(item.totalPrice),
                                  item.Items,
                                  item.orderImgBase64
                                );
                              });
                            }}
                          >
                            Просмотреть
                          </button>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </>
      )}
      <div className="buttons are-small is-centered">
        <BackButton />
      </div>
    </section>
  );
}

export default React.memo(AllOrdersCard);
