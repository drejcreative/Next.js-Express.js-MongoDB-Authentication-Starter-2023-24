import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./Language.module.scss";

const Language = () => {
  const router = useRouter();
  const [menu, setMenu] = useState(false);
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div className={styles.language}>
      <img src={`/images/${router.locale}.svg`} onClick={() => setMenu(!menu)} />
      <ul className={menu ? styles.show : ""} ref={ref}>
        {router?.locales?.map((locale) => (
          <li key={locale}>
            <Link href={router.asPath} locale={locale}>
              <img src={`/images/${locale}.svg`} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Language;
