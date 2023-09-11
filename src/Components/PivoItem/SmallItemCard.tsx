import { useState, useEffect } from "react";
import { IPivoItem } from "../../types";
import { motion } from "framer-motion";
import { checkMounth, checkYear } from "../../libs";
import useScreenWidth from "../../hooks/screenWidth";
import Pivovar from "../../assets/imgs/pivovar.png";

function SmallItemCard({
  props,
  paramSel,
}: {
  props: IPivoItem;
  paramSel: number;
}) {
  const [stars, setStars] = useState<Array<number>>([]);
  const { screenWidth } = useScreenWidth();

  const handleFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    // event.stopPropagation();
    event.preventDefault();
    console.log("favorite");
  };

  const handleInCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    // event.stopPropagation();
    event.preventDefault();
    console.log("in Cart");
  };

  useEffect(() => {
    let tmp: Array<number> = [];

    if (props._star) {
      for (let i: number = 1; i <= props._star!; i++) {
        tmp.push(i);
      }
      // console.log(tmp);
      setStars(tmp);
    }
  }, [props._star]);

  return (
    <motion.article
      whileHover={{
        // scale: 1.05,
        y: -10,
        backgroundColor: "rgba(251, 249, 248, 1)",
        color: "rgb(0, 0, 125)",
        // borderTop: "0.7rem solid rgb(180, 100, 20)",
        borderTop: "0.7rem solid red",
        transition: { duration: 0.15 },
      }}
      className="card mt-2 is-clipped"
      style={{
        minHeight: screenWidth > 560 ? 240 : 245,
        maxHeight: screenWidth > 560 ? 240 : 245,
        borderTop:
          paramSel === 0
            ? "0.7rem solid rgb(55, 175, 29)"
            : paramSel === 1
            ? "0.7rem solid rgb(85, 65, 189)"
            : "0.7rem solid rgb(125, 200, 89)",
      }}
    >
      <div className="card-image">
        <div className="small-image-container is-pulled-right p-2 mr-5">
          <picture>
            <source srcSet={props.image_url}></source>
            <img src={Pivovar} alt={props.name}></img>
          </picture>
        </div>
      </div>
      <div
        className="card-content p-3"
        style={{
          minWidth: screenWidth > 400 ? 240 : 220,
          maxWidth: screenWidth > 400 ? 240 : 220,
        }}
      >
        <span
          className="myTitle"
          style={{
            minWidth: screenWidth > 400 ? 180 : 160,
            maxWidth: screenWidth > 400 ? 180 : 160,
          }}
        >
          {props.name}
        </span>
        <p>
          {stars.map((item) => {
            return (
              <span
                key={item}
                className="icon has-text-warning is-size-6 textOutlineWhite"
              >
                <i className="fas fa-star"></i>
              </span>
            );
          })}
        </p>
        <p>
          <span className="title is-size-3 has-text-danger">
            {props._price}
          </span>
          <span className="is-size-5 has-text-danger">.00 </span>
          <span className="title is-size-4 has-text-dark">&#x20BD;</span>
        </p>
        <p>
          <span className="is-size-7">Содержание спирта: &nbsp;&nbsp;</span>
          <span className="title is-size-6">{[props.abv]}&deg;</span>
        </p>
        <p>
          <span className="is-size-7">Производится с: &nbsp;&nbsp;</span>
          <span className="title is-size-7" style={{ whiteSpace: "nowrap" }}>
            {checkMounth(props.first_brewed) +
              " " +
              checkYear(props.first_brewed) +
              "г."}
          </span>
        </p>
      </div>
      <div className="card-footer">
        <div className="card-footer-item">
          <button className="button is-small" onClick={handleFavorite}>
            <span className="icon mr-1 has-text-danger">
              <i className="fas fa-heart"></i>
            </span>
            В Избранное
          </button>
        </div>
        <div className="card-footer-item">
          <button className="button is-small" onClick={handleInCart}>
            <span className="icon mr-1 has-text-primary">
              <i className="fas fa-shopping-cart"></i>
            </span>
            В Корзину
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default SmallItemCard;
