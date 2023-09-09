import { useState, useRef, useEffect } from "react";
import MessageBox from "../MessageComponent";
import { createPortal } from "react-dom";
import type { ISliderItemProp } from "../../types";

const bodyText =
  " Далеко-далеко за словесными, горами в стране гласных и согласных живут рыбные тексты. Пустился злых пояс там по всей вопроса заголовок приставка даже прямо собрал маленькая безопасную наш которой силуэт скатился, ipsum океана продолжил, его эта переписывается города вдали подпоясал курсивных он? Переписывается что своего первую семь дорогу продолжил себя жизни встретил жаренные, решила текст океана пор над заглавных текстами.";

const MySliderItem: React.FC<ISliderItemProp> = (props) => {
  const [m_Show, setMShow] = useState<boolean>(false);
  const Frag = useRef<any>(null);

  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  //   setMShow((curr) => (curr = !curr));
  // };

  function closeModal() {
    setMShow(false);
    //console.log("Close from component");
  }

  useEffect(() => {
    Frag.current = document.getElementById("portal-M");
    //console.log(Frag.current);
  }, []);

  useEffect(() => {
    switch (m_Show) {
      case true:
        // let ScrollY = window.scrollY;
        Frag.current.style.display = "block";
        //        console.log(document.body.style.position);
        //document.body.style.paddingRight = "0px";
        // document.body.style.position = "fixed";
        // document.body.style.top = `-${ScrollY}px`;
        // window.scrollTo(0, parseInt(String(ScrollY) || "0") * -1);
        // console.log(document.body.style.overflow);
        // document.body.style.overflow = "hidden";
        break;
      case false:
        //let ScrollY2 = document.body.style.top;
        Frag.current.style.display = "none";
        // document.body.style.position = "";
        // document.body.style.top = "";
        // document.body.style.top = `-${ScrollY2}px`;
        //document.body.style.top = "";
        // document.body.style.overflow = "scrollY";
        // console.log(document.body.style.overflow);
        break;
    }
  }, [m_Show]);

  return (
    <>
      {m_Show &&
        createPortal(
          <MessageBox
            close={closeModal}
            title={"Какой-то заголовок"}
            body={bodyText}
          />,
          Frag.current
        )}
      <div className="box m-4 p-0">
        <div className="message" style={{ width: `${props.width}rem` }}>
          <div className="message-header">{props.title}</div>
          <div className="message-body block">{props.body}</div>
          <div className="centered">
            <button className="button is-primary is-small mb-4">
              Click me
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MySliderItem;
