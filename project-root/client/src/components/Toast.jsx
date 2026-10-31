import "./Toast.css";
import { CircleX, X } from "lucide-react";

export default function Toast({ alertText, onClose }) {
  if (!alertText) {
    return null;
  }
  return (
    <div className="error-container">
      <CircleX className="error-container__icon" />
      <span>{alertText}</span>
      <X
        className="error-container__close-btn"
        cursor="pointer"
        onClick={onClose}
      />
    </div>
  );
}
