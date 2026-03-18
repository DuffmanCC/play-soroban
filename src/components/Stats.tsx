import { Button } from "./ui/button"

export default function Stats({ onClose }: { onClose: () => void }) {
  const totalGames = JSON.parse(
    localStorage.getItem("gameHistory") || "[]"
  ) as { date: string; result: number }[]

  const sessionGames = JSON.parse(
    sessionStorage.getItem("gameSession") || "[]"
  ) as { date: string; result: number }[]

  const stats = [
    { text: "Total games", value: totalGames.length },
    { text: "Session games", value: sessionGames.length },
  ]

  return (
    <div className="flex flex-col justify-center gap-2">
      <h2 className="mb-4 text-center text-2xl font-bold">Stats</h2>

      {stats.map((s) => (
        <div className="flex items-center justify-between">
          <span className="font-semibold">{s.text}</span>
          <span>{s.value}</span>
        </div>
      ))}

      <Button onClick={onClose}>Done</Button>
    </div>
  )
}
