import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // hotel ka naam zaroori hai
    },
    city: {
      type: String,
      required: true, // city ka naam zaroori hai
    },
    location: {
      type: String,
      required: true, // exact location ya address
    },
    price: {
      type: Number,
      required: true, // per night price
    },
   
    images: [
      {
        type: String, // multiple images ke liye array
      },
    ],
    amenities: [
      {
        type: String, // facilities jaise WiFi, AC, Pool
      },
    ],
    description: {
      type: String, // hotel ka description
    },
    maxGuests: {
      type: Number,
      required: true, // kitne log stay kar sakte hain
      default: 2, // agar specific na ho to default 2
    },
   
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  },
  {
    timestamps: true, // createdAt aur updatedAt automatically
  }
);

const Hotel = mongoose.models.Hotel || mongoose.model("Hotel", hotelSchema);

export default Hotel;