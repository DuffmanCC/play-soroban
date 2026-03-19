import packageJson from "../../package.json"
import { type Config, type ConfigFields } from "../types"

export const OPACITY_DURATION = 75
export const COUNTDOWN_DURATION = 3
export const SOROBAN_COLUMNS = 7
export const CONFIG_KEY = `config-v${packageJson.version}`
export const DEFAULT_CONFIG: Config = {
  speed: 1500,
  numberOfRounds: 10,
  limitMin: 0,
  limitMax: 9,
  includeZero: false,
  showSoroban: true,
  showSequence: false,
  darkMode: false,
  sounds: true,
}

export const CONFIG_FIELDS: ConfigFields = {
  speed: {
    label: "Speed",
    min: 100,
    max: 5000,
    step: 100,
    error: "Speed must be between 100 and 5000",
    condition: (value: number) => value < 100 || value > 5000,
    type: "slider",
  },
  numberOfRounds: {
    label: "Rounds",
    min: 2,
    max: 100,
    step: 1,
    error: "Rounds must be between 2 and 100",
    condition: (value: number) => value < 2 || value > 100,
    type: "slider",
  },
  limitMin: {
    label: "Min",
    min: 0,
    max: 9999999,
    step: 1,
    error: "Between 0 and 9999999 and less than limit sum max",
    condition: (value, config) =>
      value < 0 || value > 9999999 || value >= config.limitMax,
    type: "input",
  },
  limitMax: {
    label: "Max",
    min: 1,
    max: 9999999,
    step: 1,
    error: "Between 1 and 9999999 and greater than limit sum min",
    condition: (value, config) =>
      value < 1 || value > 9999999 || value <= config.limitMin,
    type: "input",
  },
  includeZero: {
    label: "Include zero",
    type: "switch",
  },
  showSoroban: {
    label: "Show soroban",
    type: "switch",
  },
  showSequence: {
    label: "Show sequence",
    type: "switch",
  },
  darkMode: {
    label: "Dark mode",
    type: "switch",
  },
  sounds: {
    label: "Sounds",
    type: "switch",
  },
}
