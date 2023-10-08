import React from "react";

import { Link, useNavigate } from "react-router-dom";
import { usePivoDispatch, usePivoSelector } from "../../hooks/storeHooks";
import { checkerAuth } from "../../libs";
import useVideoHeight from "../../hooks/videoHeightHook";
import { clearUserData } from "../../store/slices/userSlice";
import { clearFavorites } from "../../store/slices/favorites";
import { clearBasket } from "../../store/slices/eCartSlice";
import { clearCurrOrder } from "../../store/slices/currOrderSlice";
import { clearOrdersStore } from "../../store/slices/ordersSlice";
import PivoNotification from "../../libs/Notification/notification";

import UserIsLoginName from "../userIsLoginName";
const navBarBasic = "navbarBasicMain";

function MainTopMenu() {
  const isAuthUser = usePivoSelector((state) => state.currentUser);
  const isAuth = checkerAuth(isAuthUser);
  const navigate = useNavigate();
  const { videoHeight } = useVideoHeight();
  const dispatch = usePivoDispatch();

  const logIn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!isAuth) {
      navigate("/login", { replace: true });
    } else {
      window.scrollTo(0, videoHeight);
    }
  };

  const logOut = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (isAuth) {
      dispatch(clearUserData());
      dispatch(clearFavorites());
      dispatch(clearBasket());
      dispatch(clearCurrOrder());
      dispatch(clearOrdersStore());

      PivoNotification(`Данные пользователя - ${isAuthUser.Name} - удалены.`, [
        "has-background-success",
        "has-text-danger",
      ]);
    }
    window.scrollTo(0, videoHeight);
  };

  return (
    <>
      <nav
        className="navbar has-background-dark is-primary my-sticky"
        role="navigation"
        aria-label="main navigation"
        style={{ position: "absolute", top: 0, left: 0, width: "100%" }}
      >
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            Главная
            <UserIsLoginName />
          </Link>

          {/* Меню Гамбургер */}
          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target={navBarBasic}
            href="!#"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
          {/* End of MenuGamburgher */}
        </div>

        <div id={navBarBasic} className="navbar-menu">
          <div className="navbar-start"></div>
          {/* //------------------------------------------------------ */}
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons are-small">
                <button className="button is-primary mr-2" onClick={logIn}>
                  <span className="icon mr-1">
                    <i className="fas fa-user"></i>
                  </span>
                  Войти
                </button>
                <button className="button is-danger" onClick={logOut}>
                  <span className="icon mr-1">
                    <i className="fas fa-door-open"></i>
                  </span>
                  Выйти
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default React.memo(MainTopMenu);
