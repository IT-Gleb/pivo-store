import {
  useState,
  useEffect,
  MouseEventHandler,
  useCallback,
  ReactNode,
  useRef,
} from "react";
import MyPortal, { CreateContainer } from "./myPortal";
import { PortalM } from "../../../types";
import { motion } from "framer-motion";

type TModalProps = {
  title: string;
  children?: ReactNode;
  childButtons?: ReactNode;
  onClose?: () => void;
};

const MyModal = (props: TModalProps) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { title, children, childButtons, onClose } = props;
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    CreateContainer({ id: PortalM, isClose: false });
    setIsMounted(true);
    // console.log("isMounted:", isMounted);
  }, []);

  const handleClose: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    onClose?.();
    CreateContainer({ id: PortalM, isClose: true });
    setIsMounted(false);
  }, [onClose]);

  //Обработчик событий от клавиатуры и клика вне окна
  useEffect(() => {
    const handleMouseClick = (event: MouseEvent) => {
      const { target } = event;
      if (target instanceof Node && rootRef.current === target) {
        onClose?.();
      }
    };
    const handleEscPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("click", handleMouseClick);
    window.addEventListener("keydown", handleEscPress);

    return () => {
      window.removeEventListener("click", handleMouseClick);
      window.removeEventListener("keydown", handleEscPress);
    };
  }, [onClose]);

  return isMounted ? (
    <MyPortal id={PortalM}>
      <div className="wrapperPortal" ref={rootRef}>
        <motion.div
          className="message"
          initial={{ top: "32%", scale: 0.25 }}
          animate={{
            top: "30%",
            scale: [0.5, 1.2, 0.8, 1],
            transition: { duration: 0.3 },
          }}
          style={{
            position: "relative",
            maxWidth: "70%",
            maxHeight: "auto",
            margin: "0 auto",
            top: "50%",
            transform: "translateY(-50%)",
            boxShadow: "0 0 2rem 0.6rem rgba(0, 0, 0, 0.85)",
            //   transform: "translateY(75%)",
          }}
        >
          <div className="message-header">
            {title}
            <button
              className="delete"
              title="Закрыть"
              onClick={handleClose}
            ></button>
          </div>
          <div className="message-content" style={{ padding: "1rem 2rem" }}>
            {children}
          </div>
          <div
            className="message-footer buttons are-small is-centered mt-5 pt-2"
            style={{ borderTop: "1px solid rgba(127, 125, 127, 0.55)" }}
          >
            {childButtons}
            <button
              className="button has-background-dark has-text-light"
              onClick={handleClose}
            >
              Закрыть
            </button>
          </div>
        </motion.div>
      </div>
    </MyPortal>
  ) : null;
};

export default MyModal;
