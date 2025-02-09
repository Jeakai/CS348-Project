import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "../components/ui/switch";
import { CameraIcon, PencilIcon } from "lucide-react";

const Profile = () => {
  interface User {
    uname: string;
    email: string;
  }

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState<string | null>(null); // Track errors

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

  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  return (
    <div className="dark:bg-[#121212] min-h-screen bg-gray-100 p-5 m-0">
      <div className=" p-5">
        {loading ? (
          <p>Loading profile...</p>
        ) : error ? (
          <div className={`min-h-screen ${isDarkTheme ? "bg-gray-900 text-white" : " text-gray-900 font-mono"}`}>
      <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6">
        {/* Profile Card */}
        <h2 className="text-3xl font-bold">Profile Page</h2>
        <Card className="flex justify-around col-span-3 items-center gap-6 p-10 rounded-2xl shadow-md bg-white dark:bg-[#393939] h-72">
          <div className="flex flex-col">
            <div className="relative w-40 h-40">
              <img
                src="https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcRKsa5AE_yo9xCSR9pqKZz4g90rdwYnwxW9imCgS2lUEqhDJTboM7VwP-SwlepVmJoulkzl0SIjjzl6TnU"
                alt="Profile"
                className="w-full h-full rounded-full border-4 border-gray-300 object-cover"
              />
              <button className="absolute bottom-2 right-2 bg-gray-700 p-1 rounded-full">
                {/*change image*/}
                <CameraIcon className="text-white w-5 h-5" />
              </button>
            </div>
            <div className="">
              <div className="flex justify-center items-center gap-2 text-xl font-semibold">
                Seann
                <button className="text-gray-400">
                  <PencilIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="text-gray-400">Since 7 Feb 2025</div>
          </div>
          {/*info*/}
          <div className="flex-col text-2xl w-3/6">
            <div className="flex justify-between m-5">
              <div className="font-semibold">Username: </div>
              <div>Seann</div>
            </div>
            <div className="flex justify-between">
              <div className="font-semibold">Email: </div>
              <div>seann@gmail.com</div>
            </div>
          </div>
        </Card>

        {/* Favourites Section */}
        <Card className="dark:bg-gray-700 col-span-2 p-6 rounded-2xl shadow-md bg-white">
          <CardContent>
            <h3 className="text-xl font-semibold mb-3 ">Favourites</h3>
            <p className="text-gray-500">You haven't added any favourites yet.</p>
          </CardContent>
        </Card>

        {/* Settings Section */}
        <Card className="col-span-1 p-6 rounded-2xl shadow-md bg-white dark:bg-gray-800">
          <CardContent>
            <h3 className="text-xl font-semibold mb-3">Settings</h3>
            <div className="flex items-center justify-between mt-3">
              <span>Theme</span>
              <Switch checked={isDarkTheme} onCheckedChange={setIsDarkTheme} />
            </div>
            <div className="flex items-center justify-between mt-3">
              <span>Change Password</span>
              <Button variant="outline">Change</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
          
        ) : (
          <>
            <p><strong>Username:</strong> {user?.uname}</p>
            <p><strong>Email:</strong> {user?.email}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
