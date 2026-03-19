import { DEFAULT_CONFIG } from "@/tools/constants"
import "@testing-library/jest-dom"
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { beforeEach, describe, expect, test, vi } from "vitest"
import App from "../src/App"

describe("Play Soroban", () => {
  beforeEach(() => {
    render(<App />)
  })

  test("Render title", () => {
    const title = screen.getByText("Play Soroban")
    expect(title).toBeTruthy()
  })

  test("Start is visible at the begining", () => {
    const button = screen.getByTestId("start")
    expect(button).toBeVisible()
  })

  test("Start is not visible after starting", async () => {
    const startButton = screen.getByTestId("start")

    fireEvent.click(startButton)

    await waitFor(() => {
      expect(screen.queryByTestId("start")).not.toBeInTheDocument()
    })
  })

  test("Countdown starts after start button is clicked", () => {
    const startButton = screen.getByTestId("start")

    fireEvent.click(startButton)

    const countdown = screen.getByTestId("countdown")
    expect(countdown).toBeInTheDocument()
  })

  test("Countdown disappears after 3 seconds", () => {
    vi.useFakeTimers()

    const startButton = screen.getByTestId("start")
    fireEvent.click(startButton)

    // Comprobamos que el countdown está presente inicialmente
    let countdown = screen.getByTestId("countdown")
    expect(countdown).toBeInTheDocument()

    // Avanzamos los timers 3 segundos
    act(() => {
      vi.advanceTimersByTime(3000) // avanzamos 3 segundos
    })

    // Ahora el countdown debería desaparecer
    expect(screen.queryByTestId("countdown")).not.toBeInTheDocument()

    vi.useRealTimers()
  })

  test("First number appears after countdown", () => {
    vi.useFakeTimers()

    const startButton = screen.getByTestId("start")
    fireEvent.click(startButton)

    // Comprobamos que el countdown está presente inicialmente
    let countdown = screen.getByTestId("countdown")
    expect(countdown).toBeInTheDocument()

    // Avanzamos los timers 3 segundos
    act(() => {
      vi.advanceTimersByTime(3000) // avanzamos 3 segundos
    })

    // Ahora el countdown debería desaparecer
    expect(screen.queryByTestId("countdown")).not.toBeInTheDocument()

    const number = screen.getByTestId("number")
    expect(number).toBeInTheDocument()

    // texto dentro del elemento
    const numberText = number.textContent
    // Verifica que el texto sea un número (puede ser positivo o negativo)
    expect(numberText).toMatch(/^-?\+?\d+$/)
    expect(number).toHaveClass("opacity-100")

    vi.useRealTimers()
  })

  test("Result modal is visible after end", () => {
    vi.useFakeTimers()

    const startButton = screen.getByTestId("start")
    fireEvent.click(startButton)

    // Tiempo total = countdown (3s) + (número de rondas * velocidad)
    const totalTime =
      3000 + DEFAULT_CONFIG.numberOfRounds * DEFAULT_CONFIG.speed
    const step = 100 // avanzar en pasos de 100ms

    // Avanzamos los timers en pasos pequeños para que React actualice cada estado
    for (let t = 0; t <= totalTime; t += step) {
      act(() => {
        vi.advanceTimersByTime(step)
      })
    }

    // Ahora el modal debería estar visible
    const modal = screen.getByTestId("result-form")
    expect(modal).toBeVisible()

    vi.useRealTimers()
  })
})
