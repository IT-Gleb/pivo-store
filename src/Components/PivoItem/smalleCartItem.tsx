import React, { useEffect, useState } from "react";
import { type TBasketItem } from "../../store/slices/eCartSlice";
import { motion } from "framer-motion";
import Pivovar from "../../assets/imgs/pivovar.png";
import { Link, useNavigate } from "react-router-dom";
import RightMenu from "../Menu/RightMenu";
import RightButton from "../UI/Buttons/RightButtons";
import { usePivoSelector } from "../../hooks/storeHooks";
import useVideoHeight from "../../hooks/videoHeightHook";

const SmalleBasketItemCard = ({ prop }: { prop: TBasketItem }) => {
  const maxCount: number = 100;
  const [count, setCount] = useState<number>(prop.count);
  const [numValue, setNumValue] = useState<number>(prop.count);
  const [totalPrice, setTotalPrice] = useState<number>(
    prop.price! * prop.count
  );
  const [stars, setStars] = useState<number[]>([]);
  const favoritesCount = usePivoSelector(
    (state) => state.favorites.items.length
  );
  const navigate = useNavigate();
  const { videoHeight } = useVideoHeight();

  const handleCount = (event: React.ChangeEvent<HTMLInputElement>) => {
    let tmpVal: number = Math.max(
      1,
      Math.min(maxCount, Number(event.target.value))
    );
    setCount(tmpVal);
    setNumValue(tmpVal);
    if (prop.price) setTotalPrice(tmpVal * prop.price!);
  };

  useEffect(() => {
    if (prop.stars) {
      let tmpStars: number[] = [];
      for (let i: number = 0; i < prop.stars; i++) {
        tmpStars.push(i);
      }
      setStars(tmpStars);
    }
  }, [prop.stars]);

  const handleFavorites = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    window.scrollTo(0, videoHeight);
    navigate("/favorites");
  };

  const handleMain = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    window.scrollTo(0, videoHeight);
    navigate("/");
  };

  const handleMoveUp = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    window.scrollTo(0, videoHeight);
  };

  return (
    <>
      <RightMenu>
        <RightButton
          title={"На глвную"}
          buttonClass={"button p-4 is-warning is-relative"}
          iconClass="icon is-size-4 has-text-black"
          iClass="fas fa-file"
          hasName={false}
          isCount={-1}
          onClick={handleMain}
        />
        <RightButton
          title={"Избранное"}
          buttonClass={"button p-4 is-primary is-relative"}
          iconClass="icon is-size-4 has-text-danger"
          iClass="fas fa-heart"
          hasName={false}
          isCount={favoritesCount}
          onClick={handleFavorites}
        />
        <RightButton
          title="Переход на верх"
          buttonClass="button px-4 is-link"
          iconClass="icon is-size-4"
          iClass="fas fa-arrow-up"
          hasName={false}
          onClick={handleMoveUp}
        />
      </RightMenu>

      <motion.div className="card is-clipped">
        <div className="card-header has-background-black-ter has-text-light">
          <div className="card-header-title myTitle has-text-light p-0 px-2">
            {prop.title}
          </div>
          <div className="card-header-icon">
            <span className="icon ">
              <i className="fas fa-shopping-cart"></i>
            </span>
          </div>
        </div>
        <div className="card-content p-0">
          <div className="level">
            <div className="level-left">
              <Link
                to={`/items/${prop.id}`}
                state={{ price: prop.price, stars: prop.stars }}
              >
                <div
                  className="level-item"
                  style={{ maxWidth: "5rem", maxHeight: "12rem" }}
                >
                  <picture className="eCardPicture">
                    <source srcSet={prop.imgPath} />
                    <img src={Pivovar} alt={prop.title} />
                  </picture>
                </div>
              </Link>
            </div>
            <div className="level-right has-background-grey-lighter">
              <div
                className="level-item p-4"
                style={{ width: "100%", height: "100%" }}
              >
                <ul>
                  <li>
                    {stars &&
                      stars.length > 0 &&
                      stars.map((item) => {
                        return (
                          <span
                            key={item}
                            className="icon has-text-warning textOutlineBlack"
                            style={{ borderBottom: "1px dashed #000" }}
                          >
                            <i className="fas fa-star"></i>
                          </span>
                        );
                      })}
                  </li>
                  <li>
                    <label className="label">
                      Цена за шт. :
                      <span className="has-text-info is-size-4 ml-2">
                        {prop.price}
                      </span>
                      <span className="is-size-5 ml-1">&#8381;</span>
                    </label>
                  </li>
                  <li className="control">
                    <label className="label is-flex">
                      Изменить:
                      <input
                        type="range"
                        min={1}
                        step={1}
                        max={maxCount}
                        value={count}
                        onChange={handleCount}
                        className="is-clickable ml-2"
                      />
                      <input
                        type="number"
                        className="input"
                        value={numValue}
                        onChange={handleCount}
                        style={{ width: 70 }}
                      />
                    </label>
                  </li>
                  <li>
                    <label className="label">
                      Итого:
                      <span className="is-size-3 has-text-link ml-2">
                        {totalPrice}
                      </span>
                      <span className="is-size-4">.00</span>
                      <span className="is-size-5 ml-1">&#8381;</span>
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer buttons are-small has-background-black-ter">
          <div className="card-footer-item">
            <motion.button
              whileTap={{ scale: 0.65 }}
              className="button is-info"
            >
              В заказ
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default React.memo(SmalleBasketItemCard);
