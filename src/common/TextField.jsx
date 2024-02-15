
export default function TextField({ label, name, value, onChange, placeholder, error, onBlur, inputClassName }) {
  return (
    <div className="w-full flex flex-col gap-2">
        <label htmlFor={name} className="text-sm mr-1 text-slate-500">
            {label}
        </label>
        <input 
            type="text"
            autoComplete="off"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            placeholder={placeholder}
            className={`${inputClassName} textField__input ${error ? "border-error" : "border-slate-200 focus:border-primary-900"}`}
        />
        {
          error && 
          <span className="text-xs text-error mr-1 font-medium">
            {error}
          </span>
        }
    </div>
  )
}
