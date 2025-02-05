import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Players from "./pages/Players";  // Make sure this is imported
import Profile from "./pages/Profile";  // Make sure this is imported
import Mainpage from "./pages/Mainpage";  // Make sure this is imported
import Signup from "./pages/Signup";
import Teams from "./pages/Teams";  // If you have a "Teams" page, make sure it's imported
import './app.css'; 


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Mainpage />} />  {/* Default route */}
          <Route path="mainpage" element={<Mainpage />} />
          <Route path="players" element={<Players />} />
          <Route path="profile" element={<Profile />} />
          <Route path="signup" element={<Signup />} />
          <Route path="teams" element={<Teams />} /> {/* If you have a Teams page */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
