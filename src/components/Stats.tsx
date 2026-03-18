export default function Stats() {
  const totalGames = JSON.parse(
    localStorage.getItem("gameHistory") || "[]",
  ) as { date: string; result: number }[];

  const sessionGames = JSON.parse(
    sessionStorage.getItem("gameSession") || "[]",
  ) as { date: string; result: number }[];

  const stats = [
    { text: "Total games", value: totalGames.length },
    { text: "Session games", value: sessionGames.length },
  ];

  return (
    <div>
      <h2 className="font-bold text-center text-3xl mb-4">Stats</h2>
      {stats.map((s) => (
        <div className="flex justify-between items-center">
          <span className="font-semibold">{s.text}</span>
          <span>{s.value}</span>
        </div>
      ))}
    </div>
  );
}
