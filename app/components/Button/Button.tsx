import React from "react";
import { motion } from "framer-motion";
import { Loader } from "../Loader/Loader";

import style from "./Button.module.scss";

interface Props {
  text: string;
  onClick?: () => void;
  primary?: boolean;
  secoundary?: boolean;
  terniary?: boolean;
  error?: boolean;
  thin?: boolean;
  small?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  inlineStyle?: React.CSSProperties;
}

const Button = ({
  text,
  primary,
  secoundary,
  terniary,
  error,
  thin,
  small,
  disabled,
  inlineStyle,
  loading,
  onClick,
  icon,
}: Props) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      className={` ${style.button} ${primary ? style.primary : ""} ${
        secoundary ? style.secoundary : ""
      }
        ${terniary ? style.terniary : ""} ${error ? style.error : ""}
        ${disabled ? style.disabled : ""} ${thin ? style.thin : ""} ${small ? style.small : ""} `}
      style={inlineStyle}
      type="submit"
      // disabled={disabled ? 'disabled' : ''}
      onClick={disabled || loading ? () => {} : onClick}
    >
      {loading && <Loader small />}
      {!!icon && <span className={style.icon}>{icon}</span>}
      {text}
    </motion.button>
  );
};

export default Button;
