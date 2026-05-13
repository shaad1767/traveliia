import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  hotelId: String,
  userId: String,
  checkIn: String,
  checkOut: String,
  price: Number,
}
, { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);