// src/pages/HotelsList.jsx
import React, { useEffect, useState  } from "react";
import axios from "axios";
import "./HotelsList.css";
import { useNavigate } from "react-router-dom";

const BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000' 
  : 'https://traveliia.onrender.com';

const HotelsList = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/hotels`);
        setHotels(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch hotels");
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const handlePropertyClick = (hotelId) => {
    // Check karein aapne Login page par data kis naam se save kiya hai
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user"); 

    // Agar dono me se koi ek bhi cheez mil jaye
    if (token || user) {
      navigate(`/PropertyDetails/${hotelId}`);
    } else {
      alert("Please login first to view property details!");
      navigate("/login");
    }
  };

  if (loading) return <p>Loading hotels...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="hotels-list">
      <div className="hotels-container">
        {hotels.map((hotel) => (
          <div 
            key={hotel._id} 
            className="hotel-card"
            onClick={() => handlePropertyClick(hotel._id)}
          >
            <img
               src={hotel.images?.[0]}
               alt={hotel.name}
               onError={(e) => {
                 e.target.src = "https://via.placeholder.com/300";
               }}
             />
            
            <div className="hotel-card-content">
              <h2>{hotel.name}</h2>
              <p>{hotel.description}</p>
              <p><strong>City:</strong> {hotel.city}</p>
              <p><strong>Price:</strong> {hotel.price}</p>
              <p><strong>Max Guests:</strong> {hotel.maxGuests}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelsList;