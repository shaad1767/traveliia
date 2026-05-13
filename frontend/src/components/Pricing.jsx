import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Pricing.css";

const Pricing = ({ closeSidebar }) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState(5000);
  const navigate = useNavigate();

 const handleSearch = () => {
  let url = "/priceMeterhotel?";

  if (minPrice) {
    url += `min=${minPrice}&`;
  }

  if (maxPrice) {
    url += `max=${maxPrice}`;
  }

  navigate(url);
  closeSidebar();
};

  return (
    <div className="pricing-overlay">
      <div className="pricing-sidebar">
        <div className="close-btn" onClick={closeSidebar}>✕</div>

        <h2>Price Filter</h2>

        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        {/* PRICE METER */}
        <input
          type="range"
          min="1000"
          max="100000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="price-slider"
        />

        <p>Selected Price: ₹{maxPrice}</p>

        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default Pricing;