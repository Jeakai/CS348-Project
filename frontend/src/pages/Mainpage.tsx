import React, { useState } from "react";
import Carousel from "../components/Carousel";
import PlayerModal from "../components/PlayerModal";

const players = [
  { title: "LeBron James", image: "assets/Lebron.jpg", description: "Los Angeles Lakers" },
  { title: "Stephen Curry", image: "assets/Steph.avif", description: "Golden State Warriors" },
  { title: "Kevin Durant", image: "assets/Kevin.jpg", description: "Phoenix Suns" },
  { title: "Giannis Antetokounmpo", image: "assets/Giannis.jpg", description: "Milwaukee Bucks" },
  { title: "Victor Wembanyama", image: "assets/wemby.jpg", description: "San Antonio Spurs" },
  { title: "Luka Dončić", image: "assets/Luka.jpg", description: "Dallas Mavericks" },
  { title: "Joel Embiid", image: "assets/Embiid.jpg", description: "Philadelphia 76ers" },
  { title: "Nikola Jokić", image: "assets/Jokic.avif", description: "Denver Nuggets" },
  { title: "Jayson Tatum", image: "assets/Tatum.jpg", description: "Boston Celtics" },
  { title: "Devin Booker", image: "assets/Booker.jpg", description: "Phoenix Suns" },
  { title: "Ja Morant", image: "assets/Morant.jpg", description: "Memphis Grizzlies" },
  { title: "Jimmy Butler", image: "assets/Butler.avif", description: "Miami Heat" }
];

const teams = [
  { title: "Los Angeles Lakers", image: "assets/LA Lakers.jpg", description: "Western Conference" },
  { title: "Golden State Warriors", image: "assets/GSW.png", description: "Western Conference" },
  { title: "Boston Celtics", image: "assets/Boston celtics.jpg", description: "Eastern Conference" },
  { title: "Miami Heat", image: "assets/Miami Heat.jpg", description: "Eastern Conference" },
  { title: "Phoenix Suns", image: "assets/Pheonix Suns.avif", description: "Western Conference" },
  { title: "Milwaukee Bucks", image: "assets/Bucks.png", description: "Eastern Conference" },
  { title: "Philadelphia 76ers", image: "assets/76ers.jpg", description: "Eastern Conference" },
  { title: "Denver Nuggets", image: "assets/Nuggets.jpg", description: "Western Conference" },
  { title: "Memphis Grizzlies", image: "assets/Grizzlies.jpg", description: "Western Conference" },
  { title: "Dallas Mavericks", image: "assets/Mavericks.jpg", description: "Western Conference" },
  { title: "San Antonio Spurs", image: "assets/Spurs.jpg", description: "Western Conference" },
  { title: "Houston Rockets", image:"assets/Houston.png", description: "Western Conference"}
];


const Mainpage = () => {
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [player, setPlayer] = useState({ title: "", image: "", description: "" });

  const onClickPlayer = (p: { title: string; image: string; description: string }) => {
    console.log("Player clicked!", p);
    setShowPlayerModal(true);
    setPlayer(p);
  };

  return (<>
    <PlayerModal show={showPlayerModal} handleClose={() => setShowPlayerModal(false)} player={player} />
    <div className="flex flex-col items-center justify-center min-h-screen text-center font-mono">

      {/* Title Section */}
      <div>
        <h1 className="text-9xl font-bold">HoopsHub</h1>
        <p className="text-base m-8 max-w-2xl mx-auto">
          Your ultimate hub for basketball stats, insights, and player performance. Dive into the game like never before!
        </p>
      </div>

      {/* Players Section */}
      <Carousel title="Players" items={players} onClick={onClickPlayer} />

      {/* Teams Section */}
      <Carousel title="Teams" items={teams} />
    </div>
  </>);
};

export default Mainpage;
