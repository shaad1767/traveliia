import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ======================
// REGISTER USER (SIGNUP)
// ======================
export const registerUser = async (req, res) => {
  try {
    const { username, password, fullName, email, city, phone, address } = req.body;

    // check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
      fullName,
      email,
      city,
      phone,
      address
    });

    await user.save();

    res.status(201).json({
      message: "Account created successfully",
      user: {
        id: user._id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        city: user.city,
        phone: user.phone,
        address: user.address
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ======================
// LOGIN USER
// ======================
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // ✅ token create karo
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ response bhejo
    res.status(200).json({
      message: "Login successful",
      token: token,
      user: {
        id: user._id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        city: user.city,
        phone: user.phone,
        address: user.address
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};