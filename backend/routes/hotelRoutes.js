import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";
import { createHotel, 
         getAllHotels, 
         getHotelById,       
         updateHotel, 
         deleteHotel ,
         getMyHotels,
         getFilteredHotels,
         searchHotels
         }
        from "../controllers/hotelController.js";

const router = express.Router();


// Price filter route
router.get("/filter", getFilteredHotels);





//create hotel
router.post("/create", protect, upload.array("images", 5), createHotel);

//my hotels
router.get("/myhotels", protect, getMyHotels);

// Search route
router.get("/search", searchHotels);

//single hotel
router.get("/:id", getHotelById);

//update a hotel
router.put("/:id", protect, updateHotel);
//delete hotel
router.delete("/:id", protect, deleteHotel);

//all hotels
router.get("/", getAllHotels);


export default router;