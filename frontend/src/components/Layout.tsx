import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
    return (
        <div>
            <Navbar />
            <main className="">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;