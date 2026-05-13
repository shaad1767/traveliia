import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./PropertyDetails.css";

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

  // Fetch Hotel Details
  useEffect(() => {
    fetch(`http://localhost:5000/api/hotels/${id}`)
      .then(res => res.json())
      .then(data => {
        //console.log("Hotel Data:", data);
        setHotel(data);
      });
  }, [id]);

  // Fetch Reviews
  useEffect(() => {
    fetch(`http://localhost:5000/api/reviews/${id}`)
      .then(res => res.json())
      .then(data => setReviews(data));
  }, [id]);

  // Submit Review
  const submitReview = async () => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/api/reviews/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ rating, comment }),
    });

    alert("Review Added");
    window.location.reload();
  };


// Handle Like
  const handleReserve = async () => {
  if (!checkIn || !checkOut) {
    alert("Please select dates");
    return;
  }

  console.log("💡 Key:", import.meta.env.VITE_RAZORPAY_KEY_ID);
console.log("💡 Secret:", import.meta.env.VITE_RAZORPAY_SECRET);

  try {
    // Step 1: Create order
    const res = await fetch("http://localhost:5000/api/payment/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: hotel.price }),
    });

    const order = await res.json();
    console.log("💡 Order from server:", order);
    
  // Step 2: Open Razorpay
    const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;
    console.log( RAZORPAY_KEY); // should print your key
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
          "http://localhost:5000/api/payment/verify",
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
        console.log("💡 Verify response raw:", verifyRes);


        const data = await verifyRes.json();
        console.log("💡 Verify response data:", data);
        if (data.success) {
          alert("Booking Confirmed 🎉");
          navigate("/MyBooking");
        } else {
          alert("Payment Failed ❌");
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (err) {
    console.log(err);
    alert("Something went wrong");
  }
};

  // Delete Hotel
  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/api/hotels/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Hotel Deleted");
    navigate("/Home");
  };

  // Loading
  if (!hotel) return <h2>Loading...</h2>;




  return (
    <div className="details-container">

      {/* Image Grid */}
      <div className="image-grid">
        <img
          src={hotel.images?.[0]}
          className="main-img"
          onClick={() => setSelectedImg(hotel.images?.[0])}
        />

        <div className="side-imgs">
          {hotel.images?.slice(1, 5).map((img, i) => (
            <img key={i} src={img} onClick={() => setSelectedImg(img)} />
          ))}
        </div>
      </div>

      {/* Fullscreen Image */}
      {selectedImg && (
        <div className="fullscreen" onClick={() => setSelectedImg(null)}>
          <img src={selectedImg} />
        </div>
      )}

      {/* Content */}
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
          <p>Owner id: {hotel.owner?.fullName || hotel.owner?.username || "Unknown"}</p>
          <hr />
          <address>Address:  {hotel.location}</address>
          <hr />
          <p>Contact: {hotel.owner?.email || "Not provided"}</p>

          {/* Owner Buttons */}
          {hotel.owner?.toString() === userId && (
            <div className="owner-buttons">
              <button onClick={() => navigate(`/edit/${hotel._id}`)}>
                Edit
              </button>

              <button onClick={handleDelete}>
                Delete
              </button>
            </div>
          )}

          {/* Map */}
          <div className="map">
            <iframe
              src={`https://www.google.com/maps?q=${hotel.city}&output=embed`}
              width="100%"
              height="300"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>
          </div>
          <hr />

          {/* Reviews */}
          <div className="review">
            <h3>Reviews</h3>

            <select onChange={(e) => setRating(e.target.value)}>
              <option value="5">5 ⭐</option>
              <option value="4">4 ⭐</option>
              <option value="3">3 ⭐</option>
              <option value="2">2 ⭐</option>
              <option value="1">1 ⭐</option>
            </select>

            <textarea
              placeholder="Write review..."
              onChange={(e) => setComment(e.target.value)}
            />

            <button onClick={submitReview}>Submit Review</button>

            
          </div>

          {/* Reviews Grid */}
            <div className="review-grid">
              {reviews.map((r) => (
                <div key={r._id} className="review">
                  <h4>{r.user?.name}</h4>
                  <p>Rating: ⭐ {r.rating}</p>
                  <p>{r.comment}</p>
                </div>
              ))}
            </div>
        </div>

        {/* Right Price Card */}
        <div className="price-card">
          <h2>${hotel.price} / night</h2>

          <div className="booking">
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

            <button className="reserve"  onClick={handleReserve}>
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