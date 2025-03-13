import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />  {/* Default route */}
          {/* <Route path="mainpage" element={<Mainpage />} /> */}
          {/* <Route path="players" element={<Players />} /> */}
          {/* <Route path="profile" element={<Profile />} /> */}
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          {/* Protected routes - accessible only when authenticated */}
          <Route path="mainpage" element={<ProtectedRoute element={<Mainpage />} />} />
          <Route path="players" element={<ProtectedRoute element={<Players />} />} />
          <Route path="profile" element={<ProtectedRoute element={<Profile />} />} />
          <Route path="teams" element={<ProtectedRoute element={<Teams />} />} />
          <Route path="teams/:abbr" element={<ProtectedRoute element={<TeamDetails />} />} /> 
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
