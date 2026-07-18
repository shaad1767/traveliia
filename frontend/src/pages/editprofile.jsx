import React, { useEffect, useState } from "react";
import "./editprofile.css";

// 1. URL patterns agar change karne hon toh yahan se check karein
const APP_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000' 
  : 'https://traveliia.onrender.com';

// ⚠️ Agar backend me route '/api/users' ke bajay sirf '/api' ho, toh niche se '/users' hata dein
const BASE_URL = `${APP_URL}/api/users`;

const EditProfile = () => {
  const userId = localStorage.getItem("userId");

  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    city: "",
    password: "",
    profilePic: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ 1. FETCH USER PROFILE
  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        const res = await fetch(`${BASE_URL}/profile/${userId}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Profile fetch failed");

        setUser({ ...data, password: "" });
      } catch (err) {
        console.error("Profile Load Error:", err.message);
      }
    };

    fetchUser();
  }, [userId]);

  // ✅ 2. HANDLE INPUT CHANGES
  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ✅ 3. IMAGE LOCAL PREVIEW (Instant display on screen)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUser((prev) => ({
        ...prev,
        profilePic: URL.createObjectURL(file), // Creates immediate blob preview
      }));
    }
  };

  // ✅ 4. VALIDATION
  const validate = () => {
    let err = {};

    if (!user.username?.trim()) err.username = "Username required";
    if (!user.email?.includes("@")) err.email = "Invalid email";
    if (!user.phone || user.phone.length < 10) err.phone = "Invalid phone";
    if (!user.city?.trim()) err.city = "City required";
    if (user.password && user.password.length < 6) err.password = "Min 6 characters";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // ✅ 5. UPDATE TEXT PROFILE DATA
  const handleUpdate = async () => {
    if (!validate()) return;
    setLoading(true);

    try {
      const updatedData = { ...user };
      if (!updatedData.password) {
        delete updatedData.password;
      }

      const res = await fetch(`${BASE_URL}/update/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert("Profile Updated ✅");
      setUser({ ...data, password: "" });
    } catch (err) {
      alert(err.message || "Update Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // ✅ 6. UPLOAD IMAGE TO BACKEND
  const handleImageUpload = async () => {
    if (!selectedFile) return alert("Please select an image first");

    const formData = new FormData();
    formData.append("profilePic", selectedFile);

    try {
      // ⚠️ Note: Content-Type header yahan block kiya hai taaki boundary autofill ho sake
      const res = await fetch(`${BASE_URL}/upload/${userId}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload process failed");

      setUser((prev) => ({
        ...prev,
        profilePic: data.profilePic,
      }));
      setSelectedFile(null);
      alert("Image Uploaded Successfully ✅");
    } catch (err) {
      alert(err.message || "Upload Failed ❌ Link breakdown check.");
    }
  };

  // ✅ 7. DELETE IMAGE
  const handleDeleteImage = async () => {
    if (!window.confirm("Are you sure you want to delete profile picture?")) return;
    
    try {
      const res = await fetch(`${BASE_URL}/delete-image/${userId}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setUser((prev) => ({
        ...prev,
        profilePic: "",
      }));
      setSelectedFile(null);
      alert("Image Deleted ✅");
    } catch (err) {
      alert(err.message || "Delete Failed ❌");
    }
  };

  return (
    <div className="edit-container">
      <h2>Edit Profile</h2>

      {/* PROFILE IMAGE */}
      <div className="edit-item">
        <div className="image-section">
          <img
            src={
              user.profilePic
                ? user.profilePic.startsWith("blob:") || user.profilePic.startsWith("http")
                  ? user.profilePic
                  : `${APP_URL}/${user.profilePic}`
                : "https://ui-avatars.com/api/?name=User&background=random"
            }
            alt="profile"
          />

          <div className="image-buttons">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <button onClick={handleImageUpload}>Upload</button>
            <button onClick={handleDeleteImage} className="delete-btn">Delete</button>
          </div>
        </div>
      </div>

      {/* FORM FIELDS */}
      <div className="form-row">
        <label>Username :</label>
        <input
          type="text"
          name="username"
          value={user.username || ""}
          onChange={handleChange}
        />
        {errors.username && <span className="error-text">{errors.username}</span>}
      </div>

      <div className="form-row">
        <label>Email :</label>
        <input
          type="email"
          name="email"
          value={user.email || ""}
          onChange={handleChange}
        />
        {errors.email && <span className="error-text">{errors.email}</span>}
      </div>

      <div className="form-row">
        <label>Mobile No :</label>
        <input
          type="text"
          name="phone"
          value={user.phone || ""}
          onChange={handleChange}
        />
        {errors.phone && <span className="error-text">{errors.phone}</span>}
      </div>

      <div className="form-row">
        <label>City :</label>
        <input
          type="text"
          name="city"
          value={user.city || ""}
          onChange={handleChange}
        />
        {errors.city && <span className="error-text">{errors.city}</span>}
      </div>

      <div className="form-row">
        <label>Password :</label>
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={user.password || ""}
            onChange={handleChange}
            placeholder="Leave blank to keep same"
          />
          <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>
        {errors.password && <span className="error-text">{errors.password}</span>}
      </div>

      <button className="save-btn" onClick={handleUpdate} disabled={loading}>
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default EditProfile;