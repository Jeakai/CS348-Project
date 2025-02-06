import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Players from "./pages/Players";  // Make sure this is imported
import Profile from "./pages/Profile";  // Make sure this is imported
import Mainpage from "./pages/Mainpage";  // Make sure this is imported
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Teams from "./pages/Teams";  // If you have a "Teams" page, make sure it's imported
import './app.css'; 

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
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          {/* Protected routes - accessible only when authenticated */}
          <Route path="mainpage" element={<ProtectedRoute element={<Mainpage />} />} />
          <Route path="players" element={<ProtectedRoute element={<Players />} />} />
          <Route path="profile" element={<ProtectedRoute element={<Profile />} />} />
          <Route path="teams" element={<ProtectedRoute element={<Teams />} />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
