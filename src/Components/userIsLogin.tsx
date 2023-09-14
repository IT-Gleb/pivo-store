import { Link } from "react-router-dom";
import { usePivoSelector } from "../hooks/storeHooks";

function UserIsLogin() {
  const isLogin = usePivoSelector((state) => state.currentUser.isAuth);
  const userName = usePivoSelector((state) => state.currentUser.Name);

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
                isLogin ? "icon mr-1 has-text-info" : "icon mr-1 has-text-dark"
              }
            >
              <i className="fas fa-user"></i>
            </span>
            {isLogin ? (
              <span className="has-text-info is-size-6">
                Привет!- {userName}
              </span>
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
