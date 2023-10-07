import React from "react";
import RightMenu from "./RightMenu";
import RightButton from "../UI/Buttons/RightButtons";
import { useNavigate } from "react-router-dom";
import useVideoHeight from "../../hooks/videoHeightHook";
import { usePivoSelector } from "../../hooks/storeHooks";

function RightItemPageMenu() {
  const navigate = useNavigate();
  const { videoHeight } = useVideoHeight();
  const favoritesCount = usePivoSelector(
    (state) => state.favorites.items.length
  );
  const ordersCount = usePivoSelector(
    (state) => state.currentOrder.Items.length
  );
  const eCartCount = usePivoSelector((state) => state.eBasket.Items.length);

  const handleMoveUp = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    window.scrollTo(0, videoHeight);
  };

  const handleMain = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    window.scrollTo(0, videoHeight);
    navigate("/");
  };

  const handleFavorites = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    window.scrollTo(0, videoHeight);
    navigate("/favorites");
  };

  const handleOrders = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    window.scrollTo(0, videoHeight);
    navigate("/orders");
  };

  const handleECart = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    window.scrollTo(0, videoHeight);
    navigate("/eCart");
  };

  return (
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
        title={"Корзина"}
        buttonClass={"button p-4 is-primary is-relative"}
        iconClass="icon is-size-4 has-text-dark"
        iClass="fas fa-shopping-cart"
        hasName={false}
        isCount={eCartCount}
        onClick={handleECart}
      />

      <RightButton
        title={"Заказы"}
        buttonClass={"button p-4 has-background-success is-relative"}
        iconClass="icon is-size-4 has-text-dark"
        iClass="fas fa-list"
        hasName={false}
        isCount={ordersCount}
        onClick={handleOrders}
      />

      <RightButton
        title="Переход на верх"
        buttonClass="button px-4 is-link"
        iconClass="icon is-size-4"
        iClass="fas fa-arrow-up"
        hasName={false}
        onClick={handleMoveUp}
      ></RightButton>
    </RightMenu>
  );
}

export default React.memo(RightItemPageMenu);
