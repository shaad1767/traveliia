import React, { useEffect, useState } from "react";
import "./MyBooking.css";

const MyBookings = () => {
  const userId = localStorage.getItem("userId");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 DUMMY DATA (fallback)
  const dummyBookings = [
    {
      _id: 1,
      hotelName: "Grand Palace Hotel",
      price: 2500,
      status: "Confirmed",
      paymentId: "pay_123456",
      checkIn: "2026-04-10",
      checkOut: "2026-04-12",
      image: "https://source.unsplash.com/400x300/?hotel",
    },
    {
      _id: 2,
      hotelName: "Sea View Resort",
      price: 3200,
      status: "Confirmed",
      paymentId: "pay_789101",
      checkIn: "2026-04-15",
      checkOut: "2026-04-18",
      image: "https://source.unsplash.com/400x300/?resort",
    },
    {
      _id: 3,
      hotelName: "Mountain Stay",
      price: 1800,
      status: "Pending",
      paymentId: "pay_112233",
      checkIn: "2026-04-20",
      checkOut: "2026-04-22",
      image: "https://source.unsplash.com/400x300/?mountain,hotel",
    },
    {
      _id: 4,
      hotelName: "City Lights Inn",
      price: 2200,
      status: "Confirmed",
      paymentId: "pay_445566",
      checkIn: "2026-04-25",
      checkOut: "2026-04-27",
      image: "https://source.unsplash.com/400x300/?city,hotel",
    },
  ];

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/bookings/user/${userId}`
        );

        const data = await res.json();

        // ✅ REAL DATA AAYA TO USE KARO
        if (data?.bookings && data.bookings.length > 0) {
          setBookings(data.bookings);
        } else {
          // ❌ OTHERWISE DUMMY SHOW KARO
          setBookings(dummyBookings);
        }

      } catch (err) {
        console.log(err);
        // ❌ ERROR ME BHI DUMMY SHOW
        setBookings(dummyBookings);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId]);

  if (loading) return <h3 style={{ textAlign: "center" }}>Loading...</h3>;

  return (
    <div className="mybooking-container">

      <h2 className="mybooking-title">My Bookings</h2>

      <div className="booking-grid">

        {bookings.map((b) => (
          <div key={b._id} className="booking-card">

            <img src={b.image} alt="hotel" />

            <div className="booking-content">

              <h3>{b.hotelName}</h3>

              <p className="price">₹ {b.price}</p>

              <p className="dates">
                {b.checkIn} → {b.checkOut}
              </p>

              <span className="status">
                {b.status}
              </span>

              <p className="payment">
                🧾 {b.paymentId}
              </p>

              <button className="cancel-btn">
                Cancel Booking
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default MyBookings;