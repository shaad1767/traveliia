import express from "express";
import { createOrder, verifyPayment } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-order", createOrder);
// router.get("/create-order", (req, res) => {
//   res.send("GET working");
// });
router.post("/verify", verifyPayment);

export default router;