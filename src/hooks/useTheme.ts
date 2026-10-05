import { useCallback, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
const listeners = new Set<() => void>();

const systemTheme = (): Theme =>
  window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";

const readTheme = (): Theme => {
  const attr = document.documentElement.dataset.theme;
  return attr === "light" || attr === "dark" ? attr : systemTheme();
};

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  const mq = window.matchMedia("(prefers-color-scheme: light)");
  const onSystemChange = () => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      /* storage unavailable */
    }
    if (!stored) {
      document.documentElement.dataset.theme = systemTheme();
      listeners.forEach((l) => l());
    }
  };
  mq.addEventListener("change", onSystemChange);
  return () => {
    listeners.delete(cb);
    mq.removeEventListener("change", onSystemChange);
  };
};

export const setTheme = (theme: Theme) => {
  const apply = () => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "light" ? "#fbfbfa" : "#09090b");
    listeners.forEach((l) => l());
  };
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* storage unavailable: theme still applies for this visit */
  }
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduced && "startViewTransition" in document) {
    document.startViewTransition(apply);
  } else {
    apply();
  }
};

const useTheme = () => {
  const theme = useSyncExternalStore(subscribe, readTheme, () => "dark" as Theme);
  const toggle = useCallback(() => setTheme(theme === "dark" ? "light" : "dark"), [theme]);
  return { theme, toggle };
};

export default useTheme;
