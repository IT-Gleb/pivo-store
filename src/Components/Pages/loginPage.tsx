import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const handleOnMainPage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <div className="container">
      <section className="section">
        <h3 className="title is-size-3 has-text-centered">Авторизация</h3>
        <form className="loginForm" action="#" method="submit">
          <label className="label">
            Ваше имя:
            <input
              className="input"
              type="text"
              name="userName"
              required
              autoFocus
              tabIndex={1}
            />
          </label>
          <label className="label">
            Ваш email:
            <input
              className="input"
              type="text"
              name="userEmail"
              required
              tabIndex={2}
            />
          </label>
          <label className="label">
            Ваш пароль:
            <input
              className="input"
              type="password"
              name="userPassWord"
              required
              tabIndex={3}
            />
          </label>
          <div className="buttons are-small is-centered mt-4">
            <button
              className="button is-primary"
              type="submit"
              tabIndex={4}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              OK
            </button>
            <button
              className="button is-danger"
              onClick={handleOnMainPage}
              tabIndex={5}
            >
              Отменить
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default LoginPage;
