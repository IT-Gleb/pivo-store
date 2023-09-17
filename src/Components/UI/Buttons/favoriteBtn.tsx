import React from "react";
import { usePivoSelector } from "../../../hooks/storeHooks";
import { useNavigate } from "react-router-dom";
import { checkerAuth } from "../../../libs";

function FavoriteBtn() {
  const isAuth = usePivoSelector((state) => state.currentUser);

  const userAuth: boolean = checkerAuth(isAuth);
  const navigate = useNavigate();

  const handleFavClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!userAuth) {
      navigate("/login", { replace: true });
    }
  };

  return (
    <button
      className="button has-text-dark is-warning is-outlined"
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
