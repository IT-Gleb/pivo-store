import type { IMessageBoxProps } from "../types";
import { motion } from "framer-motion";

const MessageBox: React.FC<IMessageBoxProps> = ({ title, body, close }) => {
  const handleBack: React.MouseEventHandler<HTMLElement> = (event) => {
    event.preventDefault();
    close();
  };
  return (
    <div className="Mymodal" onClick={(e) => handleBack(e)}>
      <motion.div
        initial={{ scale: 0.2 }}
        animate={{
          scale: [0.75, 1.1, 0.8, 1],
          transition: { duration: 0.2 },
        }}
        className="Mymodal-content ml-2 mr-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="title has-background-dark has-text-light has-text-centered pt-2 pb-2">
          {title}
          <span
            className="is-size-5 is-clickable is-pulled-right pl-4 pr-4 "
            title="Закрыть"
            onClick={handleBack}
          >
            &#9747;
          </span>
        </div>
        <div className="box">
          <div className="block">
            <p>{body}</p>
          </div>
        </div>
        <div className="centered">
          <button
            className="button is-small is-primary mb-4"
            onClick={(e) => handleBack(e)}
          >
            Закыть
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default MessageBox;
