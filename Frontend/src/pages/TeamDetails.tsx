import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TeamDetails = () => {
  const { abbr } = useParams<{ abbr: string }>();
  console.log("Team Abbreviation:", abbr);
  const [teamData, setTeamData] = useState<any>(null);

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/teams/${abbr}`);

        console.log ("response status", response.status);
        
        // Check if the response is not 2xx
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log("Fetched Team Data:", data);
        setTeamData(data);
      } catch (error) {
        console.error("Error fetching team details:", error);
      }
    };

    fetchTeamDetails();
  }, [abbr]);

  if (!teamData) return <div>No Players Found</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Team Name Header */}
      <h2 className="text-4xl font-bold text-center mb-6">{teamData.team}</h2>

      {/* Players Table */}
      <h3 className="text-2xl font-semibold mt-6">Players</h3>
      <div className="overflow-x-auto mt-4">
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Season</th>
              <th className="px-4 py-2 border-b">Points Scored</th>
            </tr>
          </thead>
          <tbody>
            {teamData.players.length > 0 ? (
              teamData.players.map((player: any) => (
                <tr key={player.pid}>
                  <td className="px-4 py-2 border-b">{player.name}</td>
                  <td className="px-4 py-2 border-b">{player.season}</td>
                  <td className="px-4 py-2 border-b">{player.pts}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-4 py-2 border-b text-center">No players found for this team.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamDetails;