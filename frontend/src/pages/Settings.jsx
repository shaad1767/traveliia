import React from "react";
import "./Settings.css";

const Settings = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="settings-wrapper">

      <h2 className="title">Settings</h2>

      {/* BOX 1 */}
      <div className="settings-box">
        <h4>Account</h4>

        <div className="item">👤 Edit Profile</div>
        <div className="item">📧 Email & Phone</div>
        <div className="item">🔑 Change Password</div>
      </div>

      {/* BOX 2 */}
      <div className="settings-box">
        <h4>Security</h4>

        <div className="item">🛡️ Login Security</div>
        <div className="item">📍 Login Activity</div>
        <div className="item">📲 Two-Factor Authentication</div>
      </div>

      {/* BOX 3 */}
      <div className="settings-box">
        <h4>Privacy</h4>

        <div className="item">🔒 Private Account</div>
        <div className="item">👁️ Profile Visibility</div>
        <div className="item">🚫 Blocked Users</div>
      </div>

      {/* BOX 4 */}
      <div className="settings-box">
        <h4>Notifications</h4>

        <div className="item">🔔 Push Notifications</div>
        <div className="item">📩 Email Notifications</div>
        <div className="item">📢 Promotions</div>
      </div>

      {/* BOX 5 */}
      <div className="settings-box">
        <h4>Support</h4>

        <div className="item">❓ Help Center</div>
        <div className="item">🐞 Report a Problem</div>
      </div>

      {/* LOGOUT */}
      <div className="logout-box">
        <div className="logout" onClick={handleLogout}>
          🚪 Logout
        </div>
      </div>

    </div>
  );
};

export default Settings;