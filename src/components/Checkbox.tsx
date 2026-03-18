import { type ReactNode } from "react"

interface CheckboxProps {
  label?: string
  name?: string
  required?: boolean
  onClick?: () => void
  children?: ReactNode
  value: boolean
}

export default function Checkbox({
  label,
  name,
  required = false,
  onClick,
  children,
  value,
}: CheckboxProps) {
  return (
    <label className="flex items-center justify-between" onClick={onClick}>
      <span className="font-semibold">{label || children}</span>

      <div className="relative">
        <input
          type="checkbox"
          name={name}
          className={`peer h-8 w-8 appearance-none rounded-lg border bg-white text-white checked:border-0 checked:bg-indigo-500 focus:border-indigo-500`}
          required={required}
          checked={value}
        />

        <svg
          className="pointer-events-none absolute top-0.5 left-0.5 hidden h-7 w-7 peer-checked:block"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
    </label>
  )
}
