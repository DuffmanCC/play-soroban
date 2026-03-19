import { getPercentage } from "@/tools/helpers"
import { Button } from "./ui/button"

export default function Stats({ onClose }: { onClose: () => void }) {
  const totalGames = JSON.parse(
    localStorage.getItem("gameHistory") || "[]"
  ) as { date: string; result: boolean }[]

  const totalSuccess = totalGames.filter((g) => g.result)

  const sessionGames = JSON.parse(
    sessionStorage.getItem("gameHistory") || "[]"
  ) as { date: string; result: boolean }[]

  const sessionSuccess = sessionGames.filter((g) => g.result)

  const stats = [
    { text: "Total games", value: totalGames.length },
    { text: "Session games", value: sessionGames.length },
    {
      text: "% total games",
      value: getPercentage(totalSuccess.length, totalGames.length),
    },
    {
      text: "% session games",
      value: getPercentage(sessionSuccess.length, sessionGames.length),
    },
  ]

  return (
    <div className="flex flex-col justify-center gap-8">
      <h2 className="text-center text-2xl font-bold">Stats</h2>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((s) => (
          <div className="flex flex-col items-center justify-between">
            <span className="text-3xl font-bold">{s.value}</span>
            <span className="text-xs font-semibold text-muted-foreground">
              {s.text}
            </span>
          </div>
        ))}
      </div>

      <Button onClick={onClose}>Done</Button>
    </div>
  )
}
