import { useEffect, useState } from "react";
import axios from "axios";

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

  return (
    <div className="dark:bg-[#121212] min-h-screen p-5 m-0">
      <h2 className="text-3xl font-bold">Profile Page</h2>
      <div className="bg-gray-800 text-white p-5 rounded-lg shadow-md">
        {loading ? (
          <p>Loading profile...</p>
        ) : error ? (
          <p>{error}</p>
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
