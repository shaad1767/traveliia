import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; // same CSS use kar rahe

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
     // console.log("Login Response:", data); // ✅ yaha kaam karega


      if (!res.ok) {
        setMessage(data.message);
        return;
      }

      // ✅ Save token
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user.id);

      setMessage("Login successful 🎉");

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

        <div className="modal-header">
          <h3>Log in</h3>
        </div>

        <h2>Welcome to Traveliia</h2>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            className="input-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="continue-btn">
            Login
          </button>
        </form>

        {message && <p style={{ textAlign: "center" }}>{message}</p>}

        <div className="divider">or</div>

        <button className="google-btn">
          Continue with Google
        </button>

        <p className="toggle-text">
          Don't have an account?
          <span
            className="toggle-link"
            onClick={() => navigate("/signup")}
          >
            {" "}Sign up
          </span>
        </p>

      </div>
    </div>
  );
}