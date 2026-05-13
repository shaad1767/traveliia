import React, { useState } from "react";
import "./AddListing.css";
import { useNavigate } from "react-router-dom";

export default function AddListing() {
  const navigate = useNavigate();

  const [images, setImages] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    location: "",
    price: "",
    maxGuests: "",
    amenities: "",
    description: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Images:", images);   // 👈 yahan print karo


    const data = new FormData();

    data.append("name", formData.name);
    data.append("city", formData.city);
    data.append("location", formData.location);
    data.append("price", formData.price);
    data.append("maxGuests", formData.maxGuests);
    data.append("description", formData.description);

    for (let i = 0; i < images.length; i++) {
       data.append("images", images[i]);
   }

    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/hotels/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: data
    });

    const result = await res.json();
    alert(result.message);

    
  // ✅ Redirect to Home page
  if (res.ok) {
    navigate("/Home"); // "/" is your Home route
  }
  };

  

  return (
    <div className="add-listing">

      <h2>Add Hotel Listing</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="name"
          placeholder="Hotel Name"
          onChange={handleChange}
          required
        />

        <input
          name="city"
          placeholder="City"
          onChange={handleChange}
          required
        />

        <input
          name="location"
          placeholder="Location / Address"
          onChange={handleChange}
          required
        />

        <input
          name="price"
          type="number"
          placeholder="Price per night"
          onChange={handleChange}
          required
        />

        <input
          name="maxGuests"
          type="number"
          placeholder="Max Guests"
          onChange={handleChange}
          required
        />

        <input
          type="file"
          name="images"
          multiple
          onChange={(e) => setImages([...e.target.files])}
        />

        <input
          name="amenities"
          placeholder="Amenities (wifi,pool,ac)"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Hotel Description"
          onChange={handleChange}
        />

        <button type="submit">Add Listing</button>

      </form>

    </div>
  );
}