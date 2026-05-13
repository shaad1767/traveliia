import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const EditHotel = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState({
    name: "",
    city: "",
    location: "",
    price: "",
    maxGuests: "",
    description: "",
  });

  useEffect(() => {
    fetch(`http://localhost:5000/api/hotels/${id}`)
      .then(res => res.json())
      .then(data => setHotel(data));
  }, [id]);

  const handleChange = (e) => {
    setHotel({ ...hotel, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/api/hotels/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(hotel),
    });

    alert("Hotel Updated");
    navigate("/home");
  };

  return (
    <form onSubmit={handleUpdate}>
      <input name="name" value={hotel.name} onChange={handleChange} />
      <input name="city" value={hotel.city} onChange={handleChange} />
      <input name="location" value={hotel.location} onChange={handleChange} />
      <input name="price" value={hotel.price} onChange={handleChange} />
      <input name="maxGuests" value={hotel.maxGuests} onChange={handleChange} />
      <textarea name="description" value={hotel.description} onChange={handleChange} />
      
      <button type="submit">Update Hotel</button>
    </form>
  );
};

export default EditHotel;