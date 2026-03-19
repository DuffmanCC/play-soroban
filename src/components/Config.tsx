import Input from "@/components/Input"
import { useTheme } from "@/components/theme-provider"
import { Switch } from "@/components/ui/switch"
import { CONFIG_FIELDS } from "../tools/constants"
import type { Config } from "../types"
import { Button } from "./ui/button"
import { Slider } from "./ui/slider"

interface ConfigProps {
  config: Config
  setConfig: (config: Config) => void
  onClose: () => void
}

export default function Config({ setConfig, config, onClose }: ConfigProps) {
  const { theme, setTheme } = useTheme()

  return (
    <form
      className="flex flex-col justify-center gap-2"
      onSubmit={(e) => {
        e.preventDefault()
        onClose()
      }}
    >
      <h2 className="mb-4 text-center text-2xl font-bold">Settings</h2>

      {Object.entries(config).map(([key, value]) => {
        const field = CONFIG_FIELDS[key]

        if (field.type === "slider") {
          return (
            <label
              key={key}
              className="flex flex-col items-center justify-between"
            >
              <div className="flex w-full items-center justify-between">
                <span className="font-semibold">
                  {CONFIG_FIELDS[key].label}
                </span>

                <Slider
                  value={[value as number]}
                  onValueChange={(val) => setConfig({ ...config, [key]: val })}
                  step={CONFIG_FIELDS[key].step}
                  min={CONFIG_FIELDS[key].min}
                  max={CONFIG_FIELDS[key].max}
                  className="max-w-44"
                />
              </div>

              <span className="relative -top-1 text-xs text-muted-foreground">
                {value} {field.label === "Speed" && "ms"}
              </span>
            </label>
          )
        }

        if (field.type === "input") {
          return (
            <Input
              key={key}
              label={field.label}
              onChange={(e) =>
                setConfig({ ...config, [key]: Number(e.target.value) })
              }
              value={value as number}
              min={field.min}
              max={field.max}
              step={field.step}
              error={
                field.condition && field.condition(value as number, config)
                  ? field.error
                  : ""
              }
            />
          )
        }

        if (field.type === "switch" && field.label !== "Dark mode") {
          return (
            <label key={key} className="flex items-center justify-between">
              <span className="font-semibold">{field.label}</span>
              <Switch
                checked={value as boolean}
                onClick={() => setConfig({ ...config, [key]: !value })}
              />
            </label>
          )
        }

        return (
          <label key={key} className="flex items-center justify-between">
            <span className="font-semibold">{field.label}</span>
            <Switch
              checked={theme === "dark"}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            />
          </label>
        )
      })}

      <Button type="submit">Done</Button>
    </form>
  )
}
