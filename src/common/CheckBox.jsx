import { TickIcon } from "./Icons";

export default function CheckBox({ onClick, checked, label }) {
  return (
    <button onClick={onClick} className="flex items-center gap-x-2 text-secondary-600">
        <div className={`${checked ? "bg-primary-900" : "bg-slate-300"} w-5 h-5 flex items-center justify-center rounded-md`}>
          {checked && <TickIcon className={'w-3 h-3 text-white'}/>}
        </div>
        <div className="text-sm text-secondary-800">
          {label}
        </div>
    </button>
  )
}
