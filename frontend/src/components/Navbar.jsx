import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import homeIcon from "../assets/home.png";
import balloonIcon from "../assets/balloon.png";
import pricingIcon from "../assets/pricing.png";
import "./Navbar.css"; // CSS file ko import kar liya hai

const Navbar = () => {
  const [locationInput, setLocationInput] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const currentPath = useLocation().pathname;

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setIsLoggedIn(!!userId);
  }, [currentPath]);

  return (
    <nav className="navbar">
      {/* 1. LEFT SIDE: LOGO */}
      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="Travelia Logo" className="logo-img" />
        </Link>
      </div>

      {/* 2. CENTER: LINKS (TOP) + SEARCH BAR (BOTTOM) */}
      <div className="center-block">
        {/* Top Level Links */}
        <div className="menu-row">
          <Link to="/" className="link-item">
            <img src={homeIcon} alt="Home" className="icon" />
            <span>Home</span>
          </Link>

          <Link to="/pricing" className="link-item">
            <img src={pricingIcon} alt="Pricing" className="icon" />
            <span>Pricing</span>
          </Link>

          <Link to="/about" className="link-item">
            <img src={balloonIcon} alt="About" className="icon" />
            <span>About</span>
          </Link>
        </div>

        {/* Bottom Level Search Bar */}
        <div className="search-row">
          <input
            type="text"
            placeholder="Where to?"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            className="input input-location"
          />
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="input input-date"
          />
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="input input-date"
          />
          <input
            type="number"
            min="1"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="input input-guests"
          />
          <button className="search-submit-btn">
            🔍
          </button>
        </div>
      </div>

      {/* 3. RIGHT SIDE: ACTION BUTTONS */}
      <div className="right-block">
        
          <>
            <Link to="/Addlisting">
              <button className="host-btn">Become a host</button>
            </Link>
            <Link to="/login">
              <button className="action-btn">Login</button>
            </Link>
          </>
        
      </div>
    </nav>
  );
};

export default Navbar;