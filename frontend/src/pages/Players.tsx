import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for making API calls

interface Player {
  pname: string;
  season: string;
  nationality: string;
  height: string;
  height_cm: number;
  weight: number;
  weight_kg: number;
  pts: number;
  ast: number;
  reb: number;
  blk: number;
  stl: number;
  gp: number;
  min: number;
  fgm: number;
  fga: number;
  threepm: number;
  threepa: number;
  freetm: number;
  freeta: number;
  tov: number;
  pf: number;
  orb: number;
  drb: number;
  birth_year: number;
  birth_month: string;
  birth_date: string;
  high_school: string;
  draft_round: number;
  draft_pick: number;
}

const Players = () => {
  // State for players data, loading status, and error message
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Sorting configuration state
  const [sortConfig, setSortConfig] = useState<{ key: keyof Player | null; direction: "asc" | "desc" }>({
    key: null,
    direction: "asc",
  });

  // Fetching players data from the API
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        // Replace with your API endpoint
        const response = await axios.get("http://localhost:3000/api/players");
        setPlayers(response.data); // Set fetched players data to state
        setLoading(false); // Stop loading
      } catch (err) {
        setError("Failed to fetch players data."); // Set error message on failure
        setLoading(false); // Stop loading
      }
    };

    fetchPlayers();
  }, []); // Empty dependency array means it runs once when the component mounts

  // Sorting function for player data
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

      {/* Error Message */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Loading Indicator */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          {/* Table for displaying players */}
          <table className="min-w-full border border-gray-300 bg-white">
            <thead className="bg-gray-200">
              <tr>
                <th
                  className="border px-4 py-2 text-left cursor-pointer"
                  onClick={() => sortPlayers("pname")}
                >
                  Name {getSortIndicator("pname")}
                </th>
                <th
                  className="border px-4 py-2 text-left cursor-pointer"
                  onClick={() => sortPlayers("season")}
                >
                  Season {getSortIndicator("season")}
                </th>
                <th
                  className="border px-4 py-2 text-left cursor-pointer"
                  onClick={() => sortPlayers("nationality")}
                >
                  Nationality {getSortIndicator("nationality")}
                </th>
                <th
                  className="border px-4 py-2 text-left cursor-pointer"
                  onClick={() => sortPlayers("height")}
                >
                  Height {getSortIndicator("height")}
                </th>
                <th
                  className="border px-4 py-2 text-left cursor-pointer"
                  onClick={() => sortPlayers("weight")}
                >
                  Weight {getSortIndicator("weight")}
                </th>
                <th
                  className="border px-4 py-2 text-left cursor-pointer"
                  onClick={() => sortPlayers("pts")}
                >
                  Points {getSortIndicator("pts")}
                </th>
                <th
                  className="border px-4 py-2 text-left cursor-pointer"
                  onClick={() => sortPlayers("ast")}
                >
                  Assists {getSortIndicator("ast")}
                </th>
                <th
                  className="border px-4 py-2 text-left cursor-pointer"
                  onClick={() => sortPlayers("reb")}
                >
                  Rebounds {getSortIndicator("reb")}
                </th>
                <th
                  className="border px-4 py-2 text-left cursor-pointer"
                  onClick={() => sortPlayers("blk")}
                >
                  Blocks {getSortIndicator("blk")}
                </th>
                <th
                  className="border px-4 py-2 text-left cursor-pointer"
                  onClick={() => sortPlayers("stl")}
                >
                  Steals {getSortIndicator("stl")}
                </th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="border px-4 py-2">{player.pname}</td>
                  <td className="border px-4 py-2">{player.season}</td>
                  <td className="border px-4 py-2">{player.nationality}</td>
                  <td className="border px-4 py-2">{player.height}</td>
                  <td className="border px-4 py-2">{player.weight}</td>
                  <td className="border px-4 py-2">{player.pts}</td>
                  <td className="border px-4 py-2">{player.ast}</td>
                  <td className="border px-4 py-2">{player.reb}</td>
                  <td className="border px-4 py-2">{player.blk}</td>
                  <td className="border px-4 py-2">{player.stl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Players;
