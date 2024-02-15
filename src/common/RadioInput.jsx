export default function RadioInput({ onClick, checked, label }) {
    return (
      <button onClick={onClick} className="flex items-center gap-x-2">
        <div className={`w-5 h-5 rounded-full flex items-center justify-center p-1.5 ${checked ? "bg-primary-900" : "bg-slate-300 border border-slate-400"}`}>
          {checked && <div className="w-full h-full bg-white rounded-full"></div>}
        </div>

        <label className="cursor-pointer text-sm text-secondary-800">
          {label}
        </label>
      </button>
    );
  }
  