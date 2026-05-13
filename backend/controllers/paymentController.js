import Razorpay from "razorpay";
import crypto from "crypto";
import Booking from "../models/Booking.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// ✅ Create Order
export const createOrder = async (req, res) => {
  try {
    console.log(req.body);
    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    });

    res.json( {amount: order.amount, id: order.id});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      hotelId,
      checkIn,
      checkOut,
      price,
      userId,
    } = req.body;

    // Signature check
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    if (expected === razorpay_signature) {
      const booking = await Booking.create({
        hotelId,
        checkIn,
        checkOut,
        price,
        userId,
        paymentId: razorpay_payment_id,
      });
      console.log("✅ Booking saved:", booking);
      return res.status(200).json({ success: true, booking });
    } else {
      console.warn("⚠️ Signature mismatch!");
      return res.status(401).json({ success: false, error: "Invalid signature" });
    }
  } catch (err) {
    console.error("❌ verifyPayment error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
};