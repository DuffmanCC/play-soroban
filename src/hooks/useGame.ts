import { COUNTDOWN_DURATION, OPACITY_DURATION } from "@/tools/constants"
import { playTick, randomNumber } from "@/tools/helpers"
import type { Config } from "@/types"
import { useEffect, useRef, useState } from "react"

export function useGame(config: Config) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [numbers, setNumbers] = useState<number[]>([])
  const [opacity, setOpacity] = useState(true)
  const [showResult, setShowResult] = useState(false)
  const [showConfig, setShowConfig] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [myResult, setMyResult] = useState("")

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const countdownRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const round = numbers.length
  const showCountdown = isPlaying && round === 0
  const result = numbers.reduce((acc, curr) => acc + curr, 0)
  const currentValue =
    numbers[round - 1] >= 0 ? `+${numbers[round - 1]}` : numbers[round - 1]

  function reset() {
    setIsPlaying(false)
    setNumbers([])
    setShowResult(false)
    setMyResult("")

    if (intervalRef.current) clearInterval(intervalRef.current)
    if (countdownRef.current) clearTimeout(countdownRef.current)
  }

  type GameEntry = {
    date: string
    result: boolean
  }

  function addGame(storage: Storage, myResult: string) {
    const data = JSON.parse(
      storage.getItem("gameHistory") || "[]"
    ) as GameEntry[]

    data.push({
      date: new Date().toISOString(),
      result: result.toString() === myResult,
    })

    storage.setItem("gameHistory", JSON.stringify(data))
  }

  function handleCheckResult(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()

    const input = e.currentTarget.elements.namedItem(
      "result"
    ) as HTMLInputElement | null

    const value = input?.value

    if (!value) return

    setMyResult(value)
    setShowResult(true)
    addGame(localStorage, value)
    addGame(sessionStorage, value)
  }

  useEffect(() => {
    if (!isPlaying) return

    // Countdown before first round
    countdownRef.current = setTimeout(() => {
      // First number
      const firstRand = randomNumber(
        config.limitMin,
        config.limitMax,
        config.includeZero
      )
      setNumbers([firstRand])

      if (config.sounds) {
        playTick({
          frequency: 600,
          duration: 0.05,
          volume: 1,
        })
      }

      // Interval for remaining rounds
      intervalRef.current = setInterval(() => {
        setOpacity(false)

        if (config.sounds) {
          playTick({
            frequency: 600,
            duration: 0.05,
            volume: 1,
          })
        }

        setTimeout(() => {
          setNumbers((prevArr) => {
            const sumPrev = prevArr.reduce((a, b) => a + b, 0)

            const rand = randomNumber(
              config.limitMin - sumPrev,
              config.limitMax - sumPrev,
              config.includeZero
            )

            const nextArr = [...prevArr, rand]

            // Stop interval if finished
            if (
              nextArr.length >= config.numberOfRounds &&
              intervalRef.current
            ) {
              clearInterval(intervalRef.current)
              intervalRef.current = null
              setIsPlaying(false)
              setShowResult(true)
            }

            return nextArr
          })

          setOpacity(true)
        }, OPACITY_DURATION)
      }, config.speed)
    }, COUNTDOWN_DURATION * 1000)

    return () => {
      if (countdownRef.current) clearTimeout(countdownRef.current)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [
    isPlaying,
    config.limitMin,
    config.limitMax,
    config.includeZero,
    config.speed,
    config.numberOfRounds,
    config.sounds,
  ])

  return {
    isPlaying,
    setIsPlaying,
    numbers,
    round,
    result,
    opacity,
    reset,
    showCountdown,
    showSoroban: config.showSoroban,
    showConfig,
    showStats,
    showSequence: config.showSequence,
    showResult,
    setShowResult,
    setShowConfig,
    setShowStats,
    myResult,
    handleCheckResult,
    currentValue,
  }
}
