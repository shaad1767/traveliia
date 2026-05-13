import Hotel from "../models/HotelModel.js";

// =====================
// GET All Hotels
// =====================
export const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =====================
// GET Single Hotel
// =====================
export const getHotelById = async (req, res) => {
  try {
        // console.log("ID:", req.params.id);
    const hotel = await Hotel.findById(req.params.id)
    .populate("owner", "username fullName email");

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =====================
// CREATE Hotel
// =====================
export const createHotel = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const imagePaths = req.files.map(file => file.path);

    const hotel = await Hotel.create({
      name: req.body.name,
      city: req.body.city,
      location: req.body.location,
      price: req.body.price,
      maxGuests: req.body.maxGuests,
      amenities: req.body.amenities?.split(","),
      description: req.body.description,
      images: imagePaths,
      owner: req.user._id
    });

    res.status(201).json({
      message: "Hotel created successfully",
      hotel
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating hotel" });
  }
};

// =====================
// UPDATE Hotel
// =====================
export const updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    // Owner check
    if (hotel.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Hotel updated successfully",
      hotel: updatedHotel
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =====================
// DELETE Hotel
// =====================
export const deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    // Owner check
    if (hotel.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Hotel.findByIdAndDelete(req.params.id);

    res.json({ message: "Hotel deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =====================
// GET My Hotels
// =====================
export const getMyHotels = async (req, res) => {
  try {
    // console.log("Route hit");
    // console.log("User:", req.user);


    const hotels = await Hotel.find({ owner: req.user._id });
    res.json(hotels);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// =====================
// GET Filtered Hotels
// =====================
export const getFilteredHotels = async (req, res) => {
  console.log("FILTER CONTROLLER HIT"); // Terminal check

  try {
    let { min, max } = req.query;

    console.log("Received query params:", min, max);

    // Force numbers
    min = min ? Number(min) : 0;
    max = max ? Number(max) : 1000000;

    if (isNaN(min) || isNaN(max)) {
      throw new Error("Min or Max is not a valid number");
    }

    const filter = { price: { $gte: min, $lte: max } };

    console.log("Mongo filter object:", filter);

    const hotels = await Hotel.find(filter);

    console.log("Returned hotels:", hotels.map(h => h.price));

    res.json(hotels);
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ message: error.message });
  } 
};

// =====================
// GET Filtered Hotels by city, dates, guests
// =====================
export const searchHotels = async (req, res) => {
  try {
    const { city, checkIn, checkOut, guests } = req.query;

    if (!city) {
      return res.status(400).json({ message: "City is required" });
    }

    // Convert guests to number
    const guestCount = guests ? Number(guests) : 1;

    // Mongo filter
    const filter = {
      city: { $regex: city, $options: "i" },
      maxGuests: { $gte: guestCount },
    };

    // If dates provided, filter hotels that could accept them
    // Since your schema doesn't have availability dates, we can skip or assume always available
    // You can enhance later if you add `availableFrom` and `availableTo` fields

    const hotels = await Hotel.find(filter);
    res.json(hotels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};