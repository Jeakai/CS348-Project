import React from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../components/Carousel";



const display = [
  { pid: 111, title: "LeBron James", image: "assets/Lebron.jpg", description: "Los Angeles Lakers" },
  { pid: 112, title: "Stephen Curry", image: "assets/Steph.avif", description: "Golden State Warriors" },
  { pid: 113, title: "Kevin Durant", image: "assets/Kevin.jpg", description: "Phoenix Suns" },
  { pid: 114, title: "Giannis Antetokounmpo", image: "assets/Giannis.jpg", description: "Milwaukee Bucks" },
  { pid: 115, title: "Luka Dončić", image: "assets/Luka.jpg", description: "Dallas Mavericks" }
];

const Landing = () => {
  const navigate = useNavigate(); 

  const handleGetStartedClick = () => {
    navigate("/signup");
  };

return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center font-mono text-black">
      {/* Title Section */}
      <div>
        <h1 className="text-9xl font-bold text-black drop-shadow-lg">HoopsHub</h1>
        <p className="text-base m-8 max-w-2xl mx-auto text-black">
          Your ultimate hub for basketball stats, insights, and player performance. Dive into the game like never before!
        </p>
      </div>

      {/* Get Started Button */}
      <button 
        onClick={handleGetStartedClick} 
        className="px-6 py-3 bg-yellow-500 text-gray-900 font-bold rounded-lg shadow-lg hover:bg-yellow-400 transition">
        Get Started
      </button>

      {/* Display Section */}
      <Carousel uid={0} title="" items={display} isLandingPage={true} />
    </div>
  );
};

export default Landing;
