import { useState, useRef, useEffect } from "react";
import MessageBox from "./MessageComponent";
import { createPortal } from "react-dom";
import { PortalM } from "../../../types";

function MessageBoxComponent({
  isShowProp,
  closeProp,
  titleProp,
  bodyProp,
}: any) {
  const [isShow, setShow] = useState<boolean>(false);
  const Frag = useRef<any>(null);

  function CloseMsg() {
    setShow(false);
    closeProp(false);
    if (Frag.current) Frag.current.style.display = "none";
  }

  // const showMessage = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  //   setShow((curr) => (curr = !curr));
  //   // console.log(isShow);
  // };

  useEffect(() => {
    Frag.current = document.getElementById(PortalM);
    // console.log(isShowProp);
    // console.log(Frag.current);
  }, []);

  useEffect(() => {
    setShow(isShowProp);
    switch (isShow) {
      case true:
        Frag.current.style.display = "block";
        // console.log(isShowProp);
        break;
      case false:
        Frag.current.style.display = "none";
        // console.log(isShowProp);
        break;
    }
  }, [isShow, isShowProp]);

  return (
    <>
      {isShow &&
        createPortal(
          <MessageBox close={CloseMsg} title={titleProp} body={bodyProp} />,
          Frag.current
        )}
    </>
  );
}

export default MessageBoxComponent;
