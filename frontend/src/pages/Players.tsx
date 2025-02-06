import React, { useState } from "react";

interface Player {
  name: string;
  team: string;
  age: number;
  fieldGoals: number;
}

const Players = () => {
  // Initial player data
  const initialPlayers = [
    { name: "LeBron James", team: "Lakers", age: 39, fieldGoals: 1002 },
    { name: "Stephen Curry", team: "Warriors", age: 35, fieldGoals: 920 },
    { name: "Kevin Durant", team: "Suns", age: 35, fieldGoals: 850 },
    { name: "Giannis Antetokounmpo", team: "Bucks", age: 29, fieldGoals: 890 },
    { name: "Luka Dončić", team: "Mavericks", age: 24, fieldGoals: 780 },
  ];

  // State for players data & sorting
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Player | null; direction: "asc" | "desc" }>({
    key: null,
    direction: "asc",
  });

  // Sorting function
  const sortPlayers = (key: keyof Player) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedPlayers = [...players].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setPlayers(sortedPlayers);
    setSortConfig({ key, direction });
  };

  // Function to get sort indicator (🔼 / 🔽)
  const getSortIndicator = (key: keyof Player) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? "🔼" : "🔽";
    }
    return "";
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Players Page</h2>
      <p className="mb-4">Click on column headers to sort</p>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th
                className="border px-4 py-2 text-left cursor-pointer"
                onClick={() => sortPlayers("name")}
              >
                Name {getSortIndicator("name")}
              </th>
              <th
                className="border px-4 py-2 text-left cursor-pointer"
                onClick={() => sortPlayers("team")}
              >
                Team {getSortIndicator("team")}
              </th>
              <th
                className="border px-4 py-2 text-left cursor-pointer"
                onClick={() => sortPlayers("age")}
              >
                Age {getSortIndicator("age")}
              </th>
              <th
                className="border px-4 py-2 text-left cursor-pointer"
                onClick={() => sortPlayers("fieldGoals")}
              >
                Field Goals Made {getSortIndicator("fieldGoals")}
              </th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="border px-4 py-2">{player.name}</td>
                <td className="border px-4 py-2">{player.team}</td>
                <td className="border px-4 py-2">{player.age}</td>
                <td className="border px-4 py-2">{player.fieldGoals}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Players;
