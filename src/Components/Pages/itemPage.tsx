import { useParams, useNavigate } from "react-router-dom";
import { useGetItemQuery } from "../../store/punkApi/pivo.punk.api";
import { Suspense, lazy, useEffect, useState } from "react";
import { IPivoItem } from "../../types";
import useVideoHeight from "../../hooks/videoHeightHook";
// import RandomChart from "../UI/Chart/randomChart";
import { checkMounth, checkYear } from "../../libs";
import Pivovar from "../../assets/imgs/pivovar.png";
import PivoSpinner from "../UI/Spinner/pivoSpinner";

function ItemPage() {
  const { itemId, priceId, starsId } = useParams();
  const navigate = useNavigate();
  const { isError, isSuccess, isLoading, data } = useGetItemQuery(
    String(itemId),
    { refetchOnReconnect: true, pollingInterval: 35000 }
  );
  const [Item, setItem] = useState<IPivoItem>();
  const [Stars, setStars] = useState<number[]>([]);
  const { videoHeight } = useVideoHeight();

  const GoodGrapth = lazy(() => import("../UI/Chart/randomChart"));

  useEffect(() => {
    //console.log(data);
    // console.log(tmpData);
    if (data) {
      let tmp: IPivoItem = { ...data }; //Чтобы изменить данные по цене и звездам
      tmp._price = Number(priceId);
      tmp._star = Number(starsId);
      setItem(tmp);
      let i: number = 0;
      let tempStars: number[] = [];
      while (i < tmp._star) {
        i++;
        tempStars.push(i);
      }
      if (tempStars.length > 0) setStars(tempStars);
    }
    // console.log(tmp);
    // console.log(priceId);
    window.scrollTo(0, videoHeight + 12);
  }, [isSuccess, data]);

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
          <button className="button is-danger " onClick={() => navigate(-1)}>
            Вернуться
          </button>
        </div>
      </article>
    );

  return (
    <>
      {isLoading && <PivoSpinner text="Загрузка данных..." />}
      {isSuccess && Item && (
        <div className="container">
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
                <span className="is-size-5 has-text-weight-semibold">.00</span>
                <span className="is-size-4 has-text-weight-semibold">
                  &#x20BD;
                </span>
              </div>
            </div>
            <div className="item-grid">
              <div className="title is-size-6 has-text-dark">Наименование:</div>
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
                <span className="is-my-info has-background-warning has-text-centered has-text-dark">
                  {Item.abv}&deg;
                </span>
              </div>

              <div className="title is-size-6 has-text-dark">IBU:</div>
              <div>
                <span className="is-my-info has-background-warning has-text-centered has-text-dark">
                  {Item.ibu}
                </span>
              </div>

              <div className="title is-size-6 has-text-dark">SRM:</div>
              <div>
                <span className="is-my-info has-background-warning has-text-centered has-text-dark">
                  {Item.srm}
                </span>
              </div>

              <div className="title is-size-6 has-text-dark">EBC:</div>
              <div>
                <span className="is-my-info has-background-warning has-text-centered has-text-dark">
                  {Item.ebc}
                </span>
              </div>

              <div className="title is-size-6 has-text-dark">PH:</div>
              <div>
                <span className="is-my-info has-background-warning has-text-centered has-text-dark">
                  {Item.ph}
                </span>
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

              <div className="title is-size-6 has-text-dark">Производство:</div>
              <div>{Item.brewers_tips}</div>

              <div className="title is-size-6 has-text-dark">
                Совет пивоваров:
              </div>
              <div className="level">
                <div
                  className="level-item has-text-centered"
                  style={{ maxWidth: "75%" }}
                >
                  <p className="notification is-success is-light has-text-dark">
                    {Item.brewers_tips}
                  </p>
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
                      <p
                        key={ind}
                        className="notification is-succes has-text-dark"
                      >
                        {item}
                      </p>
                    );
                  })}
              </div>
            </div>
            <div className="block mt-5">
              <button
                className="button is-small is-info"
                onClick={(e) => {
                  navigate(-1);
                }}
              >
                <span className="icon mr-1">
                  <i className="fas fa-arrow-left"></i>
                </span>
                Вернуться
              </button>
            </div>

            <div className="block buttons are-small is-centered">
              <button className="button is-warning is-rounded">
                <span className="icon mr-1">
                  <i className="fas fa-shopping-cart"></i>
                </span>
                В корзину
              </button>
              <button className="button is-primary is-rounded">
                <span className="icon mr-1">
                  <i className="fas fa-heart"></i>
                </span>
                В избранное
              </button>
            </div>
          </section>

          <section className="section">
            {/* <RandomChart fromYear={Item.first_brewed} nameItem={Item.name} /> */}
            <Suspense fallback={<div>Загрузка графика</div>}>
              <GoodGrapth fromYear={Item.first_brewed} nameItem={Item.name} />
            </Suspense>
            <div className="block mt-5">
              <button
                className="button is-small is-info"
                onClick={(e) => {
                  navigate(-1);
                }}
              >
                <span className="icon mr-1">
                  <i className="fas fa-arrow-left"></i>
                </span>
                Вернуться
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default ItemPage;
