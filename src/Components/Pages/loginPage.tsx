import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { stringRegXpEmail, stringRegXpPassword } from "../../types";

function usePasswordValidate(paramValidate: {
  Value: string;
  MaxLength: number;
}) {
  const [isPassBlur, setIsPassBlur] = useState<boolean>(false);
  const [isPassError, setIsPassError] = useState<boolean>(true);
  const MaxPass = /^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

  useEffect(() => {
    if (isPassBlur) {
      setIsPassError(true);
      // if (
      //   paramValidate["Value"].trim().length > 0 &&
      //   paramValidate["Value"].trim().length < paramValidate["MaxLength"]
      // ) {
      // } else {
      //   setIsPassError(false);
      // }

      if (MaxPass.test(paramValidate["Value"].replaceAll(" ", ""))) {
        setIsPassError(false);
      }

      // if (paramValidate["Value"].trim() === "") {
      //   setIsPassError(true);
      // } else {
      //   setIsPassError(false);
      // }
      // if (!stringRegXpPassword.test(paramValidate["Value"])) {
      //   setIsPassError(true);
      // } else {
      //   setIsPassError(false);
      // }
      // console.log(paramValidate["Value"]);
    }
  }, [isPassBlur, paramValidate, setIsPassError]);

  return {
    isPassBlur,
    setIsPassBlur,
    isPassError,
  };
}

function useNameValidate(paramValidate: { Name: string; MaxLength: number }) {
  const [isNameBlur, setIsNameBlur] = useState<boolean>(false);
  const [isNameError, setNameError] = useState<boolean>(false);

  useEffect(() => {
    if (isNameBlur) {
      if (paramValidate["Name"].trim().length < paramValidate["MaxLength"])
        setNameError(true);
      else setNameError(false);
    }
  }, [isNameBlur, paramValidate]);

  return {
    isNameBlur,
    setIsNameBlur,
    isNameError,
  };
}

function useEMailValidate(paramValue: string) {
  const [eMailErrorValue, setEmailErrorValue] = useState<string>(paramValue);
  const [isEmailError, setIsEmailError] = useState<boolean>(true);
  const [isEmailBlur, setIsEmailBlur] = useState<boolean>(false);

  useEffect(() => {
    if (isEmailBlur) {
      if (!stringRegXpEmail.test(paramValue)) {
        setEmailErrorValue("Не верный почтовый адрес...");
        setIsEmailError(true);
      } else {
        setEmailErrorValue("OK");
        setIsEmailError(false);
      }
    }
  }, [paramValue, setIsEmailError, isEmailBlur]);

  return {
    eMailErrorValue,
    isEmailError,
    isEmailBlur,
    setIsEmailBlur,
  };
}

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
    MaxLength: 8,
  });

  const PassRef = useRef<HTMLInputElement>(null);

  const handleOnMainPage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setNameValue("");
    setEMail("");
    setPassValue("");
    navigate("/");
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
                      ? "subtitle is-size-6 has-background-warning has-text-danger py-2 px-3"
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
                      ? "subtitle is-size-6 has-background-warning has-text-danger px-3 py-2"
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
                    ? "subtitle px-3 py-2 is-size-6 has-background-warning has-text-danger"
                    : "subtitle py-2 py-3 is-size-6 has-text-weight-semibold has-text-info"
                }
              >
                {isPassError
                  ? "Пароль не должен быть меньше 8-ми символов. Не должно быть пробелов. Включать 1-у заглавную букву, 1-у прописную и минимум 1-у цифру"
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
                onClick={(e) => {
                  e.preventDefault();
                }}
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
