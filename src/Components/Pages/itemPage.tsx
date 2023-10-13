import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { useGetItemQuery } from "../../store/punkApi/pivo.punk.api";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { IPivoItem } from "../../types";
import {
  checkInFavorites,
  checkMounth,
  checkYear,
  checkerAuth,
} from "../../libs";
import Pivovar from "../../assets/imgs/pivovar.png";
import PivoSpinner from "../UI/Spinner/pivoSpinner";
import UserIsLogin from "../userIsLogin";
import FavoriteBtn from "../UI/Buttons/favoriteBtn";
import InECartBtn from "../UI/Buttons/inECartBtn";
import { usePivoDispatch, usePivoSelector } from "../../hooks/storeHooks";
import { addNewFavItem } from "../../store/slices/favorites";
import { type TBasketItem } from "../../store/slices/eCartSlice";
import BackButton from "../UI/Buttons/backButton";

const RightItemPageMenuComponent = React.lazy(
  () => import("../Menu/rightItemPageMenu")
);

function ItemPage() {
  const { itemId } = useParams();
  const stateId = useLocation();
  const { isError, isSuccess, isLoading, data } = useGetItemQuery(
    String(itemId),
    { refetchOnReconnect: true, pollingInterval: 35000 }
  );
  const [Item, setItem] = useState<IPivoItem>();
  const [Stars, setStars] = useState<number[]>([]);
  const ScrollRef = useRef<HTMLDivElement>(null);
  const dispatch = usePivoDispatch();
  const [isFavBtnVisible, setIsFavVisible] = useState<boolean>(false);
  const favItems = usePivoSelector((state) => state.favorites.items);
  const [eCartItem, setCartItem] = useState<TBasketItem>();
  const userAuth = usePivoSelector((state) => state.currentUser);
  const isLogin = checkerAuth(userAuth);

  const GoodGrapth = lazy(() => import("../UI/Chart/randomChart"));

  useEffect(() => {
    //console.log(data);
    // console.log(tmpData);
    if (data) {
      let tmp: IPivoItem = { ...data }; //Чтобы изменить данные по цене и звездам
      if (stateId) {
        tmp._price = stateId.state.price;
        tmp._star = stateId.state.stars;
      }
      setItem(tmp);
      let i: number = 0;
      let tempStars: number[] = [];
      while (i < tmp._star!) {
        i++;
        tempStars.push(i);
      }
      if (tempStars.length > 0) setStars(tempStars);
    }
    // console.log(tmp);
  }, [isSuccess, data]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (ScrollRef.current) {
        ScrollRef.current.scrollIntoView();
      }
    }, 800);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  useEffect(() => {
    if (Item && favItems) {
      if (favItems.length > 0) {
        if (checkInFavorites(Item!.id, favItems)) {
          setIsFavVisible(true);
        } else {
          setIsFavVisible(false);
        }
      }
    }
    //Установить данные для корзины
    if (Item) {
      let tmpBasket: TBasketItem = {
        id: Item.id,
        title: Item.name,
        imgPath: Item.image_url,
        count: 1,
        price: Item._price,
        stars: Item._star,
        timeAdd: Date.now(),
        isSelected: false,
      };
      setCartItem(tmpBasket);
    }
  }, [favItems, Item]);

  if (isError)
    return (
      <article className="message is-danger m-5">
        <div className="message-header">
          <p className="has-text-centered">Ошибка!!!</p>
        </div>
        <div className="message-body">
          <p>Ошибка загрузки данных...</p>
        </div>
        <div className="block buttons are-small is-centered">
          <BackButton />
        </div>
      </article>
    );

  const addFavItem = () => {
    if (Item) {
      dispatch(addNewFavItem(Item));
    }
  };

  return (
    <>
      {isLoading && <PivoSpinner text="Загрузка данных..." />}
      {isSuccess && Item && (
        <>
          {isLogin && (
            <Suspense fallback="Загрузка меню...">
              <RightItemPageMenuComponent />
            </Suspense>
          )}
          <div className="container">
            <UserIsLogin />
            <section className="section m-5 section-with-image">
              <div className="image-container">
                <picture>
                  <source srcSet={Item.image_url}></source>
                  <img src={Pivovar} alt={Item.name} />
                </picture>
              </div>
              <div className="price-container  has-background-warning has-text-centered">
                <div className="rotateTitle has-background-primary">
                  <span className="is-size-3 title has-text-color-dark ">
                    Цена
                  </span>
                </div>
                <div className="rotatePrice is-size-3 title has-text-color-danger">
                  {Item._price}
                  <span className="is-size-5 has-text-weight-semibold">
                    .00
                  </span>
                  <span className="is-size-4 has-text-weight-semibold">
                    &#x20BD;
                  </span>
                </div>
              </div>
              <div className="item-grid">
                <div ref={ScrollRef} className="title is-size-6 has-text-dark">
                  Наименование:
                </div>
                <div className="title is-size-4">{Item.name}</div>

                <div className="title is-size-6 has-text-dark">Оценка:</div>
                <div className=" is-size-4 has-text-warning textOutlineWhite">
                  {Item._star &&
                    Stars.map((item) => {
                      return (
                        <span key={item} className="icon">
                          <i className="fas fa-star"></i>
                        </span>
                      );
                    })}
                </div>

                <div className="title is-size-6 has-text-dark">ABV:</div>
                <div>
                  <p style={{ maxWidth: "30em" }}>
                    <span className="is-my-info has-background-warning has-text-centered has-text-dark">
                      {Item.abv}&deg;
                    </span>
                    &nbsp;
                    <span className="title is-size-6">Alcohol by Volume</span> –
                    степень крепости пива. Она указывается в процентах (в
                    среднем, показатель составляет 4-5%) и свидетельствует об
                    уровне концентрации спирта в напитке.
                  </p>
                </div>

                <div className="title is-size-6 has-text-dark">IBU:</div>
                <div>
                  <p style={{ maxWidth: "30em" }}>
                    <span className="is-my-info has-background-warning has-text-centered has-text-dark">
                      {Item.ibu}
                    </span>
                    &nbsp;
                    <span className="title is-size-6">
                      International Bitterness Units
                    </span>{" "}
                    – международная шкала горечи пива от 0 до 100. Показывает
                    степень содержания смол хмеля, которые придают напитку
                    горечь. Если вы не любите очень горькие сорта, то выбирайте
                    пиво с показателем 15-25. Чем выше IBU – тем более горьким
                    окажется вкус хмельного напитка.
                  </p>
                </div>

                <div className="title is-size-6 has-text-dark">SRM:</div>
                <div>
                  <p>
                    <span className="is-my-info has-background-warning has-text-centered has-text-dark">
                      {Item.srm}
                    </span>{" "}
                    <span className="title is-size-6">
                      Standard Reference Method
                    </span>{" "}
                    — стандарт измерения интенсивности цвета. Очень светлое
                    пиво, такое как американское пшеничное, обычно имеет SRM 5,
                    в то время как темный стаут обычно находится в диапазоне
                    25-40 SRM. Цвет пива по шкале SRM.
                  </p>
                </div>

                <div className="title is-size-6 has-text-dark">EBC:</div>
                <div>
                  <p>
                    <span className="is-my-info has-background-warning has-text-centered has-text-dark">
                      {Item.ebc}
                    </span>{" "}
                    <span className="title is-size-6">Цветовая шкала EBC </span>
                    , разработанная Британским институтом пивоварения и
                    Европейской пивоваренной конвенцией, является признанным
                    методом цветовой классификации пива, солода и карамельных
                    растворов, а также жидкостей похожего цвета.
                  </p>
                </div>

                <div className="title is-size-6 has-text-dark">PH:</div>
                <div>
                  <p>
                    <span className="is-my-info has-background-warning has-text-centered has-text-dark">
                      {Item.ph}
                    </span>{" "}
                    <span className="title is-size-6">
                      Мера концентрации ионов водорода в растворе
                    </span>
                    , по сути, является мерой того, является ли вещество,
                    которое вы тестируете, кислотой или основанием. Измерение рН
                    важно на каждом этапе процесса пивоварения, от воды до
                    сусла, сусла, дрожжей, брожения пива и готового пива.
                  </p>
                </div>

                <div className="title is-size-6 has-text-dark">
                  Производится с:
                </div>
                <div>
                  <span className="is-my-info is-size-7 has-background-warning has-text-centered has-text-dark has-text-weight-semibold">
                    {checkMounth(Item.first_brewed) +
                      " " +
                      checkYear(Item.first_brewed) +
                      "г."}
                  </span>
                </div>

                <div className="title is-size-6 has-text-dark">Описание:</div>
                <div>{Item.description}</div>

                <div className="title is-size-6 has-text-dark">
                  Производство:
                </div>
                <div>{Item.brewers_tips}</div>

                <div className="title is-size-6 has-text-dark">
                  Совет пивоваров:
                </div>
                <div className="level">
                  <div
                    className="level-item has-text-centered"
                    style={{ maxWidth: "75%" }}
                  >
                    <div className="message is-success is-light">
                      <p className="message-body  has-text-dark">
                        {Item.brewers_tips}
                      </p>
                    </div>
                  </div>
                  <div className="level-item has-text-centered">
                    <img src={Pivovar} alt="Пивовар" style={{ width: 90 }} />
                  </div>
                </div>

                <div className="title is-size-6 has-text-dark">
                  Предлагаемые закуски:
                </div>
                <div>
                  {Item.food_pairing &&
                    Item.food_pairing.map((item, ind) => {
                      return (
                        <div key={ind} className="message is-info is-light">
                          <p className="message-body has-text-dark">{item}</p>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="block mt-5">
                <BackButton />
              </div>

              <div className="block buttons are-small is-rounded is-centered">
                {!isFavBtnVisible && <FavoriteBtn addNew={addFavItem} />}
                <InECartBtn itemProps={eCartItem} />
              </div>
            </section>

            <section className="section">
              {/* <RandomChart fromYear={Item.first_brewed} nameItem={Item.name} /> */}
              <Suspense fallback={<div>Загрузка графика</div>}>
                <GoodGrapth fromYear={Item.first_brewed} nameItem={Item.name} />
              </Suspense>
              <div className="block mt-5">
                <BackButton />
              </div>
            </section>
            <UserIsLogin />
          </div>
        </>
      )}
    </>
  );
}

export default ItemPage;
