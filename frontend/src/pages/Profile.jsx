import React, { useEffect, useState } from "react";
import "./profile.css";
import { useNavigate } from "react-router-dom";

const BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000' 
  : 'https://traveliia.onrender.com';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetch(`${BASE_URL}/api/users/profile/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.log(err));
  }, [userId]);

  if (!user) {
    return (
      <div className="profile-loading">
        <div className="spinner"></div>
        <h2>Loading Profile...</h2>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        
        {/* LEFT PROFILE CARD */}
        <div className="profile-left">
          <div className="avatar-container" onClick={() => navigate("/editprofile")}>
            {user.profilePic ? (
              <img src={user.profilePic} alt="profile" className="profile-img" />
            ) : (
              <div className="avatar">
                {user.fullName?.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="avatar-overlay">
              <span>📷 Edit</span>
            </div>
          </div>

          <h2 className="user-name">{user.fullName || "Travelia User"}</h2>
          <p className="user-handle">@{user.username}</p>

          <div className="info-list">
            <div className="info-item">
              <span className="info-icon">📧</span>
              <span className="info-text">{user.email || "No email added"}</span>
            </div>
            <div className="info-item">
              <span className="info-icon">📱</span>
              <span className="info-text">{user.phone || "No phone added"}</span>
            </div>
            <div className="info-item">
              <span className="info-icon">📍</span>
              <span className="info-text">{user.city || "No city added"}</span>
            </div>
          </div>

          <div className="profile-buttons">
            <button className="btn-primary" onClick={() => navigate("/editprofile")}>
              Edit Profile
            </button>
            <button className="btn-secondary" onClick={() => navigate("/Settings")}>
              Settings
            </button>
          </div>
        </div>

        {/* RIGHT CONTENT SECTION */}
        <div className="profile-right">
          <div className="welcome-banner">
            <h1>Welcome back, {user.fullName?.split(" ")[0] || "User"}! 👋</h1>
            <p>Manage your properties, tracked bookings, and global platform configuration settings here.</p>
          </div>

          <div className="profile-options">
            <div className="option-card" onClick={() => navigate("/MyListings")}>
              <div className="option-icon-wrapper">🏠</div>
              <h3>My Listings</h3>
              <p>View, edit, or launch new real estate property listings.</p>
            </div>

            <div className="option-card" onClick={() => navigate("/MyBooking")}>
              <div className="option-icon-wrapper">📖</div>
              <h3>My Bookings</h3>
              <p>Check your current reservation schedules and history.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;