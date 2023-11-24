import Link from "next/link";

import { CONFIG } from "../../../config";
import style from "./AuthLayout.module.scss";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={style.auth}>
      <div className={style.left}>
        <Link href="/" passHref>
          <h3 className="link">{CONFIG.SITE_NAME}</h3>
        </Link>
        <p>
          Copyright © {new Date().getFullYear()} {CONFIG.SITE_NAME} All Rights Reserved.
        </p>
      </div>
      <div className={style.right}>
        <div className={style.smalHeader}>
          <Link href="/" passHref>
            <img src="/images/logo.svg" alt={CONFIG.SITE_NAME} width={50} height={50} />
          </Link>
        </div>
        {children}
        <div className={style.smalFooter}>
          <p>
            Copyright © {new Date().getFullYear()} {CONFIG.SITE_NAME} Sva prava zadrzana.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
