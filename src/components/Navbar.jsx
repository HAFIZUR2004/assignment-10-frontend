// Navbar.jsx
import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Load theme from localStorage
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      setDarkMode(false);
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  // DaisyUI theme toggle
  const handleTheme = (checked) => {
    if (checked) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    }
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link to="/">AI Model Inventory</Link>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-4 relative">
        <Link to="/">Home</Link>
        <Link to="/add-model">Add Model</Link>
        <Link to="/models">View Models</Link>

        {/* Theme Toggle */}
        <input
          type="checkbox"
          className="toggle ml-4"
          checked={darkMode}
          onChange={(e) => handleTheme(e.target.checked)}
        />

        {user ? (
          <div className="relative">
            <img
              src={user.photoURL || "/default-profile.png"}
              alt="profile"
              className="w-10 h-10 rounded-full cursor-pointer ml-4"
              onClick={toggleDropdown}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 text-black dark:text-white rounded shadow-lg p-4 w-48 z-50">
                <p className="font-bold">{user.displayName}</p>
                <p className="text-sm mb-2">{user.email}</p>
                <Link
                  to="/my-purchases"
                  className="block py-1 hover:text-blue-600"
                  onClick={() => setDropdownOpen(false)}
                >
                  My Purchases
                </Link>
                <Link
                  to="/my-models"
                  className="block py-1 hover:text-blue-600"
                  onClick={() => setDropdownOpen(false)}
                >
                  My Models
                </Link>
                <button
                  onClick={() => {
                    logOut();
                    setDropdownOpen(false);
                  }}
                  className="text-red-500 mt-2 w-full text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-white text-blue-600 px-3 py-1 rounded ml-4"
          >
            Login
          </Link>
        )}
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center gap-2">
        <input
          type="checkbox"
          className="toggle"
          checked={darkMode}
          onChange={(e) => handleTheme(e.target.checked)}
        />
        <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
