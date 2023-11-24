import { VscColorMode } from "react-icons/vsc";

import useTheme, { THEMES } from "hooks/useTheme";

import styles from "./ThemeChange.module.scss";

const ThemeChange = () => {
  const { theme, setCurrentTheme } = useTheme();

  const handleThemeChange = () => {
    setCurrentTheme(theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT);
  };

  return <VscColorMode className={styles.theme} onClick={handleThemeChange} />;
};

export default ThemeChange;
