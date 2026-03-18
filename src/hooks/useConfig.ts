import { useEffect, useRef, useState } from "react"
import { CONFIG_KEY, DEFAULT_CONFIG } from "../tools/constants"

export function useConfig() {
  // Cargar desde localStorage directamente en el estado inicial
  const [config, setConfig] = useState(() => {
    try {
      const savedConfig = localStorage.getItem(CONFIG_KEY)
      if (savedConfig) {
        const parsedConfig = JSON.parse(savedConfig)
        return { ...DEFAULT_CONFIG, ...parsedConfig }
      }
    } catch (error) {
      console.error("Error loading config from localStorage:", error)
    }
    return DEFAULT_CONFIG
  })

  const isFirstRender = useRef(true)

  // Guardar en localStorage cuando cambie config (después del primer render)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    try {
      localStorage.setItem(CONFIG_KEY, JSON.stringify(config))
    } catch (error) {
      console.error("Error saving config to localStorage:", error)
    }
  }, [config])

  return {
    config,
    setConfig,
  }
}
