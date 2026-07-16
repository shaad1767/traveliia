import React, { useEffect, useState } from "react";
import "./editprofile.css";

// Yeh line check karegi ki aap local computer par hain ya live server par
const APP_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000' 
  : 'https://traveliia.onrender.com';

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
  const [preview, setPreview] = useState("");

  // ✅ FETCH USER
  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        const res = await fetch(`${BASE_URL}/profile/${userId}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        setUser({ ...data, password: "" });
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchUser();
  }, [userId]);

  // ✅ HANDLE INPUT
  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ✅ VALIDATION
  const validate = () => {
    let err = {};

    if (!user.username.trim()) err.username = "Username required";
    if (!user.email.includes("@")) err.email = "Invalid email";
    if (!user.phone || user.phone.length < 10)
      err.phone = "Invalid phone";
    if (!user.city.trim()) err.city = "City required";
    if (user.password && user.password.length < 6)
      err.password = "Min 6 characters";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // ✅ UPDATE PROFILE
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
      loading(false);
    }
  };

  // ✅ IMAGE SELECT + PREVIEW
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  // ✅ IMAGE UPLOAD
  const handleImageUpload = async () => {
    if (!selectedFile) return alert("Select image first");

    const formData = new FormData();
    formData.append("profilePic", selectedFile);
    console.log(selectedFile);

    try {
      const res = await fetch(`${BASE_URL}/upload/${userId}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setUser((prev) => ({
        ...prev,
        profilePic: data.profilePic,
      }));
      setPreview(""); // clear preview
      setSelectedFile(null);

      alert("Image Updated ✅");
    } catch (err) {
      alert(err.message || "Upload Failed ❌");
    }
  };

  // ✅ DELETE IMAGE
  const handleDeleteImage = async () => {
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
                ? user.profilePic.startsWith("blob") ||
                  user.profilePic.startsWith("http")
                  ? user.profilePic
                  : `${APP_URL}/${user.profilePic}` // Yahan dynamic APP_URL lagaya hai
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

            <button onClick={handleDeleteImage}>Delete</button>
          </div>
        </div>
      </div>

      {/* FORM */}
      <div className="form-row">
        <label>Username :</label>
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
        />
        {errors.username && <span>{errors.username}</span>}
      </div>

      <div className="form-row">
        <label>Email :</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>

      <div className="form-row">
        <label>Mobile No :</label>
        <input
          type="text"
          name="phone"
          value={user.phone}
          onChange={handleChange}
        />
        {errors.phone && <span>{errors.phone}</span>}
      </div>

      <div className="form-row">
        <label>City :</label>
        <input
          type="text"
          name="city"
          value={user.city}
          onChange={handleChange}
        />
        {errors.city && <span>{errors.city}</span>}
      </div>

      <div className="form-row">
        <label>Password :</label>
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Leave blank to keep same"
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            👁️
          </span>
        </div>
        {errors.password && <span>{errors.password}</span>}
      </div>

      <button onClick={handleUpdate} disabled={loading}>
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default EditProfile;