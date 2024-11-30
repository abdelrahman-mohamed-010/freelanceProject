import { createPortal } from "react-dom";
import React from "react";

interface ModalProps {
  open: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, children }) => {
  if (!open) return null; // Only render if open

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-end z-50 bg-black bg-opacity-50">
      {children}
    </div>,
    document.getElementById("modal") as HTMLElement
  );
};

export default Modal;
