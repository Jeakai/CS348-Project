import axios from "axios";
import { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import PlayerModal from "../components/PlayerModal";
import { Card, CardContent } from "../components/ui/card";

interface ProfileProps {
  user: { uid: number | string; [key: string]: any };
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  console.log("Profile user:", user);
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [player, setPlayer] = useState({
    pid: 0,
    title: "",
    image: "",
    description: "",
  });
  const [favourites, setFavourites] = useState<any[]>([]);
  // Remove favouriteCount variable; use favourites.length directly
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavourites = async () => {
      if (!user?.uid) {
        console.error("User ID is missing!");
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        console.log(`Fetching favourites for UID: ${user.uid}`);
        const response = await axios.get(`http://localhost:3000/api/favourites/${user.uid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavourites(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching favourites:", error);
        setError("Failed to fetch favourites");
      } finally {
        setLoading(false);
      }
    };
  
    if (user) {
      fetchFavourites();
    }
  }, [user]);
  
  const handleFavouriteToggle = (pid: number, liked: boolean) => {
    console.log(`Toggling ${pid}, liked: ${liked}`);
    if (!liked) {
      // setFavourites(prevFavourites => {
      //   const newFavs = prevFavourites.filter(fav => fav.player_id !== pid);
      //   console.log('New favorites:', newFavs);
      //   return newFavs;
      // });
      
      setPlayers(prevPlayers => {
        const newPlayers = prevPlayers
          // .filter(player => player.pid !== pid)
          .map(p => ({ ...p, isFavourited: true }));
        console.log('New players:', newPlayers);
        return newPlayers;
      });
    }
  };

  // Transform favourites for Carousel
  // const carouselItems = favourites.map((player: any) => ({
  //   pid: player.pid,
  //   title: player.pname,
  //   image: player.image || "",
  //   description: player.team || "",
  //   isFavourited: favourites.some(fav => fav.pid === player.pid),
  // }));

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
  const [carouselItems, setPlayers] = useState<CarouselPlayer[]>([]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    
    const transformed = favourites.map((player: any) => {
      const imageName = `${player.player_name.toLowerCase().replace(/\s+/g, '-')}.jpg`;
      const imagePath = `assets/${imageName}`;
  
      return {
        pid: player.player_id,
        title: player.player_name,
        image: imagePath,
        description: player.team_name || "",
        favCount: player.favorites_count || 0,
        isFavourited: true, // All items in favorites are favorited by definition
        age: currentYear - (player.birth_year || currentYear),
        height: player.height_cm || 0,
        weight: player.weight_kg || 0,
        points: player.points || 1000,
      };
    });
    
    setPlayers(transformed);
  }, [favourites]);

  // For card click
  const onClickPlayer = (p: { pid: number; title: string; image: string; description: string }) => {
    console.log("Player clicked!", p);
    setShowPlayerModal(true);
    setPlayer(p);
  };

  return (
    <>
      <PlayerModal
        show={showPlayerModal}
        handleClose={() => setShowPlayerModal(false)}
        player={player}
        setPlayer={setPlayer}
        uid={user && user.uid ? Number(user.uid) : 0}
        players={carouselItems}
        setPlayers={setPlayers}
      />
      <div className="min-h-screen bg-gray-100 p-5 m-0">
        <div className="p-5">
          {loading ? (
            <p>Loading profile...</p>
          ) : (
            <div className="min-h-screen text-gray-900 font-mono">
              <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4">
                {/* Profile Header */}
                <h2 className="col-span-5 text-3xl font-bold mb-4">Profile Page</h2>
                
                {/* User Profile Card */}
                <Card className="flex justify-around col-span-3 items-center gap-4 p-6 rounded-2xl shadow-md bg-white">
                  <div className="flex flex-col">
                    <div className="relative w-40 h-40 flex items-center justify-center rounded-full border-4 border-gray-300 bg-gray-200 text-4xl font-bold text-gray-600">
                      {user?.uname ? user.uname.slice(0, 2).toUpperCase() : "NA"}
                    </div>
                    <div className="flex justify-center items-center gap-1 text-xl font-semibold mt-2">
                      {user?.uname}
                    </div>
                  </div>
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
  
                {/* Favourites Section - Single Carousel Instance */}
                <Card className="p-6 col-span-3 items-center rounded-2xl shadow-md bg-white">
                  <CardContent>
                    <h3 className="text-xl font-semibold mb-3">Favourites</h3>
                    {error ? (
                      <p className="text-red-500">{error}</p>
                    ) : favourites.length === 0 ? (
                      <p className="text-gray-500">You haven't added any favourites yet.</p>
                    ) : (
                      <Carousel
                        title=""
                        uid={user && user.uid ? Number(user.uid) : 0}
                        items={carouselItems}
                        onClick={onClickPlayer}
                        onFavouriteToggle={handleFavouriteToggle}
                      />
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
