export default function RadioInput({ onClick, checked, label, className }) {
    return (
      <button onClick={onClick} className={`flex items-center gap-x-2 lg:border-b lg:py-4 ${className}`}>
        <div className={`w-5 h-5 rounded-full flex items-center justify-center p-1.5 ${checked ? "bg-primary-900" : "bg-slate-200 border border-slate-300"}`}>
          {checked && <div className="w-full h-full bg-white rounded-full"></div>}
        </div>

        <label className={`cursor-pointer text-sm font-medium ${checked ? "text-primary-900" : "text-secondary-700"}`}>
          {label}
        </label>
      </button>
    );
  }
  