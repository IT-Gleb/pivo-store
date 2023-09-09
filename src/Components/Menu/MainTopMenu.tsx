import React, { useState } from "react";

import { Link } from "react-router-dom";
import MessageBoxComponent from "../UI/MsgBox/MessageBoxComponent";
const navBarBasic = "navbarBasicMain";

function MainTopMenu() {
  const [diagShow, setDiagShow] = useState<boolean>(false);
  const MessageText =
    "Ну какого хрена все так сложно у меня? mf df gkngkl hjfkgj ldkjgfkldj gkldjfg kldfjk gljdlkfjg kldfj gkl jsdklfj lksdjf lksdjf ksdj fksdjf ksdl";

  const showMessage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setDiagShow((curr) => (curr = !curr));
    // console.log("Diag Show:", diagShow);
  };

  return (
    <>
      <MessageBoxComponent
        isShowProp={diagShow}
        closeProp={setDiagShow}
        titleProp={"Вызов диалога из меню..."}
        bodyProp={MessageText}
      />
      <nav
        className="navbar has-background-dark is-primary my-sticky"
        role="navigation"
        aria-label="main navigation"
        style={{ position: "absolute", top: 0, left: 0, width: "100%" }}
      >
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            Главная
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
          <div className="navbar-start">
            <Link className="navbar-item" to="/">
              Первое меню
            </Link>
            <Link className="navbar-item" to="/">
              Второе меню
            </Link>
            <Link className="navbar-item" to="/">
              Третье меню
            </Link>
          </div>
          {/* //------------------------------------------------------ */}
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons ">
                <button
                  className="button is-primary is-small is-size-7"
                  onClick={showMessage}
                >
                  Корзина
                </button>
                <Link className="button is-primary is-small is-size-7" to="/">
                  Выйти
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default React.memo(MainTopMenu);
