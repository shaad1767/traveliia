import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

console.log("Cloud name:", process.env.CLOUD_NAME);  // debug
console.log("API_KEY:", process.env.CLOUD_API_KEY);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

export default cloudinary;

