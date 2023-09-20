import React from "react";
import { useNavigate } from "react-router-dom";
import { usePivoSelector } from "../../../hooks/storeHooks";
import { checkerAuth } from "../../../libs";

function InECartBtn() {
  const isAuth = usePivoSelector((state) => state.currentUser);
  const isUserAuth = checkerAuth(isAuth);
  const navigate = useNavigate();

  const handleCartClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!isUserAuth) {
      navigate("/login", { replace: true });
    }
  };

  return (
    <button className="button is-link is-outlined" onClick={handleCartClick}>
      <span className="icon mr-1">
        <i className="fas fa-shopping-cart"></i>
      </span>
      В корзину
    </button>
  );
}

export default React.memo(InECartBtn);
