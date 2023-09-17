import React from "react";
import { usePivoSelector } from "../../../hooks/storeHooks";
import { useNavigate } from "react-router-dom";

function FavoriteBtn() {
  const isAuth = usePivoSelector((state) => state.currentUser.isAuth);
  const navigate = useNavigate();

  const handleFavClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!isAuth) {
      navigate("/login", { replace: true });
    }
  };

  return (
    <button
      className="button is-rounded has-text-dark"
      onClick={handleFavClick}
    >
      <span className="icon mr-1">
        <i className="fas fa-heart"></i>
      </span>
      В избранное
    </button>
  );
}

export default FavoriteBtn;
