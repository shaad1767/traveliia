import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import cloudinary from "../config/cloudinary.js";


// ✅ GET PROFILE
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ UPDATE PROFILE
export const updateProfile = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // ❌ prevent empty password overwrite
    if (updateData.password && updateData.password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    } else {
      delete updateData.password;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const uploadImage = async (req, res) => {
  try {

      console.log("FILE:", req.file);

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ❌ old image delete (safe only if exists)
    if (user.profilePic) {
      try {
        const parts = user.profilePic.split("/");
        const fileName = parts[parts.length - 1];
        const publicId = `travelia_hotels/${fileName.split(".")[0]}`;

        await cloudinary.uploader.destroy(publicId);
      } catch (e) {
        console.log("Old image delete error:", e.message);
      }
    }

    // ✅ CloudinaryStorage already uploads file
    if (!req.file) {
      return res.status(400).json({ message: "No file received" });
    }

    user.profilePic = req.file.path; // ⭐ IMPORTANT FIX
    await user.save();

    res.json({
      message: "Image uploaded successfully",
      profilePic: req.file.path,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};


// ✅ DELETE IMAGE
export const deleteProfileImage = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.profilePic) {
      const parts = user.profilePic.split("/");
      const fileName = parts[parts.length - 1];
      const publicId = `profiles/${fileName.split(".")[0]}`;

      await cloudinary.uploader.destroy(publicId);
    }

    user.profilePic = "";
    await user.save();

    res.json({
      message: "Image deleted",
      profilePic: "",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};