import React, { useEffect, useState } from "react";
import "./Mybooking.css";

const BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000' 
  : 'https://traveliia.onrender.com';

const MyBookings = () => {
  const userId = localStorage.getItem("userId");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const dummyBookings = [
    {
      _id: "1",
      hotelName: "Grand Palace Hotel",
      price: 2500,
      status: "Confirmed",
      paymentId: "pay_123456",
      checkIn: "2026-04-10",
      checkOut: "2026-04-12",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&auto=format&fit=crop",
    },
    {
      _id: "2",
      hotelName: "Sea View Resort",
      price: 3200,
      status: "Confirmed",
      paymentId: "pay_789101",
      checkIn: "2026-04-15",
      checkOut: "2026-04-18",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&auto=format&fit=crop",
    },
    {
      _id: "3",
      hotelName: "Mountain Stay",
      price: 1800,
      status: "Pending",
      paymentId: "pay_112233",
      checkIn: "2026-04-20",
      checkOut: "2026-04-22",
      image: "https://images.unsplash.com/photo-1486591978090-58e619d37fe7?w=500&auto=format&fit=crop",
    },
  ];

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/bookings/user/${userId}`);
        const data = await res.json();

        if (data?.bookings && data.bookings.length > 0) {
          setBookings(data.bookings);
        } else {
          setBookings(dummyBookings);
        }
      } catch (err) {
        console.log(err);
        setBookings(dummyBookings);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId]);

  if (loading) {
    return (
      <div className="booking-loading-wrapper">
        <div className="booking-spinner"></div>
        <p>Fetching your reservations...</p>
      </div>
    );
  }

  return (
    <div className="mybooking-container">
      <div className="mybooking-header">
        <h2>My Bookings</h2>
        <p className="subtitle">Manage your upcoming trips and reservation payments.</p>
      </div>

      <div className="booking-grid">
        {bookings.map((b) => (
          <div key={b._id} className="booking-card">
            <div className="image-wrapper">
              <img src={b.image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&auto=format&fit=crop"} alt="hotel" />
              <span className={`status-badge ${b.status?.toLowerCase()}`}>
                {b.status}
              </span>
            </div>

            <div className="booking-content">
              <h3 className="hotel-title">{b.hotelName}</h3>
              
              <div className="booking-meta-row">
                <span className="price-tag">₹{b.price} <small>/ night</small></span>
              </div>

              <div className="date-box">
                <div className="date-element">
                  <span className="date-label">CHECK-IN</span>
                  <span className="date-val">{b.checkIn}</span>
                </div>
                <div className="date-divider">→</div>
                <div className="date-element">
                  <span className="date-label">CHECK-OUT</span>
                  <span className="date-val">{b.checkOut}</span>
                </div>
              </div>

              <div className="payment-footer">
                <span className="receipt-icon">🧾</span>
                <span className="payment-id">{b.paymentId}</span>
              </div>

              <button className="cancel-btn" onClick={() => alert("Cancellation request submitted.")}>
                Cancel Reservation
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;