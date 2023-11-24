import React from "react";
import style from "./Loadr.module.scss";

interface Props {
  warning?: boolean;
  small?: boolean;
}

const Loader = ({ warning, small }: Props) => {
  return (
    <div
      className={`${style.loader} ${small ? style.small : ""} ${warning ? style.warning : ""}`}
    ></div>
  );
};

const LoaderWrap = ({ children }: { children: React.ReactNode }) => (
  <div className={style.loaderWrap}>{children}</div>
);

export { Loader, LoaderWrap };
