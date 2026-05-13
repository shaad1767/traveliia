import React, { useEffect, useState } from "react";
import "./profile.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetch(`http://localhost:5000/api/users/profile/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.log(err));
  }, [userId]);

  if (!user) return <h2>Loading...</h2>;

  return (
    <div className="profile-container">

      {/* LEFT CARD */}
      <div className="profile-left">

        {/* 🔥 STATIC AVATAR */}
       <div className="avatar-container">
          {user.profilePic ? (
        <img
          src={user.profilePic}
          alt="profile"
         className="profile-img"
       />
       ) : (
      <div className="avatar">
      {user.fullName?.charAt(0).toUpperCase()}
       </div>
       )}
      </div>

        <hr />

        <h2>@{user.username}</h2>

        <div className="info">
          <p>📧 {user.email || "No email"}</p>
          <p>📱 {user.phone || "No phone"}</p>
          <p>📍 {user.city || "No city"}</p>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="profile-right">

        <div className="profile-buttons">
          <button onClick={() => navigate("/editprofile")}>
            Edit Profile
          </button>

          <button onClick={() => navigate("/Settings")}>
            Settings
          </button>
        </div>

        {/* OPTIONS */}
        <div className="profile-options">
          <div
            className="option-card"
            onClick={() => navigate("/MyListings")}
          >
            🏠 My Listings
          </div>

          <div
            className="option-card"
            onClick={() => navigate("/MyBooking")}
          >
            📖 My Bookings
          </div>
        </div>
      </div>

    </div>
  );
};

export default Profile;