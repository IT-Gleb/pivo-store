import RightMenu from "../Menu/RightMenu";
import RightButton from "../UI/Buttons/RightButtons";
import useVideoHeight from "../../hooks/videoHeightHook";
import { useNavigate } from "react-router-dom";
import { usePivoSelector } from "../../hooks/storeHooks";

function RightFullMenu({
  paramHandleSearch,
  paramHandleFilter,
}: {
  paramHandleSearch: () => void;
  paramHandleFilter: (event: React.MouseEvent<HTMLElement>) => void;
}) {
  const navigate = useNavigate();

  const favoritesCount = usePivoSelector(
    (state) => state.favorites.items.length
  );
  const eBasketCount = usePivoSelector((state) => state.eBasket.Items.length);
  const ordersCount = usePivoSelector(
    (state) => state.currentOrder.Items.length
  );
  const { videoHeight } = useVideoHeight();

  const handleECartClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    window.scrollTo(0, videoHeight);
    navigate("/eCart");
  };

  function handleMoveUp(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    window.scrollTo(0, videoHeight);
  }

  function handleBtnClick2(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    window.scrollTo(0, videoHeight);
    navigate("/favorites");
  }

  const handleOrderClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    navigate("/orders");
  };

  return (
    <RightMenu>
      <RightButton
        title={"Избранное"}
        buttonClass={"button p-4 is-primary is-relative"}
        iconClass="icon is-size-4 has-text-danger"
        iClass="fas fa-heart"
        hasName={false}
        isCount={favoritesCount}
        onClick={handleBtnClick2}
      />
      <RightButton
        title="Корзина"
        buttonClass="button p-4 is-info is-relative"
        iconClass="icon is-size-4 has-text-dark"
        iClass="fas fa-shopping-cart"
        hasName={false}
        isCount={eBasketCount}
        onClick={handleECartClick}
      />
      <RightButton
        title="Заказы"
        buttonClass="button p-4 has-background-success is-relative"
        iconClass="icon is-size-4 has-text-dark"
        iClass="fas fa-list"
        hasName={false}
        isCount={ordersCount}
        onClick={handleOrderClick}
      />
      <RightButton
        title="Поиск"
        buttonClass="button px-4 is-warning"
        iconClass="icon is-size-4"
        iClass="fas fa-glasses"
        hasName={false}
        onClick={paramHandleSearch}
      />
      <RightButton
        title="Фильтр"
        buttonClass="button px-4 is-primary"
        iconClass="icon is-size-4"
        iClass="fas fa-filter"
        hasName={false}
        onClick={paramHandleFilter}
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

export default RightFullMenu;
