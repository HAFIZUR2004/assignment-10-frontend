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
  const [profileOpen, setProfileOpen] = useState(false);
  const [logoDropdown, setLogoDropdown] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const toggleProfile = () => setProfileOpen(!profileOpen);
  const toggleLogoDropdown = () => setLogoDropdown(!logoDropdown);

  // DaisyUI theme toggle
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav className="bg-base-100 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-5 py-3">
        {/* ===== Left Section: Logo ===== */}
        <div className="relative flex items-center gap-2">
          <Link
            to="/"
            className="flex items-center cursor-pointer hover:scale-105 transition-transform duration-300"
          >
            <img
              src="https://i.ibb.co/VkM56Yv/688aecfb47d8cafab021cd4b-145-inventory-management-ai-agents.png"
              alt="logo"
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-base-content shadow-md"
            />
          </Link>

          {/* Mobile logo dropdown */}
          <AnimatePresence>
            {logoDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute left-0 mt-14 bg-base-200 text-base-content rounded-lg shadow-lg w-48 p-3 md:hidden"
              >
                <NavLink
                  to="/"
                  className="flex items-center gap-2 py-2 px-2 rounded hover:bg-base-300"
                  onClick={() => setLogoDropdown(false)}
                >
                  <Home size={18} /> Home
                </NavLink>
                <NavLink
                  to="/add-model"
                  className="flex items-center gap-2 py-2 px-2 rounded hover:bg-base-300"
                  onClick={() => setLogoDropdown(false)}
                >
                  <PlusSquare size={18} /> Add Model
                </NavLink>
                <NavLink
                  to="/models"
                  className="flex items-center gap-2 py-2 px-2 rounded hover:bg-base-300"
                  onClick={() => setLogoDropdown(false)}
                >
                  <Eye size={18} /> View Models
                </NavLink>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ===== Middle Section: Desktop Menu ===== */}
        <div className="hidden md:flex items-center gap-10 text-base-content">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-primary scale-105 transition-transform duration-200"
                : "hover:text-primary hover:scale-105 transition-transform duration-200"
            }
          >
            <Home size={22} />
          </NavLink>
          <NavLink
            to="/add-model"
            className={({ isActive }) =>
              isActive
                ? "text-primary scale-105 transition-transform duration-200"
                : "hover:text-primary hover:scale-105 transition-transform duration-200"
            }
          >
            <PlusSquare size={22} />
          </NavLink>
          <NavLink
            to="/models"
            className={({ isActive }) =>
              isActive
                ? "text-primary scale-105 transition-transform duration-200"
                : "hover:text-primary hover:scale-105 transition-transform duration-200"
            }
          >
            <Eye size={22} />
          </NavLink>
        </div>

        {/* ===== Right Section: Profile/Login + Theme Toggle ===== */}
        <div className="flex items-center gap-2">
          {/* Theme toggle button */}
          <motion.button
            onClick={toggleTheme}
            className="btn btn-square btn-ghost"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </motion.button>

          {!user ? (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/login"
                className="btn btn-primary flex items-center gap-2 px-4 py-2 font-semibold"
              >
                <LogIn size={18} className="animate-bounce" />
                Login
              </Link>
            </motion.div>
          ) : (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-12 md:w-14 rounded-full">
                  <img src={user.photoURL || "/default-profile.png"} alt="profile" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow-lg rounded-box w-52 bg-base-200 mt-3"
              >
                <li>
                  <p className="font-semibold">{user.displayName || "User"}</p>
                </li>
                <li>
                  <p className="text-sm text-gray-500 truncate">{user.email}</p>
                </li>
                <li>
                  <Link to="/my-models" className="justify-between">
                    My Models <User size={16} />
                  </Link>
                </li>
                <li>
                  <Link to="/my-purchases" className="justify-between">
                    My Purchases <ShoppingBag size={16} />
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => logOut()}
                    className="text-red-600 justify-between"
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
