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
} from "lucide-react";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [profileOpen, setProfileOpen] = useState(false);
  const [logoDropdown, setLogoDropdown] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  const toggleProfile = () => setProfileOpen(!profileOpen);
  const toggleLogoDropdown = () => setLogoDropdown(!logoDropdown);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Apply theme class to document root
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <nav className="bg-[#016B61] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-3 px-5">
        {/* ====== Left Section (Logo) ====== */}
        <div className="relative flex items-center">
          <img
            src="https://i.ibb.co/VkM56Yv/688aecfb47d8cafab021cd4b-145-inventory-management-ai-agents.png"
            alt="logo"
            className="w-11 h-11 rounded-full border-2 border-white shadow-md object-cover cursor-pointer hover:scale-105 transition"
            onClick={toggleLogoDropdown}
          />

          {/* Mobile logo dropdown */}
          <AnimatePresence>
            {logoDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute left-0 mt-14 bg-white text-gray-800 rounded-lg shadow-lg w-44 p-3 md:hidden"
              >
                <NavLink
                  to="/"
                  className="flex items-center gap-2 py-2 hover:text-[#016B61]"
                  onClick={() => setLogoDropdown(false)}
                >
                  <Home size={18} /> Home
                </NavLink>
                <NavLink
                  to="/add-model"
                  className="flex items-center gap-2 py-2 hover:text-[#016B61]"
                  onClick={() => setLogoDropdown(false)}
                >
                  <PlusSquare size={18} /> Add Model
                </NavLink>
                <NavLink
                  to="/models"
                  className="flex items-center gap-2 py-2 hover:text-[#016B61]"
                  onClick={() => setLogoDropdown(false)}
                >
                  <Eye size={18} /> View Models
                </NavLink>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ====== Middle Section (Main Menu - Desktop only) ====== */}
        <div className="hidden md:flex items-center gap-10 text-white">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-[#70B2B2] " : "hover:text-[#9ECFD4]"
            }
          >
            <Home size={22} />
          </NavLink>
          <NavLink
            to="/add-model"
            className={({ isActive }) =>
              isActive ? "text-[#70B2B2] " : "hover:text-[#9ECFD4]"
            }
          >
            <PlusSquare size={22} />
          </NavLink>
          <NavLink
            to="/models"
            className={({ isActive }) =>
              isActive ? "text-[#70B2B2] " : "hover:text-[#9ECFD4]"
            }
          >
            <Eye size={22} />
          </NavLink>
        </div>

        {/* ====== Right Section (Profile/Login) ====== */}
        <div className="relative">
          {user ? (
            <>
              <img
                src={user.photoURL || "/default-profile.png"}
                alt="profile"
                className="w-11 h-11 rounded-full border-2 border-white cursor-pointer hover:scale-105 transition"
                onClick={toggleProfile}
              />
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-3 bg-white text-gray-800 rounded-lg shadow-lg w-60 p-3"
                  >
                    <div className="border-b pb-2 mb-2 text-sm">
                      <p className="font-semibold text-[#016B61]">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-gray-600 truncate">{user.email}</p>
                    </div>

                    <Link
                      to="/my-models"
                      className="flex items-center gap-2 py-2 hover:text-[#016B61]"
                      onClick={() => setProfileOpen(false)}
                    >
                      <User size={18} /> My Models
                    </Link>

                    <Link
                      to="/my-purchases"
                      className="flex items-center gap-2 py-2 hover:text-[#016B61]"
                      onClick={() => setProfileOpen(false)}
                    >
                      <ShoppingBag size={18} /> My Purchases
                    </Link>

                    {/* Theme Toggle */}
                    <button
                      onClick={toggleTheme}
                      className="flex items-center gap-2 py-2 hover:text-[#016B61]"
                    >
                      {theme === "light" ? (
                        <>
                          <Moon size={18} /> Dark Mode
                        </>
                      ) : (
                        <>
                          <Sun size={18} /> Light Mode
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        logOut();
                        setProfileOpen(false);
                      }}
                      className="flex items-center gap-2 py-2 text-red-600 hover:text-red-700"
                    >
                      <LogOut size={18} /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-white text-[#016B61] px-3 py-1 rounded font-semibold hover:bg-yellow-200"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
