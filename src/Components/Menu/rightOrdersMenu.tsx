import React from "react";
import { useNavigate } from "react-router-dom";
import { usePivoSelector } from "../../hooks/storeHooks";
import useVideoHeight from "../../hooks/videoHeightHook";
import RightMenu from "./RightMenu";
import RightButton from "../UI/Buttons/RightButtons";

function RightOrdersMenu() {
  const navigate = useNavigate();
  const favoritesCount = usePivoSelector(
    (state) => state.favorites.items.length
  );
  const ordersCartCount = usePivoSelector(
    (state) => state.eBasket.Items.length
  );
  const { videoHeight } = useVideoHeight();

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

  const handleCart = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    window.scrollTo(0, videoHeight);
    navigate("/eCart");
  };

  const handleMoveUp = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    window.scrollTo(0, videoHeight);
  };

  return (
    <RightMenu>
      <RightButton
        title={"На главную"}
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
        title={"Корзина"}
        buttonClass={"button p-4 has-background-primary is-relative"}
        iconClass="icon is-size-4 has-text-dark"
        iClass="fas fa-shopping-cart"
        hasName={false}
        isCount={ordersCartCount}
        onClick={handleCart}
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
  );
}

export default React.memo(RightOrdersMenu);
