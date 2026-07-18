import React from "react";
import { Link } from "react-router-dom";
import "./services.css";

const About = () => {
  return (
    <div className="about-container">
      {/* Hero Banner Section */}
      <section className="about-hero">
        <div className="hero-overlay">
          <h1>About Travelia</h1>
          <p>Redefining your hotel booking and stay experience globally.</p>
        </div>
      </section>

      {/* Main Vision Section */}
      <section className="about-vision">
        <div className="section-content">
          <h2>Our Mission</h2>
          <p>
            Travelia ek cutting-edge online hotel and homestay booking platform hai. 
            Humara main target world-class traveling experiences ko sabhi ke liye simple, 
            budget-friendly, aur accessible banana hai. Hum hotel booking process se saari 
            complications ko hatakar users ko ek transparent system provide karte hain.
          </p>
          <p>
            Chahe aap ek solo trip plan kar rahe hon, business travel par ja rahe hon, 
            ya family vacation manage kar rahe hon, Travelia har requirement ke liye right space 
            short-list karne me help karta hai. Hum real-time database query indexing aur secure 
            payment systems ka use karte hain taaki aapka booking cycle smooth rahe.
          </p>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="about-stats">
        <div className="stat-card">
          <h3>5,000+</h3>
          <p>Verified Hotels & Stays</p>
        </div>
        <div className="stat-card">
          <h3>1M+</h3>
          <p>Happy Travelers</p>
        </div>
        <div className="stat-card">
          <h3>0%</h3>
          <p>Hidden Charges</p>
        </div>
        <div className="stat-card">
          <h3>24/7</h3>
          <p>Customer Support</p>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="about-features">
        <h2>Why Choose Travelia?</h2>
        <div className="features-grid">
          <div className="feature-item">
            <h4>Smart Search Engine</h4>
            <p>Aapki location, check-in/out dates, aur guest counts ko parse karke system instant properties micro-seconds me load karta hai.</p>
          </div>
          <div className="feature-item">
            <h4>Flexible Hosting Model</h4>
            <p>Hum hotels ke sath individual homestay hosts ko bhi platform dete hain. Koi bhi user "Become a Host" bankar earning start kar sakta hai.</p>
          </div>
          <div className="feature-item">
            <h4>100% Secure Transactions</h4>
            <p>End-to-end tokenized payments automatic transaction locks ke sath integrated hain, jisse double-booking ka koi chance nahi rehta.</p>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="about-cta">
        <h2>Ready to Explore the World with Us?</h2>
        <p>Find the absolute best deals on luxury hotels, cozy homestays, and budget rentals.</p>
        <Link to="/Home">
          <button className="cta-btn">Book Your Stay Now</button>
        </Link>
      </section>
    </div>
  );
};

export default About;