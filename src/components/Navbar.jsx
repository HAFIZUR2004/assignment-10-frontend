import React, { useState, useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  PlusSquare,
  Eye,
  LogOut,
  User,
  ShoppingBag,
  Moon,
  Sun,
  LogIn,
} from "lucide-react";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav className="shadow-lg sticky top-0 z-50" style={{ backgroundColor: "#016B61" }}>
      <div className="max-w-7xl mx-auto flex justify-between items-center px-5 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover:scale-105 transition-transform duration-300">
          <img
            src="https://i.ibb.co/VkM56Yv/688aecfb47d8cafab021cd4b-145-inventory-management-ai-agents.png"
            alt="logo"
            className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-[#70B2B2] shadow-md"
          />
          <span className="text-white font-bold text-xl md:text-2xl">BrainBuzzer</span>
        </Link>

        {/* Menu */}
        <div className="hidden md:flex items-center gap-8 text-white">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-2 text-[#70B2B2] font-semibold"
                : "flex items-center gap-2 hover:text-[#70B2B2] transition-colors"
            }
          >
            <Home size={22} /> Home
          </NavLink>
          <NavLink
            to="/add-model"
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-2 text-[#70B2B2] font-semibold"
                : "flex items-center gap-2 hover:text-[#70B2B2] transition-colors"
            }
          >
            <PlusSquare size={22} /> Add Model
          </NavLink>
          <NavLink
            to="/models"
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-2 text-[#70B2B2] font-semibold"
                : "flex items-center gap-2 hover:text-[#70B2B2] transition-colors"
            }
          >
            <Eye size={22} /> View Models
          </NavLink>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-[#70B2B2] hover:bg-[#016B61] text-white transition-colors"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {!user ? (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 bg-[#70B2B2] hover:bg-[#016B61] text-white rounded-lg font-semibold transition-colors"
              >
                <LogIn size={18} className="animate-bounce" />
                <span className="flex items-center">Login</span>
              </Link>
            </motion.div>
          ) : (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-12 md:w-14 rounded-full border-2 border-[#70B2B2]">
                  <img src={user.photoURL || "/default-profile.png"} alt="profile" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow-lg rounded-box w-52 mt-3 bg-[#70B2B2] text-white"
              >
                <li>
                  <p className="font-semibold">{user.displayName || "User"}</p>
                </li>
                <li>
                  <p className="text-sm truncate">{user.email}</p>
                </li>
                <li>
                  <Link to="/my-models" className="justify-between hover:bg-[#016B61] rounded">
                    My Models <User size={16} />
                  </Link>
                </li>
                <li>
                  <Link to="/my-purchases" className="justify-between hover:bg-[#016B61] rounded">
                    My Purchases <ShoppingBag size={16} />
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => logOut()}
                    className="text-red-600 justify-between hover:bg-[#016B61] rounded"
                  >
                    Logout <LogOut size={16} />
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
// 111/