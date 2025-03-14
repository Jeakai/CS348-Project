import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TeamDetails = () => {
  const { abbr } = useParams<{ abbr: string }>();
  console.log("Teamdetails component is mounting for the team:", abbr);
  const [teamData, setTeamData] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedSeason, setSelectedSeason] = useState<string>("2019-2020"); //Set default season to 2019-2020

  const fetchTeamDetails = async (searchQuery = "", seasonQuery = selectedSeason) => {
    try {
      const normalizedSeason = seasonQuery.replace(/\s*-\s*/, ' - ');  // Normalize the season here
      const params: { search: string; season: string } = { search: searchQuery, season: normalizedSeason };
      console.log("Requesting:", `http://localhost:3000/api/teams/${abbr}`, JSON.stringify(params));
      
      setTeamData(null);

      const response = await axios.get(`http://localhost:3000/api/teams/${abbr}`, { params });
      console.log("response status from teamdetails.tsx", response.status);
      
      const data = response.data;
      console.log("Fetched Team Data:", data);
      
      
      setTeamData(data); 

    } catch (error) {
      console.error("Error fetching team details:", error);
    }
  };

  // UseEffect to trigger data fetching
  useEffect(() => {
    console.log("Fetching team details inside USE EFFECT:", selectedSeason);
    fetchTeamDetails(searchTerm, selectedSeason); // Fetch data when searchTerm or selectedSeason changes
  }, [abbr, selectedSeason]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value); // Update search term
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetchTeamDetails(searchTerm, selectedSeason); // Trigger data fetch with current search term
  };

  const handleSeasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSeason(event.target.value); // Set new selected season
  };

  if (!teamData || !teamData.players) return <div>No Players Found...</div>; // Handle case if players are missing

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Team Name Header */}
      <h2 className="text-4xl font-bold text-center mb-6">{teamData.team}</h2>

      <div className="overflow-x-auto">
        <form onSubmit={handleSearchSubmit} className="mb-4 flex items-center">
          <input
            type="text"
            placeholder="Search player..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border px-3 py-2 w-full md:w-1/3 rounded-md"
          />
          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          >
            Search
          </button>
        </form>
      </div>

      {/* Players Table */}
      <h3 className="text-2xl font-semibold mt-6">Players</h3>
      <div className="overflow-x-auto mt-4">
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Season
                {/* Season Dropdown in Table Header */}
                <select
                  value={selectedSeason}
                  onChange={handleSeasonChange}
                  className="border px-3 py-2 rounded-md"
                >
                  {['1999-2000', '2000-2001', '2001-2002', '2002-2003', '2003-2004', '2004-2005',
                    '2005-2006', '2006-2007', '2007-2008', '2008-2009', '2009-2010', '2010-2011',
                    '2011-2012', '2012-2013', '2013-2014', '2014-2015', '2015-2016', '2016-2017',
                    '2017-2018', '2018-2019', '2019-2020'].map((season) => (
                      <option key={season} value={season}>{season}</option>
                  ))}
                </select>
              </th>
              <th className="px-4 py-2 border-b">Points Scored</th>
            </tr>
          </thead>
          <tbody>
            {teamData.players && teamData.players.length > 0 ? (
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
