import { useState } from "react";
import type { ISliderItemProp } from "../../types";
import MyModal from "../UI/MsgBox/myModal";
import { CreateContainer } from "../UI/MsgBox/myPortal";
import { PortalM } from "../../types";

const bodyText =
  " Далеко-далеко за словесными, горами в стране гласных и согласных живут рыбные тексты. Пустился злых пояс там по всей вопроса заголовок приставка даже прямо собрал маленькая безопасную наш которой силуэт скатился, ipsum океана продолжил, его эта переписывается города вдали подпоясал курсивных он? Переписывается что своего первую семь дорогу продолжил себя жизни встретил жаренные, решила текст океана пор над заглавных текстами.";

const MySliderItem: React.FC<ISliderItemProp> = (props) => {
  const [m_Show, setMShow] = useState<boolean>(false);

  const showModal = () => {
    setMShow(true);
  };

  const CloseDialog = () => {
    setMShow(false);
    CreateContainer({ id: PortalM, isClose: true });
  };

  const handleChildClick = () => {
    window.alert("Iam Clicked !!!!!!!");
  };

  return (
    <>
      {m_Show && (
        <MyModal
          title="Это модальное окно"
          onClose={CloseDialog}
          childButtons={
            <button className="button is-link" onClick={handleChildClick}>
              Ок
            </button>
          }
        >
          <p>{bodyText}</p>
        </MyModal>
      )}
      <div className="box m-4 p-0">
        <div className="message" style={{ width: `${props.width}rem` }}>
          <div className="message-header">{props.title}</div>
          <div className="message-body block">{props.body}</div>
          <div className="centered">
            <button
              className="button is-primary is-small mb-4"
              onClick={showModal}
            >
              Click me
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MySliderItem;
