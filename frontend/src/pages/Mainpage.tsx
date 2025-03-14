import React, { useState } from "react";
import Carousel from "../components/Carousel";
import PlayerModal from "../components/PlayerModal";

const players = [
  {
    name: "LeBron James",
    position: "Forward",
    team: "Los Angeles Lakers",
    age: 38,
    image: "assets/Lebron.jpg"
  },
  {
    name: "Stephen Curry",
    position: "Guard",
    team: "Golden State Warriors",
    age: 35,
    image: "assets/Steph.avif"
  },
  {
    name: "Kevin Durant",
    position: "Forward",
    team: "Phoenix Suns",
    age: 34,
    image: "assets/Kevin.jpg"
  },
  {
    name: "Giannis Antetokounmpo",
    position: "Forward",
    team: "Milwaukee Bucks",
    age: 28,
    image: "assets/Giannis.jpg"
  },
  {
    name: "Victor Wembanyama",
    position: "Center",
    team: "San Antonio Spurs",
    age: 19,
    image: "assets/wemby.jpg"
  },
  {
    name: "Luka Dončić",
    position: "Guard",
    team: "Dallas Mavericks",
    age: 24,
    image: "assets/Luka.jpg"
  },
  {
    name: "Joel Embiid",
    position: "Center",
    team: "Philadelphia 76ers",
    age: 29,
    image: "assets/Embiid.jpg"
  },
  {
    name: "Nikola Jokić",
    position: "Center",
    team: "Denver Nuggets",
    age: 28,
    image: "assets/Jokic.avif"
  },
  {
    name: "Jayson Tatum",
    position: "Forward",
    team: "Boston Celtics",
    age: 25,
    image: "assets/Tatum.jpg"
  },
  {
    name: "Devin Booker",
    position: "Guard",
    team: "Phoenix Suns",
    age: 26,
    image: "assets/Booker.jpg"
  },
  {
    name: "Ja Morant",
    position: "Guard",
    team: "Memphis Grizzlies",
    age: 23,
    image: "assets/Morant.jpg"
  },
  {
    name: "Jimmy Butler",
    position: "Forward",
    team: "Miami Heat",
    age: 33,
    image: "assets/Butler.avif"
  }
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
  const [player, setPlayer] = useState({ 
    name: "", 
    position: "", 
    team: "",
    age: 0,
    image: ""
  });

  const onClickPlayer = (p: { title: string; image: string; description: string }) => {
    console.log("Player clicked!", p);
    setShowPlayerModal(true);
    setPlayer(p);
  };

  return (<>
    <PlayerModal
        show={showPlayerModal}
        handleClose={() => setShowPlayerModal(false)}
        handleAddFavorite={()=>{
          console.log("Hi");
        }}
        player={player}
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
      <Carousel title="Players" items={players} onClick={onClickPlayer} />

      {/* Teams Section */}
      <Carousel title="Teams" items={teams} />
    </div>
  </>);
};

export default Mainpage;
