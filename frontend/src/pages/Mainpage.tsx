import React from "react";
import Carousel from "../components/Carousel";

const players = [
  { title: "LeBron James", image: "assets/Lebron.jpg", description: "Los Angeles Lakers" },
  { title: "Stephen Curry", image: "assets/Steph.avif", description: "Golden State Warriors" },
  { title: "Kevin Durant", image: "assets/Kevin.jpg", description: "Phoenix Suns" },
  { title: "Giannis Antetokounmpo", image: "assets/Giannis.jpg", description: "Milwaukee Bucks" },
  { title: "Wembayama", image: "assets/wemby.jpg", description: "Idk what team"},
  { title: "Wembayama", image: "assets/wemby.jpg", description: "Idk what team"},
  { title: "Luka Dončić", image: "assets/Luka.jpg", description: "Dallas Mavericks" }
];

const teams = [
  { title: "Los Angeles Lakers", image: "assets/LA Lakers.jpg", description: "Western Conference" },
  { title: "Golden State Warriors", image: "assets/GSW.png", description: "Western Conference" },
  { title: "Boston Celtics", image: "assets/Boston celtics.jpg", description: "Eastern Conference" },
  { title: "Miami Heat", image: "assets/Miami Heat.jpg", description: "Eastern Conference" },
  { title: "Phoenix Suns", image: "assets/Pheonix Suns.avif", description: "Western Conference" }
];

const Mainpage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center font-mono">
      {/* Title Section */}
      <div>
        <h1 className="text-9xl font-bold">HoopsHub</h1>
        <p className="text-base m-8 max-w-2xl mx-auto">
          Your ultimate hub for basketball stats, insights, and player performance. Dive into the game like never before!
        </p>
      </div>

      {/* Players Section */}
      <Carousel title="Players" items={players} />

      {/* Teams Section */}
      <Carousel title="Teams" items={teams} />
    </div>
  );
};

export default Mainpage;
