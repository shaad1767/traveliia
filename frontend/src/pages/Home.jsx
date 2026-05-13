import React from "react";

// components import
import Navbar from "../components/Navbarhome";
import HotelListing from "../components/HotelsList";
import Footer from "../components/Footer";

export default function Home() {

  const user = localStorage.getItem("user") 
  return (
    <div>

      {/* Navbar */}
      <Navbar />
      
      {/* Hotels Section */}
      <HotelListing />

      {/* Footer */}
      <Footer />

    </div>
  );
}