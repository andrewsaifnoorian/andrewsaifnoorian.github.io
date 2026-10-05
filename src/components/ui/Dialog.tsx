import { useEffect, useRef, type ReactNode } from "react";
import { FiX } from "react-icons/fi";
import "./dialog.css";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
  className?: string;
  showClose?: boolean;
}

/**
 * Thin wrapper over the native <dialog> element: focus trapping, Escape to
 * close, inert background and top-layer stacking all come from the platform.
 */
const Dialog = ({ open, onClose, label, children, className, showClose = true }: DialogProps) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={`dialog ${className ?? ""}`}
      aria-label={label}
      onClose={onClose}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        // Clicks on the ::backdrop land on the dialog element itself.
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {open && (
        <div className="dialog__inner">
          {showClose && (
            <button className="dialog__close" onClick={onClose} aria-label="Close">
              <FiX />
            </button>
          )}
          {children}
        </div>
      )}
    </dialog>
  );
};

export default Dialog;
