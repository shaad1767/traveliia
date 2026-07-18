import { useLocation, useNavigate } from "react-router-dom";
import "./search.Hotel.css";

const HotelsPage = () => {
  const location = useLocation();
  const hotels = location.state?.hotels || [];
  const navigate = useNavigate();

  const handleViewDetails = (hotelId) => {
    navigate(`/propertyDetails/${hotelId}`);
  };

  return (
    <div className="hotels-container">
      {hotels.length === 0 ? (
        <p className="no-results">Result Not Found 😔</p>
      ) : (
        hotels.map((hotel) => (
          <div className="hotel-card" key={hotel._id}>
            <img src={hotel.images[0]} alt={hotel.name} />
            <h3>{hotel.name}</h3>
            <p>{hotel.city}</p>
            <p>Max Guests: {hotel.maxGuests}</p>
            <p>Price: ₹{hotel.price}</p>

            <button
              className="view-button"
              onClick={() => handleViewDetails(hotel._id)}
            >
              View
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default HotelsPage;