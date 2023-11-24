import { useState, useEffect } from "react";

import { getStorage, setStorage } from "../utils/storage";

const THEMES = {
  DARK: "dark",
  LIGHT: "light",
};

function useTheme() {
  const defaultDark = global.window && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const html = global.window && document.querySelector("html");
  const [theme, setTheme] = useState(defaultDark ? THEMES.DARK : THEMES.LIGHT);

  useEffect(() => {
    const currentTheme = getStorage("theme");
    if (currentTheme) {
      setTheme(currentTheme);
      html?.setAttribute("data-theme", currentTheme);
      return;
    }
    html?.setAttribute("data-theme", theme);
  }, []);

  function setCurrentTheme(theme: string) {
    setTheme(theme);
    setStorage("theme", theme);
    html?.setAttribute("data-theme", theme);
  }

  return { theme, setCurrentTheme };
}

export default useTheme;
export { THEMES };
