import React, { useState } from "react";
import Card from "../components/Card"; 
import { useNavigate } from "react-router-dom";

interface TeamsProps {
  user: { uid: number | string; [key: string]: any };
}


const teams = [
  { tid: 101,title: "Los Angeles Lakers", abbr: "LAL", image: "assets/LA Lakers.jpg", description: "Western Conference" },
  { tid: 102,title: "Golden State Warriors", abbr: "GSW", image: "assets/GSW.png", description: "Western Conference" },
  { tid: 103,title: "Boston Celtics", abbr: "BOS", image: "assets/Boston celtics.jpg", description: "Eastern Conference" },
  { tid: 104,title: "Miami Heat", abbr: "MIA", image: "assets/Miami Heat.jpg", description: "Eastern Conference" },
  { tid: 105,title: "Phoenix Suns", abbr: "PHX", image: "assets/Pheonix Suns.avif", description: "Western Conference" },
  { tid: 107,title: "Milwaukee Bucks", abbr: "MIL", image: "assets/Bucks.png", description: "Eastern Conference" },
  { tid: 108,title: "Philadelphia 76ers", abbr: "PHI", image: "assets/76ers.jpg", description: "Eastern Conference" },
  { tid: 109,title: "Denver Nuggets", abbr: "DEN", image: "assets/Nuggets.jpg", description: "Western Conference" },
  { tid: 110,title: "Memphis Grizzlies", abbr:"MEM", image: "assets/Grizzlies.jpg", description: "Western Conference" },
  { tid: 111,title: "Dallas Mavericks", abbr:"DAL", image: "assets/Mavericks.jpg", description: "Western Conference" },
  { tid: 112,title: "San Antonio Spurs", abbr:"SAS", image: "assets/Spurs.jpg", description: "Western Conference" },
  { tid: 113,title: "Houston Rockets", abbr:"HOU", image: "assets/Houston.png", description: "Western Conference" }
];

const carouselTeams = teams.map((t) => ({
  pid: t.tid,             
  title: t.title,
  image: t.image,
  description: t.description,
}));


const Teams: React.FC<TeamsProps> = ({ user }) => {
  const [sortedTeams, setSortedTeams] = useState(teams);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isAscending, setIsAscending] = useState(true);
  const navigate = useNavigate();

  const handleSortByTeamName = () => {
    const sorted = [...sortedTeams].sort((a, b) => 
      isAscending ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    );
    setSortedTeams(sorted);
    setIsAscending(!isAscending);
    setShowDropdown(false);
  };

  const handleCardClick = (abbr: string) => {
    navigate(`/teams/${abbr}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Sort Button Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-center flex-1">NBA Teams</h2>
        
        {/* Sort Dropdown */}
        <div className="relative">
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            Sort By ▼
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg">
              <button 
                className="w-full text-left px-4 py-2 hover:bg-gray-200"
                onClick={handleSortByTeamName}
              >
                Team Name
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Grid Layout for Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
      {sortedTeams.map((team, index) => (
        <Card 
          key={index} 
          pid={team.tid}  // Pass team.tid here instead of carouselTeams
          uid={user && user.uid ? Number(user.uid) : 0}  // Make sure user is defined
          title={team.title} 
          image={team.image} 
          description={team.description} 
          className="w-64 h-80 p-6" 
          onClick={() => handleCardClick(team.abbr)}
          showFavorite={false}
        />
      ))}
      </div>
    </div>
  );
};

export default Teams;
