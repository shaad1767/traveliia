import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

export default function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    city: "",
    phone: "",
    address: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e) => {

    e.preventDefault();

    try {

      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message);
        return;
      }

      setMessage("Account created 🎉");

      setTimeout(() => {
        navigate("/Home");
      }, 1000);

    } catch (error) {
      setMessage("Server error");
    }

  };

  return (

    <div className="modal-overlay">
      <div className="modal-box">

        <h2>Create Account</h2>

        <form onSubmit={handleSignup}>

          <input name="username" placeholder="Username" className="input-field" onChange={handleChange} required />

          <input type="password" name="password" placeholder="Password" className="input-field" onChange={handleChange} required />

          <input name="email" placeholder="Email" className="input-field" onChange={handleChange} />

          <input name="city" placeholder="City" className="input-field" onChange={handleChange} />

          <input name="phone" placeholder="Phone" className="input-field" onChange={handleChange} />

          <input name="address" placeholder="Address" className="input-field" onChange={handleChange} />

          <button className="continue-btn">
            Create Account
          </button>

        </form>

        {message && <p>{message}</p>}

        <hr className="divider" />

        <button className="google-btn">
          Continue with Google
        </button>

        <p className="login-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>
            Login
          </span>
        </p>

      </div>
    </div>

  );
}