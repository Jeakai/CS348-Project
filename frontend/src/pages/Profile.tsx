import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "../components/ui/card";
import Carousel from "../components/Carousel";

interface ProfileProps {
  user: { uid: number | string; [key: string]: any };
}

const players = [
  { pid: 111, title: "LeBron James", position: "Forward", description: "Los Angeles Lakers", age: 38, image: "assets/Lebron.jpg" },
  { pid: 112, title: "Stephen Curry", position: "Guard", description: "Golden State Warriors", age: 35, image: "assets/Steph.avif" },
  { pid: 113, title: "Kevin Durant", position: "Forward", description: "Phoenix Suns", age: 34, image: "assets/Kevin.jpg" },
  { pid: 114, title: "Giannis Antetokounmpo", position: "Forward", description: "Milwaukee Bucks", age: 28, image: "assets/Giannis.jpg" },
  { pid: 115, title: "Victor Wembanyama", position: "Center", description: "San Antonio Spurs", age: 19, image: "assets/wemby.jpg" },
  { pid: 116, title: "Luka Dončić", position: "Guard", description: "Dallas Mavericks", age: 24, image: "assets/Luka.jpg" },
  { pid: 117, title: "Joel Embiid", position: "Center", description: "Philadelphia 76ers", age: 29, image: "assets/Embiid.jpg" },
  { pid: 118, title: "Nikola Jokić", position: "Center", description: "Denver Nuggets", age: 28, image: "assets/Jokic.avif" },
  { pid: 119, title: "Jayson Tatum", position: "Forward", description: "Boston Celtics", age: 25, image: "assets/Tatum.jpg" },
  { pid: 120, title: "Devin Booker", position: "Guard", description: "Phoenix Suns", age: 26, image: "assets/Booker.jpg" },
  { pid: 121, title: "Ja Morant", position: "Guard", description: "Memphis Grizzlies", age: 23, image: "assets/Morant.jpg" },
  { pid: 122, title: "Jimmy Butler", position: "Forward", description: "Miami Heat", age: 33, image: "assets/Butler.avif" }
];

const carouselPlayers = players.map((player) => ({
  pid: player.pid,
  title: player.title,
  image: player.image,
  description: player.description,
}));

const teams = [
  { tid: 101, title: "Los Angeles Lakers", abbr: "LAL", image: "assets/LA Lakers.jpg", description: "Western Conference" },
  { tid: 102, title: "Golden State Warriors", abbr: "GSW", image: "assets/GSW.png", description: "Western Conference" },
  { tid: 103, title: "Boston Celtics", abbr: "BOS", image: "assets/Boston celtics.jpg", description: "Eastern Conference" },
  { tid: 104, title: "Miami Heat", abbr: "MIA", image: "assets/Miami Heat.jpg", description: "Eastern Conference" },
  { tid: 105, title: "Phoenix Suns", abbr: "PHX", image: "assets/Pheonix Suns.avif", description: "Western Conference" },
  { tid: 106, title: "Milwaukee Bucks", abbr: "MIL", image: "assets/Bucks.png", description: "Eastern Conference" },
  { tid: 107, title: "Philadelphia 76ers", abbr: "PHI", image: "assets/76ers.jpg", description: "Eastern Conference" },
  { tid: 108, title: "Denver Nuggets", abbr: "DEN", image: "assets/Nuggets.jpg", description: "Western Conference" },
  { tid: 109, title: "Memphis Grizzlies", abbr:"MEM", image: "assets/Grizzlies.jpg", description: "Western Conference" },
  { tid: 110, title: "Dallas Mavericks", abbr:"DAL", image: "assets/Mavericks.jpg", description: "Western Conference" },
  { tid: 111, title: "San Antonio Spurs", abbr:"SAS", image: "assets/Spurs.jpg", description: "Western Conference" },
  { tid: 112, title: "Houston Rockets", abbr:"HOU", image:"assets/Houston.png", description: "Western Conference" }
];

const carouselTeams = teams.map((t) => ({
  pid: t.tid,             
  title: t.title,
  image: t.image,
  description: t.description,
}));

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
    const fetchFavorites = async () => {
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
      fetchFavorites();
    }
  }, [user]);
  
  

  // Transform favourites for Carousel
  const carouselItems = favourites.map((player: any) => ({
    pid: player.pid,
    title: player.pname,
    image: player.image || "",
    description: player.team || "",
    isFavorited: favourites.some(fav => fav.pid === player.pid),
  }));

  return (
    <div className="min-h-screen bg-gray-100 p-5 m-0">
      <div className="p-5">
        {loading ? (
          <p>Loading profile...</p>
        ) : error ? (
          <div className="min-h-screen text-gray-900 font-mono">
            <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4">
              {/* Profile Card */}
              <h2 className="col-span-5 text-3xl font-bold mb-4">Profile Page</h2>
              {/* Your profile card code */}
              {/* Favourites Section */}
              <Card className="p-6 col-span-3 items-center rounded-2xl shadow-md bg-white">
                <CardContent>
                  <h3 className="text-xl font-semibold mb-3">Favourites</h3>
                  {favourites.length === 0 ? (
                    <p className="text-gray-500">You haven't added any favourites yet.</p>
                  ) : (
                    <Carousel
                      title="Favourites"
                      uid={user && user.uid ? Number(user.uid) : 0}
                      items={carouselItems}
                      isLandingPage={true}
                    />
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className={"min-h-screen text-gray-900 font-mono"}>
            <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4">
              {/* Profile Card */}
              <h2 className="col-span-5 text-3xl font-bold mb-4">Profile Page</h2>
              <Card className="flex justify-around col-span-3 items-center gap-4 p-6 rounded-2xl shadow-md bg-white">
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
              <Card className="p-6 col-span-3 items-center rounded-2xl shadow-md bg-white">
                <CardContent>
                  <h3 className="text-xl font-semibold mb-3">Favourites</h3>
                  {favourites.length === 0 ? (
                    <p className="text-gray-500">You haven't added any favourites yet.</p>
                  ) : (
                    <Carousel
                      title=""
                      uid={user && user.uid ? Number(user.uid) : 0}
                      items={carouselItems}
                      isLandingPage={true}
                    />
                  )}
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
