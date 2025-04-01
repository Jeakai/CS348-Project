import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "../components/Carousel";
import PlayerModal from "../components/PlayerModal";

interface MainpageProps {
  user: { uid: number | string; [key: string]: any };
}

const teams = [
  { tid: 101, title: "Los Angeles Lakers", image: "assets/LA Lakers.jpg", description: "Western Conference" },
  { tid: 102, title: "Golden State Warriors", image: "assets/GSW.png", description: "Western Conference" },
  { tid: 103, title: "Boston Celtics", image: "assets/Boston celtics.jpg", description: "Eastern Conference" },
  { tid: 104, title: "Miami Heat", image: "assets/Miami Heat.jpg", description: "Eastern Conference" },
  { tid: 105, title: "Phoenix Suns", image: "assets/Pheonix Suns.avif", description: "Western Conference" },
  { tid: 106, title: "Milwaukee Bucks", image: "assets/Bucks.png", description: "Eastern Conference" },
  { tid: 107, title: "Philadelphia 76ers", image: "assets/76ers.jpg", description: "Eastern Conference" },
  { tid: 108, title: "Denver Nuggets", image: "assets/Nuggets.jpg", description: "Western Conference" },
  { tid: 109, title: "Memphis Grizzlies", image: "assets/Grizzlies.jpg", description: "Western Conference" },
  { tid: 110, title: "Dallas Mavericks", image: "assets/Mavericks.jpg", description: "Western Conference" },
  { tid: 111, title: "San Antonio Spurs", image: "assets/Spurs.jpg", description: "Western Conference" },
  { tid: 112, title: "Houston Rockets", image: "assets/Houston.png", description: "Western Conference" }
];

const carouselTeams = teams.map((t) => ({
  pid: t.tid,
  title: t.title,
  image: t.image,
  description: t.description,
}));

const Mainpage: React.FC<MainpageProps> = ({ user }) => {
  // For player modal
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [player, setPlayer] = useState({
    pid: 0,
    title: "",
    image: "",
    description: "",
  });

  // For favourites
  const [favourites, setFavourites] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchLatestPlayers = async () => {
      try{
        setLoading(true);
        const response = await axios.get("http://localhost:3000/api/players/latest");
        console.log("What does my latest players look like in useeffect?", response);

        const currentYear = new Date().getFullYear();

        const formattedPlayers = response.data.map((player: any) => {
          // Create image path from player name
          const imageName = `${player.player_name.toLowerCase().replace(/\s+/g, '-')}.jpg`;
          const imagePath = `assets/${imageName}`;
          
          return {
            pid: player.player_id,
            title: player.player_name,
            image: imagePath, // Use the constructed path
            description: `${player.team_name}`,
            favCount: player.favorites_count,
            // isFavourited: player.favorites_count > 0,
            age: currentYear - player.birth_year,
            height: player.height_cm,
            weight: player.weight_kg,
            points: player.points,
          };
        });

        console.log("What does formattedPlayers look like", formattedPlayers);
        setPlayers(formattedPlayers);
      } catch (err){
        console.error("Erro fetching latest players:", err);
        setError("Failed to load player data");
      } finally {
        setLoading(false);
      }
    };
    fetchLatestPlayers();
  }, []);

  // 1. Fetch user favourites (if logged in)
  useEffect(() => {
    const fetchFavourites = async () => {
      if (!user?.uid) {
        // If no user, skip
        return;
      }
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`http://localhost:3000/api/favourites/${user.uid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavourites(response.data);
      } catch (err) {
        console.error("Error fetching favourites:", err);
        setError("Failed to fetch favourites");
      } finally {
        setLoading(false);
      }
    };
    fetchFavourites();
  }, [user]);

  const favPids = favourites.map((f: any) => f.pid);

  interface CarouselPlayer {
    pid: number;
    title: string;
    image: string;
    description: string;
    favCount: number;
    isFavourited: boolean;
    age: number;
    height: number;
    weight: number;
    points: number;
  }
  
  const [carouselPlayersWithFav, setPlayers] = useState<CarouselPlayer[]>([]);

  useEffect(() => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((p) => ({
        ...p,
        isFavourited: favPids.includes(p.pid),
    })));
  }, [favourites]);

  // For card click
  const onClickPlayer = (p: { pid: number; title: string; image: string; description: string }) => {
    console.log("Player clicked!", p);
    setShowPlayerModal(true);
    setPlayer(p);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <PlayerModal
        show={showPlayerModal}
        handleClose={() => setShowPlayerModal(false)}
        player={player}
        setPlayer={setPlayer}
        uid={user && user.uid ? Number(user.uid) : 0}
        players={carouselPlayersWithFav}
        setPlayers={setPlayers}
      />
      <div className="flex flex-col items-center justify-center min-h-screen text-center font-mono">
        {/* Title Section */}
        <div>
          <h1 className="text-9xl font-bold">HoopsHub</h1>
          <p className="text-base m-8 max-w-2xl mx-auto">
            Your ultimate hub for basketball stats, insights, and player performance. Dive into the game like never before!
          </p>
        </div>

        {/* Players Section */}
        <Carousel
          title="Players"
          items={carouselPlayersWithFav}
          onClick={onClickPlayer}
          uid={user && user.uid ? Number(user.uid) : 0}
          onFavouriteToggle={(pid, liked) => {
            console.log("Favourite toggled:", pid, liked);
            setPlayers((prev) =>
              prev.map((p) => (p.pid === pid ? { ...p, isFavourited: liked } : p))
            );
          }}
        />

        {/* Teams Section */}
        <Carousel
          title="Teams"
          items={carouselTeams}
          uid={user && user.uid ? Number(user.uid) : 0}
          showFavourite={false}
        />
      </div>
    </>
  );
};

export default Mainpage;
