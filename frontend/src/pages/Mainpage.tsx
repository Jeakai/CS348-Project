import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "../components/Carousel";
import PlayerModal from "../components/PlayerModal";

interface MainpageProps {
  user: { uid: number | string; [key: string]: any };
}

const players = [
  {
    pid: 111,
    title: "LeBron James",
    position: "Forward",
    description: "Los Angeles Lakers",
    age: 38,
    image: "assets/Lebron.jpg",
    height: 203,
    weight: 113,
    points: 27
  },
  {
    pid: 112,
    title: "Stephen Curry",
    position: "Guard",
    description: "Golden State Warriors",
    age: 35,
    image: "assets/Steph.avif",
    height: 191,
    weight: 84,
    points: 30
  },
  {
    pid: 113,
    title: "Kevin Durant",
    position: "Forward",
    description: "Phoenix Suns",
    age: 34,
    image: "assets/Kevin.jpg",
    height: 208,
    weight: 109,
    points: 28
  },
  {
    pid: 114,
    title: "Giannis Antetokounmpo",
    position: "Forward",
    description: "Milwaukee Bucks",
    age: 28,
    image: "assets/Giannis.jpg",
    height: 211,
    weight: 110,
    points: 29
  },
  {
    pid: 115,
    title: "Victor Wembanyama",
    position: "Center",
    description: "San Antonio Spurs",
    age: 19,
    image: "assets/wemby.jpg",
    height: 220,
    weight: 90,
    points: 15
  },
  {
    pid: 116,
    title: "Luka Dončić",
    position: "Guard",
    description: "Dallas Mavericks",
    age: 24,
    image: "assets/Luka.jpg",
    height: 201,
    weight: 104,
    points: 28
  },
  {
    pid: 117,
    title: "Joel Embiid",
    position: "Center",
    description: "Philadelphia 76ers",
    age: 29,
    image: "assets/Embiid.jpg",
    height: 213,
    weight: 127,
    points: 30
  },
  {
    pid: 118,
    title: "Nikola Jokić",
    position: "Center",
    description: "Denver Nuggets",
    age: 28,
    image: "assets/Jokic.avif",
    height: 211,
    weight: 116,
    points: 26
  },
  {
    pid: 119,
    title: "Jayson Tatum",
    position: "Forward",
    description: "Boston Celtics",
    age: 25,
    image: "assets/Tatum.jpg",
    height: 203,
    weight: 95,
    points: 25
  },
  {
    pid: 120,
    title: "Devin Booker",
    position: "Guard",
    description: "Phoenix Suns",
    age: 26,
    image: "assets/Booker.jpg",
    height: 198,
    weight: 95,
    points: 24
  },
  {
    pid: 121,
    title: "Ja Morant",
    position: "Guard",
    description: "Memphis Grizzlies",
    age: 23,
    image: "assets/Morant.jpg",
    height: 196,
    weight: 79,
    points: 22
  },
  {
    pid: 122,
    title: "Jimmy Butler",
    position: "Forward",
    description: "Miami Heat",
    age: 33,
    image: "assets/Butler.avif",
    height: 201,
    weight: 102,
    points: 21
  }
];
// console.log("players:", players);

const carouselPlayers = players.map((player) => ({
  pid: player.pid,
  title: player.title,
  image: player.image,
  description: player.description,
  age: player.age,
  height: player.height,
  weight: player.weight,
  points: player.points
}));
// console.log("carouselPlayers:", carouselPlayers);

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
    isFavorited: boolean;
    age: number;
    height: number;
    weight: number;
    points: number;
  }
  
  const [carouselPlayersWithFav, setPlayers] = useState<CarouselPlayer[]>([]);

  useEffect(() => {
    setPlayers(carouselPlayers.map((p) => ({
        ...p,
        isFavorited: favPids.includes(p.pid),
    })));
  }, [carouselPlayers, favourites]);

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
        />

        {/* Teams Section */}
        <Carousel
          title="Teams"
          items={carouselTeams}
          uid={user && user.uid ? Number(user.uid) : 0}
          showFavorite={false}
        />
      </div>
    </>
  );
};

export default Mainpage;
