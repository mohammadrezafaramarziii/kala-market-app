import toast from "react-hot-toast";
import "./toast.css";

export default function ToastSuccess(message){
  toast((t) => (
    <span className="w-full flex items-center justify-between gap-8">
      <div className="text-sm text-secondary-800 sm:whitespace-nowrap">
        {message}
      </div>
      <button onClick={() => toast.dismiss(t.id)} className="btn !text-secondary-800 !h-full px-4 py-3 text-xs">
        بستن
      </button>
    </span>
  ),
    {
      style:{
        borderRadius: "14px",
        padding: "10px 14px 10px 8px",
        maxWidth: "none",
        minWidth:"none",
        width:"auto",
      },
      duration:5000
    }
  );
}