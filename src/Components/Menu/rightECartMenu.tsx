import React from "react";
import { useNavigate } from "react-router-dom";
import { usePivoSelector } from "../../hooks/storeHooks";
import useVideoHeight from "../../hooks/videoHeightHook";
import RightMenu from "./RightMenu";
import RightButton from "../UI/Buttons/RightButtons";

function RightECartMenu() {
  const navigate = useNavigate();
  const favoritesCount = usePivoSelector(
    (state) => state.favorites.items.length
  );
  const ordersCount = usePivoSelector(
    (state) => state.currentOrder.Items.length
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

  const handleOrders = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    window.scrollTo(0, videoHeight);
    navigate("/orders");
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
        iClass="fas fa-home"
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
      />
    </RightMenu>
  );
}

export default React.memo(RightECartMenu);
