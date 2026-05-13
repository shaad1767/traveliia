import Booking from "../models/Booking.js";


// ================= CREATE BOOKING =================
export const createBooking = async (req, res) => {
  try {
    const {
      userId,
      hotelId,
      hotelName,
      price,
      paymentId,
      orderId
    } = req.body;

    if (!userId || !hotelId) {
      return res.status(400).json({
        message: "Missing required fields"
      });
    }

    const booking = await Booking.create({
      userId,
      hotelId,
      hotelName,
      price,
      paymentId,
      orderId,
      status: "confirmed"
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};


// ================= GET USER BOOKINGS =================
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.params.id;

    const bookings = await Booking.find({ userId })
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};