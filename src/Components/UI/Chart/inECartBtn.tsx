import React from "react";
import { useNavigate } from "react-router-dom";
import { usePivoSelector } from "../../../hooks/storeHooks";

function InECartBtn() {
  const isAuth = usePivoSelector((state) => state.currentUser.isAuth);
  const navigate = useNavigate();

  const handleCartClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!isAuth) {
      navigate("/login", { replace: true });
    }
  };

  return (
    <button className="button is-rounded" onClick={handleCartClick}>
      <span className="icon mr-1">
        <i className="fas fa-shopping-cart"></i>
      </span>
      В корзину
    </button>
  );
}

export default InECartBtn;
