import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-white text-black border-b">
            <div className="container mx-auto flex justify-between items-center p-4">
                {/* Logo and name */}
                <Link to="/mainpage" className="font-bold text-2xl p-1 font-mono flex items-center">
                    <img className="w-12 mr-2 border-r pr-2" src="https://www.svgrepo.com/show/124037/basketball.svg" alt="Logo" />
                    HoopsHub
                </Link>
                <ul className="flex space-x-6 font-semibold font-mono text-lg items-center">
                    <li><Link to="/players" className="hover:underline">Players</Link></li>
                    <li><Link to="/teams" className="hover:underline">Teams</Link></li>
                    <li><Link to="/profile" className="hover:underline">Profile</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;