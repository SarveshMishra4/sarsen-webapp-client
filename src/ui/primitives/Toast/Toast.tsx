import { ToastItem } from "./toastStore";

interface Props {
  toast: ToastItem;
  onClose: (id: string) => void;
}

export default function Toast({ toast, onClose }: Props) {
  const { id, message, type } = toast;

  const base =
    "px-4 py-3 rounded-md shadow-lg text-md font-medium flex items-center justify-between gap-3 min-w-[260px] animate-slide-in";

  const styles = {
    success: "bg-[#63FF68] text-black",
    error: "bg-[#FF5656] text-black",
    info: "bg-[#5FD4FF] text-black",
    warning: "bg-[#FCD55B] text-black",
  };

  return (
    <div className={`${base} ${styles[type]}`}>
      <span>{message}</span>

      <button
        onClick={() => onClose(id)}
        className="text-lg  hover:opacity-70"
      >
        ✕
      </button>
    </div>
  );
}