import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "../components/ui/card";
import Carousel from "../components/Carousel";

const Profile = () => {
  interface User {
    uid: number;
    uname: string;
    email: string;
  }

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState<string | null>(null); // Track errors
  const [favourites, setFavourites] = useState<any[]>([]);
  var favouriteCount;

  useEffect(() => {
    
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get('http://localhost:3000/api/users/profile/', {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the Authorization header
          },
        });
        setUser(response.data);
      } catch (error) {
        setError("Error fetching user data");
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false); // Set loading to false once request is done
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`http://localhost:3000/api/favourites/${user?.uid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavourites(response.data); // Expected to be an array of player objects
      } catch (error) {
        console.error("Error fetching favourites:", error);
      }
      if (favourites.length==0){
        favouriteCount = 0;
      }
    };
    if (user) {
      fetchFavorites();
    }
  }, [user]);


  // Map fetched favourites to the format the Carousel expects
  const carouselItems = favourites.map((player: any) => ({
    title: player.pname,                // Player's name as title
    image: player.image || "",          // Player's image URL (adjust if needed)
    description: player.team || "",     // Team info or description (adjust if needed)
  }));
  console.log("favourites:", favourites);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);


  return (
    <div className="dark:bg-[#121212] min-h-screen bg-gray-100 p-5 m-0">
      <div className=" p-5">
        {loading ? (
          <p>Loading profile...</p>
        ) : error ? (
          <div className={`min-h-screen ${isDarkTheme ? "bg-gray-900 text-white" : " text-gray-900 font-mono"}`}>
      <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4">
        {/* Profile Card */}
        <h2 className="col-span-5 text-3xl font-bold mb-4">Profile Page</h2>
        <Card className="flex justify-around col-span-3 items-center gap-4 p-6 rounded-2xl shadow-md bg-white dark:bg-[#393939]">
          <div className="flex flex-col">
            <div className="relative w-40 h-40 flex items-center justify-center rounded-full border-4 border-gray-300 bg-gray-200 text-4xl font-bold text-gray-600">
              {user?.uname ? user.uname.slice(0, 2).toUpperCase() : "NA"}
            </div>
            <div className="flex justify-center items-center gap-1 text-xl font-semibold mt-2">
              {user?.uname}
            </div>
          </div>
          {/* Info Section */}
          <div className="text-xl flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <span className="font-semibold">Username:</span>
              <span>{user?.uname}</span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="font-semibold">Email:</span>
              <span>{user?.email}</span>
            </div>
          </div>

        </Card>

        {/* Favourites Section */}
        <Card className="dark:bg-gray-700 p-6 col-span-3 items-center rounded-2xl shadow-md bg-white">
          <CardContent>
            <h3 className="text-xl font-semibold mb-3 ">Favourites</h3>
            <p className="text-gray-500">You haven't added any favourites yet.</p>
            <Carousel title="" items={carouselItems} isLandingPage={true} />
          </CardContent>
        </Card>
      </div>
    </div>
        ) : (
          <div className={`min-h-screen ${isDarkTheme ? "bg-gray-900 text-white" : " text-gray-900 font-mono"}`}>
      <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4">
        {/* Profile Card */}
        <h2 className="col-span-5 text-3xl font-bold mb-4">Profile Page</h2>
        <Card className="flex justify-around col-span-3 items-center gap-4 p-6 rounded-2xl shadow-md bg-white dark:bg-[#393939]">
          <div className="flex flex-col">
            <div className="relative w-40 h-40 flex items-center justify-center rounded-full border-4 border-gray-300 bg-gray-200 text-4xl font-bold text-gray-600">
              {user?.uname ? user.uname.slice(0, 2).toUpperCase() : "NA"}
            </div>
            <div className="flex justify-center items-center gap-1 text-xl font-semibold mt-2">
              {user?.uname}
            </div>
          </div>
          {/* Info Section */}
          <div className="text-xl flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <span className="font-semibold">Username:</span>
              <span>{user?.uname}</span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="font-semibold">Email:</span>
              <span>{user?.email}</span>
            </div>
          </div>

        </Card>

        {/* Favourites Section */}
        <Card className="dark:bg-gray-700 p-6 col-span-3 items-center rounded-2xl shadow-md bg-white">
          <CardContent>
            <h3 className="text-xl font-semibold mb-3 ">Favourites</h3>
            {favouriteCount==0 ? 
              <p className="text-gray-500">You haven't added any favourites yet.</p> : 
              <Carousel title="" items={carouselItems} isLandingPage={true} />
            }
          </CardContent>
        </Card>
      </div>
    </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
