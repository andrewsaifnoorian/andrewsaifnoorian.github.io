const EVENT = "palette:open";

export const openPalette = () => window.dispatchEvent(new Event(EVENT));

export const onPaletteOpen = (cb: () => void) => {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
};
