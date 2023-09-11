//Создаем портал
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

type TPortalProps = {
  id: string;
  children: React.ReactNode;
};

const Portal_Error_Msg =
  "Не найден контейнер portal в html разметке. Пожалуйста добавте контейнер portal вместе с идентификатором id в attributes";

const MyPortal = (props: TPortalProps) => {
  const { id, children } = props;
  const [container, setContainer] = useState<HTMLElement>();

  useEffect(() => {
    if (id) {
      const portalContainer = document.getElementById(id);
      if (!portalContainer) {
        throw new Error(Portal_Error_Msg);
      }
      setContainer(portalContainer);
    }
  }, [id]);

  return container ? createPortal(children, container) : null;
};

//Создаем функцию создания и удаления портала для удобства
type TContainerOptions = {
  id: string;
  isClose: boolean;
  mountNode?: HTMLElement;
};

const CreateContainer = (options: TContainerOptions) => {
  const { id, isClose, mountNode = document.body } = options;
  let portalContainer = document.getElementById(id);

  if (portalContainer && isClose) {
    portalContainer.setAttribute("style", "display: none");
    mountNode.removeChild(portalContainer);
    portalContainer = null;
    return;
  }

  if (!portalContainer && !isClose) {
    portalContainer = document.createElement("div");
    portalContainer.setAttribute("id", id);
    portalContainer.setAttribute(
      "style",
      "display:block; position: fixed; left: 0; top: 0; right: 0; bottom: 0; background-color: rgba(0, 0,0, 0.3); z-index:5;"
    );
    mountNode.appendChild(portalContainer);
  }
};

export { CreateContainer, Portal_Error_Msg };

export default MyPortal;
