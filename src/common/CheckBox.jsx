import { TickIcon } from "./Icons";

export default function CheckBox({ onClick, checked, label, englishLabel }) {
  return (
    <button onClick={onClick} className="lg:py-4 flex items-center justify-between lg:border-b gap-x-2 text-secondary-600">
        <div className={`text-sm font-medium ${checked ? "text-primary-900" : "text-secondary-200"}`}>
          {label}
        </div>

        <div className="flex items-center gap-3">
          <div className={`text-sm font-medium ${checked ? "text-primary-900" : "text-secondary-200"}`}>
            {englishLabel}
          </div>
          <div className={`${checked ? "bg-primary-900" : "bg-slate-200"} w-5 h-5 flex items-center justify-center rounded-full`}>
            {checked && <TickIcon className={'w-3 h-3 text-white'}/>}
          </div>
        </div>
    </button>
  )
}
