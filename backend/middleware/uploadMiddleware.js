import multer from "multer";

import pkg from 'multer-storage-cloudinary';
const CloudinaryStorage = pkg.CloudinaryStorage || pkg.default?.CloudinaryStorage || pkg;import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "travelia_hotels",
    allowed_formats: ["jpg", "png", "jpeg"],
    
  },
});

const upload = multer({ storage });

export default upload;