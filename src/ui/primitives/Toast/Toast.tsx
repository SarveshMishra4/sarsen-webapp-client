import { ToastItem } from "./toastStore";

interface Props {
  toast: ToastItem;
  onClose: (id: string) => void;
}

export default function Toast({ toast, onClose }: Props) {
  const { id, message, type } = toast;

  const base =
    "px-4 py-3 rounded-lg shadow-lg text-sm font-medium flex items-center justify-between gap-3 min-w-[260px] animate-slide-in";

  const styles = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
    warning: "bg-yellow-500 text-black",
  };

  return (
    <div className={`${base} ${styles[type]}`}>
      <span>{message}</span>

      <button
        onClick={() => onClose(id)}
        className="text-lg leading-none hover:opacity-70"
      >
        ×
      </button>
    </div>
  );
}