import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HotelsList from "./components/HotelsList";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import AddListing from "./pages/Addlisting";
import PropertyDetails from "./pages/PropertyDetails";
import EditHotel from "./pages/EditHotel";
import MyListings from "./pages/MyListings";
import Pricing from "./components/Pricing";
import Hotels from "./components/priceMeterhotel";
import Services from "./components/services";
import SearchHotel from "./components/searchHotel";
import HelpPage from "./components/Help";
import MyBookings from "./pages/MyBooking";   // ✅ ONLY THIS
import Settings from "./pages/Settings";
import EditProfile from "./pages/editprofile";

function App() {
  return (
    <div className="app">

      <div className="page-content">
        <Routes>

          <Route path="/" element={
            <>
              <Navbar />
              <HotelsList />
              <Footer />
            </>
          } />

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Addlisting" element={<AddListing />} />
          <Route path="/PropertyDetails/:id" element={<PropertyDetails />} />
          <Route path="/edit/:id" element={<EditHotel />} />
          <Route path="/mylistings" element={<MyListings />} />
          <Route path="/Pricing" element={<Pricing />} />
          <Route path="/priceMeterhotel" element={<Hotels />} />
          <Route path="/services" element={<Services />} />
          <Route path="/searchHotel" element={<SearchHotel />} />
          <Route path="/Help" element={<HelpPage />} />
          <Route path="/MyBooking" element={<MyBookings />} />   {/* ✅ FIXED */}
          <Route path="/Settings" element={<Settings />} />
          <Route path="/EditProfile" element={<EditProfile />} />

        </Routes>
      </div>

    </div>
  );
}

export default App;