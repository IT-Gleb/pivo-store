import { Link } from "react-router-dom";
import { usePivoDispatch, usePivoSelector } from "../hooks/storeHooks";
import { checkerAuth } from "../libs";
import { useEffect } from "react";
import { getStorageData } from "../store/slices/userSlice";
import { getFavoriteData, setFavUserId } from "../store/slices/favorites";
import { getCartDataDb, updateBasketUserId } from "../store/slices/eCartSlice";
import {
  get_OrdersFromDb,
  updateOrdersUserId,
} from "../store/slices/ordersSlice";

function UserIsLogin() {
  const dispatch = usePivoDispatch();

  const isLogin = usePivoSelector((state) => state.currentUser);
  const isValidate = checkerAuth(isLogin);
  const userName = usePivoSelector((state) => state.currentUser.Name);

  useEffect(() => {
    //Получить данные из локальной базы
    if (!isValidate) {
      dispatch(getStorageData());
      dispatch(setFavUserId(isLogin.id));
      dispatch(updateBasketUserId(isLogin.eCartId));
      dispatch(updateOrdersUserId(isLogin.ordersId));
      dispatch(getFavoriteData());
      dispatch(getCartDataDb());
      dispatch(get_OrdersFromDb(isLogin.ordersId));
    }
    if (isValidate) {
      dispatch(setFavUserId(isLogin.id));
      dispatch(updateBasketUserId(isLogin.eCartId));
      dispatch(updateOrdersUserId(isLogin.ordersId));
      dispatch(getFavoriteData());
      dispatch(getCartDataDb());
      dispatch(get_OrdersFromDb(isLogin.ordersId));
    }
  }, [isValidate, dispatch, isLogin]);

  return (
    <section className="section m-0 p-0">
      <div className="level m-0 p-1">
        <div className="level-left">
          <div className="level-item"></div>
        </div>
        <div className="level-right">
          <div className="level-item pr-2">
            <span
              className={
                isValidate
                  ? "icon mr-1 has-text-info"
                  : "icon mr-1 has-text-dark"
              }
            >
              <i className="fas fa-user"></i>
            </span>
            {isValidate ? (
              <span className="has-text-info is-size-6">{userName}</span>
            ) : (
              <span className="has-text-danger is-size-6">
                Пользователь не авторизован
                <Link to={"/login"}>
                  <button
                    className="button is-small is-primary is-rounded ml-1"
                    style={{ transform: "scale(0.8)" }}
                  >
                    Войти
                  </button>
                </Link>
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserIsLogin;
