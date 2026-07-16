import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./priceMeterhotel.css";

// Yeh line check karegi ki aap local computer par hain ya live server par
const BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000' 
  : 'https://traveliia.onrender.com';

const Hotels = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const min = queryParams.get("min") || 0;
  const max = queryParams.get("max") || 1000000;

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log("Frontend min:", min);
        console.log("Frontend max:", max);

        // Yahan live string ki jagah dynamic BASE_URL use kiya hai
        const res = await fetch(
          `${BASE_URL}/api/hotels/filter?min=${min}&max=${max}`
        );

        if (!res.ok) {
          throw new Error(`Server Error: ${res.status}`);
        }

        const data = await res.json();
        console.log("Filtered Hotels:", data);
        setHotels(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [min, max]);

  return (
    <div className="hotels-container">
      <h1>Hotel List</h1>

      {loading && <p>Loading hotels...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="hotel-list">
        {hotels.length > 0 ? (
          hotels.map((hotel) => (
            <div key={hotel._id} className="hotel-card">
              {/* Image */}
              <img
                src={hotel.images?.[0]}
                alt={hotel.name}
                onError={(e) =>
                  (e.target.src =
                    "https://dummyimage.com/300x200/cccccc/000000&text=Hotel")
                }
              />

              {/* Content */}
              <div className="card-content">
                <h3>{hotel.name}</h3>
                <p>
                  <strong>City:</strong> {hotel.city}
                </p>
                <p>
                  <strong>Price:</strong> ₹{hotel.price}
                </p>

                {/* Buttons */}
                <div className="card-buttons">
                  <button onClick={() => navigate(`/book/${hotel._id}`)}>
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          !loading && <p>No hotels found</p>
        )}
      </div>
    </div>
  );
};

export default Hotels;