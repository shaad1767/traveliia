// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// ... baaki imports waise hi rehne dein ...
import logo from "../assets/logo.png";
import homeIcon from "../assets/home.png";
import balloonIcon from "../assets/balloon.png";
import pricingIcon from "../assets/pricing.png";
import "./Navbarhome.css";
import Pricing from "./Pricing";  
import Services from "./services";

// Ye line add karein
const BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000' 
  : 'https://traveliia.onrender.com';

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);

  // Search states
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleSearch = async () => {
    if (!location.trim()) {
      alert("Please enter a city");
      return;
    }

    const queryObj = { city: location.trim(), guests: Number(guests) || 1 };
    if (checkIn) queryObj.checkIn = checkIn;
    if (checkOut) queryObj.checkOut = checkOut;

    const query = new URLSearchParams(queryObj).toString();

    try {
      // Yahan BASE_URL use kiya hai
      const res = await fetch(`${BASE_URL}/api/hotels/search?${query}`);
      if (!res.ok) {
        throw new Error("Failed to fetch hotels");
      }
      const data = await res.json();

      console.log("Hotels fetched:", data);

      navigate(`/searchHotel?${query}`, { state: { hotels: data } });
    } catch (err) {
      console.error("Search error:", err);
      alert("Error fetching hotels. Check console.");
    }
  };

  return (
    // ... aapka pura return block same rahega ...
    <>
      <nav className="navbar">
        {/* Logo */}
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Travelia Logo" className="logo-image" />
          </Link>
        </div>

        {/* Hamburger */}
        <div className="hamburger" onClick={() => setOpen(!open)}>
          ☰
        </div>

        {/* Menu */}
        <div className="menu">
          <Link to="/Home" className="home-link">
            <img src={homeIcon} alt="Home" className="home-icon" />
            <span>Home</span>
          </Link>


        <div className="pricing-link" onClick={() => setPriceOpen(true)}>
            <img src={pricingIcon} alt="pricing" className="pricing-icon" />
            <span>Pricing</span>
          </div>

          <Link to="/services" className="balloon-link">
            <img src={balloonIcon} alt="Balloon" className="balloon-icon" />
            <span>About</span>
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
            onChange={(e) => setGuests(Number(e.target.value))}
            className="search-input guests"
          />

          <button className="search-button" onClick={handleSearch}>Search</button>
        </div>
      </nav>

      {/* Profile Sidebar */}
      {open && (
        <div className="sidebar">
          <div className="close-btn" onClick={() => setOpen(false)}>✕</div>
          <h5 className="menu">Traveliia</h5>
          <p onClick={() => navigate("/profile")}>👤 Profile</p>
          <hr />
          <p onClick={() => navigate("/MyBooking")}>📖 My Bookings</p>
          <hr />
          {/* <p onClick={() => navigate("/Addlisting")}>🏠 AddListing</p>
          <hr />
          <p onClick={() => navigate("/Mylistings")}>📖 My Listings</p>
          <hr /> */}
          <p onClick={() => navigate("/help")}>❓ Help</p>
          <hr />
          <p className="logout" onClick={handleLogout}>🚪 Logout</p>
        </div>
      )}

      {/* Price Sidebar */}
      {priceOpen && <Pricing closeSidebar={() => setPriceOpen(false)} />}
    </>
  );
};

export default Navbar;