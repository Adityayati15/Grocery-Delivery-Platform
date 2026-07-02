import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";


import Home from "@/pages/Home.jsx";
import About from "@/pages/About";

function AppRoutes() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Route>            
        </Routes>
    );
}

export default AppRoutes;