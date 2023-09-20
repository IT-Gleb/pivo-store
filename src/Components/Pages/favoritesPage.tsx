import { Link, useNavigate } from "react-router-dom";
import { usePivoSelector } from "../../hooks/storeHooks";
import { IPivoItem } from "../../types";
import SmallItemCard from "../PivoItem/SmallItemCard";

function FavoritesPage() {
  const favItems = usePivoSelector((state) => state.favorites.items);
  const navigate = useNavigate();

  const handleBack = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(-1);
  };

  return (
    <section className="section">
      <div className="title is-size-5 title-article has-text-centered">
        Вы выбрали{" "}
        <span className="title is-size-6">{favItems.length} позиций</span>
      </div>
      <div className="small-item-grid">
        {favItems &&
          favItems.length > 0 &&
          favItems.map((item: IPivoItem) => {
            return (
              <Link
                key={item.id}
                to={`/items/${item.id}`}
                state={{ price: item._price, stars: item._star }}
              >
                <SmallItemCard props={item} paramSel={2} />;{" "}
              </Link>
            );
          })}
      </div>
      <div
        className="buttons are-small is-centered mt-4 p-4"
        style={{ borderTop: "1px solid rgba(120, 120, 120, 0.5)" }}
      >
        <button className="button is-info" onClick={handleBack}>
          <span className="icon mr-1">
            <i className="fas fa-arrow-left"></i>
          </span>
          Вернуться
        </button>
      </div>
    </section>
  );
}

export default FavoritesPage;
