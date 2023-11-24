import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

interface Props {
  children: React.ReactNode;
  text: JSX.Element;
  noTooltip: boolean;
}

const Tooltip = ({ text, children, noTooltip = false }: Props) => {
  if (noTooltip) {
    return children;
  }

  return (
    <>
      <p data-tip={text}>{children}</p>
      <ReactTooltip place="left" />
    </>
  );
};

export default Tooltip;
