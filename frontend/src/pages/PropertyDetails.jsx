import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./PropertyDetails.css";

const BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000' 
  : 'https://traveliia.onrender.com';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Hotel State
  const [hotel, setHotel] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [liked, setLiked] = useState(false);

  // Reviews State
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  // Booking State
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const userId = localStorage.getItem("userId");

  // Helper function for dynamic image path
  const getImageUrl = (imgStr) => {
    if (!imgStr) return "https://via.placeholder.com/600x400";
    return imgStr.startsWith("http") ? imgStr : `${BASE_URL}/${imgStr}`;
  };

  // Fetch Hotel Details
  useEffect(() => {
    fetch(`${BASE_URL}/api/hotels/${id}`)
      .then(res => res.json())
      .then(data => {
        setHotel(data);
      })
      .catch(err => console.log("Error fetching hotel:", err));
  }, [id]);

  // Fetch Reviews
  useEffect(() => {
    fetch(`${BASE_URL}/api/reviews/${id}`)
      .then(res => res.json())
      .then(data => setReviews(Array.isArray(data) ? data : []))
      .catch(err => console.log("Error fetching reviews:", err));
  }, [id]);

  // Submit Review
  const submitReview = async () => {
    if (!comment.trim()) return alert("Please write a comment");
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${BASE_URL}/api/reviews/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating, comment }),
      });

      if (res.ok) {
        alert("Review Added ✅");
        window.location.reload();
      } else {
        alert("Failed to add review");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Handle Reserve (Razorpay Integration)
  const handleReserve = async () => {
    if (!checkIn || !checkOut) {
      alert("Please select dates");
      return;
    }

    try {
      // Step 1: Create order
      const res = await fetch(`${BASE_URL}/api/payment/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: hotel.price }),
      });

      const order = await res.json();
      
      // Step 2: Open Razorpay
      const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;
      const options = {
        key: RAZORPAY_KEY,
        amount: order.amount,
        currency: "INR",
        name: "Traveliia",
        description: hotel.name,
        order_id: order.id,

        handler: async function (response) {
          // Step 3: Verify + Save booking
          const verifyRes = await fetch(
            `${BASE_URL}/api/payment/verify`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...response,
                hotelId: hotel._id,
                checkIn,
                checkOut,
                price: hotel.price,
                userId,
              }),
            }
          );

          const data = await verifyRes.json();
          if (data.success) {
            alert("Booking Confirmed 🎉");
            navigate("/MyBooking");
          } else {
            alert("Payment Verification Failed ❌");
          }
        },
        prefill: {
          name: localStorage.getItem("username") || "",
        },
        theme: {
          color: "#3399cc",
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.log(err);
      alert("Something went wrong with the payment request");
    }
  };

  // Delete Hotel
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;
    const token = localStorage.getItem("token");

    try {
      await fetch(`${BASE_URL}/api/hotels/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Hotel Deleted");
      navigate("/Home");
    } catch (err) {
      console.log(err);
    }
  };

  if (!hotel) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  // Safe Check for Owner ID mapping
  const hotelOwnerId = hotel.owner?._id || hotel.owner;
  const isOwner = hotelOwnerId && hotelOwnerId.toString() === userId;

  return (
    <div className="details-container">

      {/* Image Grid with Safe Dynamic Paths */}
      {/* Image Grid with Safe Dynamic Paths */}
        <div className="image-grid">
          <img
            src={hotel.images?.[0] || "placeholder-image-url.jpg"} // 👈 getImageUrl hata kar direct path lagaya
            className="main-img"
            alt={hotel.name}
            onClick={() => setSelectedImg(hotel.images?.[0])} // 👈 Direct path
          />

          <div className="side-imgs">
            {hotel.images?.slice(1, 5).map((img, i) => (
              <img 
                key={i} 
                src={img} // 👈 Yahan bhi direct image string link use kiya
                alt="side-view"
                onClick={() => setSelectedImg(img)} 
              />
            ))}
          </div>
        </div>

      {/* Fullscreen Image Overlay */}
      {selectedImg && (
        <div className="fullscreen" onClick={() => setSelectedImg(null)}>
          <img src={selectedImg} alt="fullscreen-preview" />
        </div>
      )}

      {/* Content Layout */}
      <div className="content">

        {/* Left Section */}
        <div className="left">
          <h2>{hotel.name}</h2>
          <hr />
          <p className="desc">{hotel.description}</p>
          <hr />
          <p>City: {hotel.city}</p>
          <hr />
          <p>Max Guests: {hotel.maxGuests}</p>
          <hr />
          <p>Owner: {hotel.owner?.fullName || hotel.owner?.username || "Unknown"}</p>
          <hr />
          <address>Address: {hotel.location}</address>
          <hr />
          <p>Contact: {hotel.owner?.email || "Not provided"}</p>

          {/* Owner Buttons Check Fixed */}
          {isOwner && (
            <div className="owner-buttons">
              <button onClick={() => navigate(`/edit/${hotel._id}`)}>
                Edit
              </button>
              <button onClick={handleDelete} className="delete-btn">
                Delete
              </button>
            </div>
          )}

          {/* Map Frame */}
          <div className="map">
            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent(hotel.city)}&output=embed`}
              width="100%"
              height="300"
              style={{ border: 0 }}
              loading="lazy"
              title="hotel-location"
            ></iframe>
          </div>
          <hr />

          {/* Review Input Section */}
          <div className="review">
            <h3>Reviews</h3>
            <select onChange={(e) => setRating(Number(e.target.value))}>
              <option value="5">5 ⭐</option>
              <option value="4">4 ⭐</option>
              <option value="3">3 ⭐</option>
              <option value="2">2 ⭐</option>
              <option value="1">1 ⭐</option>
            </select>

            <textarea
              placeholder="Write review..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button onClick={submitReview}>Submit Review</button>
          </div>

          {/* Reviews List */}
          <div className="review-grid">
            {reviews.length > 0 ? (
              reviews.map((r) => (
                <div key={r._id} className="review-card">
                  <h4>{r.user?.username || r.user?.name || "Anonymous"}</h4>
                  <p>Rating: ⭐ {r.rating}</p>
                  <p>{r.comment}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </div>

        {/* Right Price Card */}
        <div className="price-card">
          <h2>₹ {hotel.price} / night</h2>

          <div className="booking-inputs">
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>

          <button className="reserve" onClick={handleReserve}>
            Reserve
          </button>
        </div>

        {/* Amenities Card */}
        <div className="amenities-card">
          <h3>Amenities</h3>
          <ul>
            <li>📶 Free WiFi</li>
            <li>❄️ Air Conditioning</li>
            <li>🍳 Kitchen</li>
            <li>🚗 Free Parking</li>
            <li>📺 TV</li>
            <li>🛁 Hot Water</li>
            <li>🧺 Washing Machine</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default PropertyDetails;