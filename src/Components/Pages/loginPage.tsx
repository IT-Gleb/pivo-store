import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useEMailValidate from "../../hooks/mailValidate";
import usePasswordValidate from "../../hooks/passWordValidate";
import useNameValidate from "../../hooks/nameValidate";
import { usePivoDispatch } from "../../hooks/storeHooks";
import { updateUserData } from "../../store/slices/userSlice";
import { type IUser } from "../../types";
import { v5 as uuidV5 } from "uuid";
import { checkerAuth } from "../../libs";
import { setFavUserId } from "../../store/slices/favorites";
import { updateBasketUserId } from "../../store/slices/eCartSlice";

function LoginPage() {
  const navigate = useNavigate();
  const [eMail, setEMail] = useState<string>("");
  const { eMailErrorValue, isEmailError, isEmailBlur, setIsEmailBlur } =
    useEMailValidate(eMail);
  const [nameValue, setNameValue] = useState<string>("");
  const { isNameBlur, setIsNameBlur, isNameError } = useNameValidate({
    Name: nameValue,
    MaxLength: 4,
  });

  const [isPassVisible, setIsPassVisible] = useState<boolean>(false);

  const [passValue, setPassValue] = useState<string>("");
  const { isPassBlur, setIsPassBlur, isPassError } = usePasswordValidate({
    Value: passValue,
    MaxLength: 20,
  });

  const PassRef = useRef<HTMLInputElement>(null);
  const AuthUser: IUser = {
    Name: "",
    id: "",
    email: "",
    passWord: "",
    isAuth: false,
  };

  const dispatch = usePivoDispatch();

  const handleOnMainPage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setNameValue("");
    setEMail("");
    setPassValue("");
    navigate("/");
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    AuthUser.email = eMail;
    AuthUser.Name = nameValue;
    AuthUser.passWord = passValue;
    AuthUser.id = uuidV5(AuthUser.passWord, uuidV5.URL);
    AuthUser.isAuth = checkerAuth(AuthUser);
    //console.log(AuthUser.id);
    dispatch(updateUserData(AuthUser));
    dispatch(setFavUserId(AuthUser.id));
    dispatch(updateBasketUserId(crypto.randomUUID()));

    setNameValue("");
    setEMail("");
    setPassValue("");

    //Перейти на основную страницу
    navigate("/", { replace: true });
  };

  const handlePassVisible = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    setIsPassVisible(!isPassVisible);
    if (PassRef.current) {
      PassRef.current.focus();
    }
  };

  return (
    <div className="container">
      <section className="section">
        <h3 className="title is-size-3 has-text-centered">Авторизация</h3>
        <form className="loginForm has-icons-left" action="#" method="submit">
          <label className="label">
            Ваше имя:
            <div className="control has-icons-left">
              <input
                className="input"
                type="text"
                name="userName"
                required
                autoFocus
                placeholder="Ваше имя..."
                tabIndex={1}
                maxLength={75}
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
                onBlur={(e) => {
                  setIsNameBlur(true);
                }}
              />
              <span className="icon is-left">
                <i className="fas fa-user"></i>
              </span>
              {isNameBlur && (
                <div
                  className={
                    isNameError
                      ? "message-body is-size-6 has-background-light has-text-danger has-text-weight-light py-2 px-3"
                      : "subtitle is-size-6 has-text-info has-text-weight-semibold py-2 px-3"
                  }
                >
                  {isNameError
                    ? "Длина имени должна быть не меньше 4-х символов..."
                    : "OK"}
                </div>
              )}
            </div>
          </label>
          <label className="label">
            Ваш email:
            <div className="control has-icons-left">
              <input
                className="input"
                type="text"
                name="userEmail"
                required
                placeholder="Email..."
                tabIndex={2}
                maxLength={50}
                value={eMail}
                onChange={(e) => {
                  setEMail(e.target.value);
                }}
                onBlur={(e) => setIsEmailBlur(true)}
              />
              <span className="icon is-left mr-1">
                <i className="fas fa-mail-bulk"></i>
              </span>
              {isEmailBlur && (
                <div
                  className={
                    isEmailError
                      ? "meddage-bofy is-size-6 has-background-light has-text-danger has-text-weight-light px-3 py-2"
                      : "subtitle is-size-6 has-text-info has-text-weight-semibold px-3 py-2"
                  }
                >
                  {eMailErrorValue}
                </div>
              )}
            </div>
          </label>
          <label className="label">
            Ваш пароль:
            <div className="control has-icons-left has-icons-right">
              <input
                ref={PassRef}
                className="input"
                type={isPassVisible ? "text" : "password"}
                name="userPassWord"
                maxLength={20}
                required
                tabIndex={3}
                value={passValue}
                onChange={(e) => setPassValue(e.target.value)}
                // onBlur={(e) => setIsPassBlur(true)}
                onFocus={(e) => setIsPassBlur(true)}
              />
              <span className="icon is-left mr-1">
                <i className="fas fa-passport"></i>
              </span>
              <span
                className="icon is-right ml-1 is-clickable"
                onClick={handlePassVisible}
              >
                <i className="fas fa-eye"></i>
              </span>
            </div>
            {isPassBlur && (
              <div
                className={
                  isPassError
                    ? "message-body px-3 py-2 is-size-6 has-background-light has-text-danger has-text-weight-light"
                    : "subtitle py-2 py-3 is-size-6 has-text-weight-semibold has-text-info"
                }
              >
                {isPassError
                  ? "Пароль не должен быть меньше 8-ми символов. Не должно быть пробелов. Включать 1-у заглавную букву, 1-у прописную и минимум 1-у цифру."
                  : "OK"}
              </div>
            )}
          </label>
          <div className="buttons are-small is-centered mt-4">
            {isPassError || isNameError || isEmailError || (
              <button
                className="button is-primary"
                type="submit"
                tabIndex={4}
                onClick={handleSubmit}
              >
                Войти
              </button>
            )}
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
