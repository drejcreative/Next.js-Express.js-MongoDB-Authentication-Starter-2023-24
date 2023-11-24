import Link from "next/link";

import style from "./Link.module.scss";

type Link = {
  text: string;
  link: string;
  icon?: string;
};

const LinkComponent = ({ text, link, icon }: Link) => {
  return (
    <Link href={link} passHref>
      <p className={style.link}>
        {icon} {text}
      </p>
    </Link>
  );
};

export default LinkComponent;
