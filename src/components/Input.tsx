import { Input as InputShadcn } from "./ui/input"

interface InputProps {
  label: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: number
  min?: number
  max?: number
  step?: number
  error?: string | null
}

export default function Input({
  label,
  onChange,
  value = 0,
  min,
  max,
  step,
  error,
}: InputProps) {
  return (
    <label className="items-between relative flex flex-col justify-between pb-4">
      <div className="flex items-center justify-between">
        <span className="font-semibold">{label}</span>

        <InputShadcn
          type="number"
          className="w-20 text-right"
          onChange={onChange}
          value={value}
          min={min}
          max={max}
          step={step}
        />
      </div>

      {error && (
        <small className="absolute bottom-0 text-[10px] text-destructive">
          {error}
        </small>
      )}
    </label>
  )
}
