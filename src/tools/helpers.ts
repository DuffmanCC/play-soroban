export function randomNumber(min: number, max: number, includeZero = false) {
  if (includeZero) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  let num
  do {
    num = Math.floor(Math.random() * (max - min + 1)) + min
  } while (num === 0)
  return num
}

export function beadsCol(num: number): boolean[] {
  switch (num) {
    case 1:
      return [false, false, true, true, true]

    case 2:
      return [false, false, false, true, true]

    case 3:
      return [false, false, false, false, true]

    case 4:
      return [false, false, false, false, false]

    case 5:
      return [true, true, true, true, true]

    case 6:
      return [true, false, true, true, true]

    case 7:
      return [true, false, false, true, true]

    case 8:
      return [true, false, false, false, true]

    case 9:
      return [true, false, false, false, false]

    default:
      return [false, true, true, true, true]
  }
}

let ctx: AudioContext | null = null

function getCtx() {
  if (typeof AudioContext === "undefined") return null // ✅ clave

  if (!ctx) {
    ctx = new AudioContext()
  }

  return ctx
}

export function playTick({
  frequency,
  duration,
  volume,
}: {
  frequency: number
  duration: number
  volume: number
}) {
  const ctx = getCtx()
  if (!ctx) return // en tests no hace nada

  if (ctx.state === "suspended") ctx.resume()

  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = "sine"
  osc.frequency.value = frequency

  osc.connect(gain)
  gain.connect(ctx.destination)

  const now = ctx.currentTime
  gain.gain.setValueAtTime(volume, now)
  // Decay más rápido que la duración completa
  gain.gain.linearRampToValueAtTime(0.0001, now + duration * 0.6)

  osc.start()
  osc.stop(ctx.currentTime + duration)
}

export function getPercentage(success: number, total: number) {
  if (total === 0) return "0"

  const value = (100 * success) / total
  return Number.isInteger(value) ? value.toString() : value.toFixed(2)
}
