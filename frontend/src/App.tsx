import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from 'react';
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Players from "./pages/Players";  
import Profile from "./pages/Profile";  
import Mainpage from "./pages/Mainpage"; 
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Teams from "./pages/Teams"; 
import TeamDetails from "./pages/TeamDetails";

const isAuthenticated = (): boolean => {
  return localStorage.getItem("authToken") !== null;
};

interface ProtectedRouteProps {
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  return isAuthenticated() ? <>{element}</> : <Navigate to="/" />;
};

const App = () => {
  // Store token in state so that changes trigger re-fetch
  const [token, setToken] = useState<string | null>(localStorage.getItem("authToken"));
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // When token changes, re-fetch the user
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get('http://localhost:3000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error: any) {
        // Check if error indicates an invalid/expired token
        if (error.response && error.response.data && error.response.data.error === 'Invalid token') {
          // Remove the expired token before redirecting
          localStorage.removeItem("authToken");
          // Redirect to the landing page
          window.location.href = '/'; // Ensure the landing page does not trigger a re-fetch that redirects again
        } else {
          setError("Error fetching user data");
          console.error("Error fetching user:", error);
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchUser();
  }, [token]);
  
  

  // Pass a handleLogin function to Login page so that it updates token state.
  const handleLogin = (newToken: string) => {
    localStorage.setItem("authToken", newToken);
    setToken(newToken);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login handleLogin={handleLogin} />} />
          <Route path="mainpage" element={<ProtectedRoute element={<Mainpage user={user} />} />} />
          <Route path="players" element={<ProtectedRoute element={<Players user={user} />} />} />
          <Route path="profile" element={<ProtectedRoute element={<Profile user={user} />} />} />
          <Route path="teams" element={<ProtectedRoute element={<Teams user={user} />} />} />
          <Route path="teams/:abbr" element={<ProtectedRoute element={<TeamDetails />} />} /> 
        </Route>
      </Routes>
    </Router>
  );
};

export default App;



