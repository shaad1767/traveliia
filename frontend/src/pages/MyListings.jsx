import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyListings.css";

const BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000' 
  : 'https://traveliia.onrender.com';

const MyListings = () => {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${BASE_URL}/api/hotels/myhotels`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

       // console.log("API Response:", data); // 🔥 Full response
       // console.log("Hotels Array:", data.hotels || data); // 🔥 Hotels array

        if (Array.isArray(data)) {
          setHotels(data);
        } else if (Array.isArray(data.hotels)) {
          setHotels(data.hotels);
        } else {
          setHotels([]);
        }

      } catch (error) {
        console.log("Error:", error);
        setHotels([]);
      }
    };

    fetchHotels();
  }, []);

  return (
    <div className="mylistings-container">
      <h1>My Listings</h1>

      <div className="listings-grid">
        {hotels.length > 0 ? (
          hotels.map((hotel) => {
           

            return (
              <div key={hotel._id} className="listing-card">
                
                <img
                  src={
                    hotel.images && hotel.images.length > 0
                      ? hotel.images[0]
                      : "https://via.placeholder.com/300"
                  }
                  alt={hotel.name}
                />

                <div className="card-content">
                  <h3>{hotel.name}</h3>
                  <p>{hotel.city}</p>

                  <div className="card-buttons">
                    <button onClick={() => navigate(`/edit/${hotel._id}`)}>
                      Edit
                    </button>

                    <button onClick={() => navigate(`/PropertyDetails/${hotel._id}`)}>
                      View
                    </button>
                  </div>
                </div>

              </div>
            );
          })
        ) : (
          <p>No listings found</p>
        )}
      </div>
    </div>
  );
};

export default MyListings;