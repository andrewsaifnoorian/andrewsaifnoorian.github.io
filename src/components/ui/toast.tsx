import { useEffect, useState } from "react";

const EVENT = "toast:show";

export const showToast = (message: string) =>
  window.dispatchEvent(new CustomEvent<string>(EVENT, { detail: message }));

/** Single global status toast, announced politely to screen readers. */
export const Toaster = () => {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onShow = (e: Event) => {
      setMessage((e as CustomEvent<string>).detail);
      clearTimeout(timer);
      timer = setTimeout(() => setMessage(null), 2000);
    };
    window.addEventListener(EVENT, onShow);
    return () => {
      window.removeEventListener(EVENT, onShow);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`toast${message ? " is-visible" : ""}`} role="status" aria-live="polite">
      {message}
    </div>
  );
};
