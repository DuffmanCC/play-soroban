import AnimatedModal from "@/components/AnimateModal"
import Bead from "@/components/Bead"
import Card from "@/components/Card"
import Config from "@/components/Config"
import Countdown from "@/components/Countdown"
import Stats from "@/components/Stats"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useConfig } from "@/hooks/useConfig"
import { useGame } from "@/hooks/useGame"
import { MdBarChart, MdCheck, MdSettings } from "react-icons/md"
import Soroban from "soroban-react-component"
import "soroban-react-component/style"
import packageJson from "../package.json"
import { COUNTDOWN_DURATION, SOROBAN_COLUMNS } from "./tools/constants"

export function App() {
  const { config, setConfig } = useConfig()

  const {
    isPlaying,
    setIsPlaying,
    numbers,
    round,
    result,
    opacity,
    reset,
    showCountdown,
    showSoroban,
    showConfig,
    showStats,
    showSequence,
    showResult,
    setShowResult,
    setShowConfig,
    setShowStats,
    myResult,
    handleCheckResult,
    currentValue,
  } = useGame(config)

  return (
    <>
      <header className="flex w-full justify-between">
        <button
          onClick={() => setShowStats((prev) => !prev)}
          className="relative z-20 transition-transform active:scale-95"
          aria-label="Show stats"
        >
          <MdBarChart className="size-8 text-muted-foreground" />
        </button>

        <h1 className="flex items-center justify-center gap-2 text-2xl font-bold text-muted-foreground uppercase">
          <Bead className="size-8" /> Play Soroban
        </h1>

        <button
          onClick={() => setShowConfig((prev) => !prev)}
          className="relative z-20 transition-transform active:scale-95"
          aria-label="Show config"
        >
          <MdSettings className="size-8 text-muted-foreground" />
        </button>
      </header>

      <main className="relative flex grow flex-col items-center gap-8">
        <p
          className={`flex h-40 grow items-center text-9xl leading-none transition-opacity duration-75 ${
            opacity ? "opacity-100" : "opacity-0"
          }`}
          data-testid="number"
        >
          {currentValue}
        </p>

        <p className="h-8 text-base font-semibold text-muted-foreground">
          {round > 0 && "Round: " + round}
        </p>

        <AnimatedModal open={showResult} bounce>
          <Card className="h-100">
            {!myResult ? (
              <form
                className="flex flex-col items-center gap-4"
                onSubmit={handleCheckResult}
                data-testid="result-form"
              >
                <h2 className="mb-4 text-center text-2xl font-bold">
                  Check result
                </h2>

                <Input className="w-20 text-center" name="result" />
                <Button type="submit">Check Result</Button>
              </form>
            ) : (
              <form
                className="flex flex-col items-center justify-center gap-4"
                onSubmit={(e) => {
                  e.preventDefault
                  setShowResult(false)
                  reset()
                }}
              >
                {result.toString() === myResult ? (
                  <MdCheck className="text-5xl text-green-500" />
                ) : (
                  <div className="text-2xl">Fail! result was {result}</div>
                )}
                <Button type="submit">Done</Button>
              </form>
            )}
          </Card>
        </AnimatedModal>

        {!isPlaying ? (
          <Button onClick={() => setIsPlaying(true)} data-testid="start">
            Start
          </Button>
        ) : (
          <Button onClick={reset}>Reset</Button>
        )}

        {showSoroban && <Soroban data={result} columns={SOROBAN_COLUMNS} />}
      </main>

      <AnimatedModal
        open={showStats}
        onClose={() => setShowStats(false)}
        bounce
      >
        <Card className="min-h-0">
          <Stats onClose={() => setShowStats(false)} />
        </Card>
      </AnimatedModal>

      <AnimatedModal
        open={showConfig}
        onClose={() => setShowConfig(false)}
        bounce
      >
        <Card>
          <Config
            config={config}
            setConfig={setConfig}
            onClose={() => setShowConfig(false)}
          />
        </Card>
      </AnimatedModal>

      {showCountdown && (
        <Countdown init={COUNTDOWN_DURATION} sounds={config.sounds} />
      )}

      <footer className="flex w-full flex-col gap-2">
        {showSequence && (
          <div className="w-full overflow-x-auto rounded-lg bg-primary/20 px-4 py-2 text-center font-mono text-foreground">
            {JSON.stringify(numbers)}
          </div>
        )}

        <p className="text-center text-xs text-muted-foreground">
          Made with ❤️ by DuffmanCC{" "}
          <small className="text-xs text-muted-foreground/70">
            v{packageJson.version}
          </small>
        </p>
      </footer>
    </>
  )
}

export default App
