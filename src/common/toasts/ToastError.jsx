import toast from "react-hot-toast";
import "./toast.css";

export default function ToastError(message){
  toast((t) => (
    <span className="w-full flex items-center justify-between">
      <div className="text-sm text-white">
        {message}
      </div>
      <button onClick={() => toast.dismiss(t.id)} className="btn !h-full !text-white px-4 py-3 text-xs">
        بستن
      </button>
    </span>
  ),
    {
      style:{
        borderRadius: "14px",
        padding: "10px 14px 10px 8px",
        width: "auto",
        background: "rgb(34, 36, 58)",
      },
      duration:5000
    }
  );
}