import mongoose from "mongoose";

// User schema (account + personal details)
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Personal details
  fullName: { type: String },
  email: { type: String },
  city: { type: String },
  phone: { type: String },
  address: { type: String },
  profilePic: {
  type: String,
  default: ""
}

}, { timestamps: true });

export default mongoose.model("User", userSchema);