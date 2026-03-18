import { useEffect, useState } from "react"

export default function Countdown({ init }: { init: number }) {
  const [countdown, setCountdown] = useState<number>(init)

  useEffect(() => {
    if (countdown === 0) return

    const id = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    document.body.classList.add("overflow-hidden")

    return () => {
      document.body.classList.remove("overflow-hidden")
      clearInterval(id)
    }
  }, [countdown])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      data-testid="countdown"
    >
      <div
        role="timer"
        aria-live="polite"
        className="no-scrollbar flex justify-center overflow-hidden p-6 font-mono text-[20rem] text-white"
      >
        {countdown}
      </div>
    </div>
  )
}
