import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Hotel from "./models/HotelModel.js";
import hotelsData from "./data/hotelsData.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Hotel.deleteMany(); // purana data delete

    await Hotel.insertMany(hotelsData);

    console.log("Hotel Data Inserted Successfully ✅");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();