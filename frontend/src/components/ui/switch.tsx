interface SwitchProps {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
  }
  
  export function Switch({ checked, onCheckedChange }: SwitchProps) {
    return (
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="hidden"
          checked={checked}
          onChange={(e) => onCheckedChange(e.target.checked)}
        />
        <div className={`w-10 h-5 rounded-full ${checked ? "bg-slate-400" : "bg-gray-200"}`}>
          <div
            className={`w-4 h-4 bg-white rounded-full transition-transform transform ${
              checked ? "translate-x-5" : ""
            }`}
          ></div>
        </div>
      </label>
    );
  }
  