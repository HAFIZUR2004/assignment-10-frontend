import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      {/* Logo */}
      <div className="text-xl font-bold">
        <Link to="/">AI Model Inventory</Link>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-4 relative">
        <Link to="/">Home</Link>
        <Link to="/add-model">Add Model</Link>
        <Link to="/models">View Models</Link>

        {user ? (
          <div className="relative">
            <img
              src={user.photoURL || "/default-profile.png"}
              alt="profile"
              className="w-10 h-10 rounded-full cursor-pointer ml-4"
              onClick={toggleDropdown}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg p-4 w-48 z-50">
                <p className="font-bold">{user.displayName}</p>
                <p className="text-sm mb-2">{user.email}</p>
                <Link to="/my-purchases" className="block py-1 hover:text-blue-600" onClick={() => setDropdownOpen(false)}>My Purchases</Link>
                <Link to="/my-models" className="block py-1 hover:text-blue-600" onClick={() => setDropdownOpen(false)}>My Models</Link>
                <button
                  onClick={() => { logOut(); setDropdownOpen(false); }}
                  className="text-red-500 mt-2 w-full text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="bg-white text-blue-600 px-3 py-1 rounded ml-4">Login</Link>
        )}
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-blue-600 text-white flex flex-col gap-4 p-4 md:hidden z-40">
          <Link to="/" onClick={toggleMobileMenu}>Home</Link>
          <Link to="/add-model" onClick={toggleMobileMenu}>Add Model</Link>
          <Link to="/models" onClick={toggleMobileMenu}>View Models</Link>

          {user ? (
            <>
              <div className="flex items-center gap-2 mt-2">
                <img src={user.photoURL || "/default-profile.png"} alt="profile" className="w-8 h-8 rounded-full" />
                <div>
                  <p className="font-bold">{user.displayName}</p>
                  <p className="text-sm">{user.email}</p>
                </div>
              </div>
              <Link to="/my-purchases" className="py-1" onClick={toggleMobileMenu}>My Purchases</Link>
              <Link to="/my-models" className="py-1" onClick={toggleMobileMenu}>My Models</Link>
              <button
                onClick={() => { logOut(); toggleMobileMenu(); }}
                className="text-red-500 mt-2 w-full text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-white text-blue-600 px-3 py-1 rounded" onClick={toggleMobileMenu}>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
