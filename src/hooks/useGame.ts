import { useEffect, useRef, useState } from "react"
import { COUNTDOWN_DURATION, OPACITY_DURATION } from "../tools/constants"
import { randomNumber } from "../tools/helpers"
import type { Config } from "../types"

export function useGame(config: Config) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [arr, setArr] = useState<number[]>([])
  const [round, setRound] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [opacity, setOpacity] = useState(true)
  const [showConfig, setShowConfig] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [myResult, setMyResult] = useState<number | null>(null)

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const countdownRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const isFinished = round === config.numberOfRounds
  const showCountdown = isPlaying && round === 0

  const result = arr.reduce((acc, curr) => acc + curr, 0)

  function reset() {
    setIsPlaying(false)
    setArr([])
    setRound(0)
    setShowResult(false)
    setMyResult(null)

    if (intervalRef.current) clearInterval(intervalRef.current)
    if (countdownRef.current) clearTimeout(countdownRef.current)
  }

  function addGameToHistory() {
    const gameHistory = JSON.parse(
      localStorage.getItem("gameHistory") || "[]"
    ) as { date: string; result: number }[]

    gameHistory.push({
      date: new Date().toISOString(),
      result,
    })

    localStorage.setItem("gameHistory", JSON.stringify(gameHistory))
  }

  function addGameToSession() {
    const gameSession = JSON.parse(
      sessionStorage.getItem("gameSession") || "[]"
    ) as { date: string; result: number }[]

    gameSession.push({
      date: new Date().toISOString(),
      result,
    })

    sessionStorage.setItem("gameSession", JSON.stringify(gameSession))
  }

  function handleCheckResult(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = e.currentTarget
    const input = form.elements.namedItem("result") as HTMLInputElement | null
    const value = input?.value

    setMyResult(value ? Number(value) : null)
    setShowResult(true)
    addGameToHistory()
    addGameToSession()
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
      setArr([firstRand])
      setRound(1)

      // Interval for remaining rounds
      intervalRef.current = setInterval(() => {
        setOpacity(false)

        setTimeout(() => {
          setArr((prevArr) => {
            const sumPrev = prevArr.reduce((a, b) => a + b, 0)

            const rand = randomNumber(
              config.limitMin - sumPrev,
              config.limitMax - sumPrev,
              config.includeZero
            )

            const nextArr = [...prevArr, rand]
            setRound(nextArr.length)

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
  ])

  return {
    isPlaying,
    setIsPlaying,
    arr,
    round,
    result,
    showResult,
    isFinished,
    opacity,
    reset,
    setShowResult,
    showCountdown,
    showSoroban: config.showSoroban,
    showConfig,
    setShowConfig,
    addGameToHistory,
    addGameToSession,
    showStats,
    setShowStats,
    setMyResult,
    myResult,
    showSequence: config.showSequence,
    handleCheckResult,
  }
}
