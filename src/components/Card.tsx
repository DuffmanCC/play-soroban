import { cn } from "@/lib/utils"

export default function Card({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className="max-w-75 min-w-80 rounded-3xl bg-neutral-300 p-2 dark:bg-neutral-700">
      <div
        className={cn(
          "items-between flex min-h-75 flex-col justify-center rounded-2xl bg-neutral-100 p-6 dark:bg-neutral-900",
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}
