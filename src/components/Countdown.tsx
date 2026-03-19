import { useEffect, useState } from "react"
import { playTick } from "../tools/helpers"

export default function Countdown({
  init,
  sounds,
}: {
  init: number
  sounds: boolean
}) {
  const [countdown, setCountdown] = useState<number>(init)

  useEffect(() => {
    if (countdown === 0) return

    document.body.classList.add("overflow-hidden")

    if (sounds) {
      playTick({
        frequency: 700,
        duration: 0.2,
        volume: 1,
      })
    }

    const id = setInterval(() => {
      setCountdown((prev) => {
        const next = prev - 1

        if (sounds) {
          playTick({
            frequency: 700,
            duration: 0.2,
            volume: 1,
          })
        }

        return next
      })
    }, 1000)

    return () => {
      document.body.classList.remove("overflow-hidden")
      clearInterval(id)
    }
  }, [sounds])

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
