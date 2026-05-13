import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import homeIcon from "../assets/home.png";
import balloonIcon from "../assets/balloon.png";
import pricingIcon from "../assets/pricing.png";
import Signup from "../pages/Signup";

import "./Navbar.css";

const Navbar = () => {
    const [showSignup, setShowSignup] = useState(false);
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  return (
    <>
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <Link to="/">
          <img src={logo} 
          alt="Travelia Logo" 
          className="logo-image" />
        </Link>
      </div>
      {/* home */}
      <div className="menu">
          <Link to="/" className="home-link">
             <img src={homeIcon} alt="Home" className="home-icon" />
             <span>Home</span>
          </Link>

          {/* ballon */}
          <Link to="/" className="balloon-link">
             <img src={balloonIcon} alt="Balloon" className="balloon-icon" />
             <span>Balloon</span>
          </Link>

           {/* pricing */}
          <Link to="/" className="pricing-link">
             <img src={pricingIcon} alt="pricing" className="pricing-icon" />
             <span>Pricing</span>
          </Link>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Where are you going?"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="search-input location"
        />
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="search-input date"
        />
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="search-input date"
        />
        <input
          type="number"
          min="1"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className="search-input guests"
        />
        <button className="search-button">Search</button>
      </div>

      {/* Right Signup */}
     <div className="navbar-signup">
   <Link to="/login">
      <button>login</button>
   </Link>
</div>
    </nav>
    </>
  );
};

export default Navbar;
