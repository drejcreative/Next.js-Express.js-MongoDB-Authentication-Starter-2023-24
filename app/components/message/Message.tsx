import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegTimesCircle } from "react-icons/fa";

import style from "./Message.module.scss";

interface Props {
  icon: React.ReactNode;
  message: string;
  succes?: boolean;
  error?: boolean;
  full?: boolean;
}

const Message = ({ icon, message, succes, error, full }: Props) => {
  const [hide, setHide] = useState(false);
  return (
    <AnimatePresence>
      {!hide && (
        <motion.p
          className={`${style.message} ${succes ? style.succes : ""} ${error ? style.error : ""} ${
            full ? style.full : ""
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className={style.text}>{icon}</span>
          {message}
          <span className={style.close} onClick={() => setHide(true)}>
            <FaRegTimesCircle />
          </span>
        </motion.p>
      )}
    </AnimatePresence>
  );
};

export default Message;
