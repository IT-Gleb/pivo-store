import React from "react";

import { Link } from "react-router-dom";
// import MyModal from "../UI/MsgBox/myModal";
const navBarBasic = "navbarBasicMain";

function MainTopMenu() {
  // const [diagShow, setDiagShow] = useState<boolean>(false);

  // const showMessage = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  //   setDiagShow(true);
  //   // console.log("Diag Show:", diagShow);
  // };
  // const hideMessage = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  //   setDiagShow(false);
  //   // console.log("Diag Show:", diagShow);
  // };
  // const CloseDialog = () => {
  //   setDiagShow(false);
  // };

  return (
    <>
      {/* {diagShow && (
        <MyModal title="Привет" onClose={CloseDialog}>
          <label className="p-5">
            Введите что-нибудь:
            <input type="text" className="input" maxLength={25} />
          </label>
        </MyModal>
      )} */}
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
          <div className="navbar-start"></div>
          {/* //------------------------------------------------------ */}
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons are-small">
                <Link to="/login">
                  <button className="button is-primary mr-2 ">
                    <span className="icon mr-1">
                      <i className="fas fa-user"></i>
                    </span>
                    Войти
                  </button>
                </Link>
                <button className="button is-danger">Выйти</button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default React.memo(MainTopMenu);
