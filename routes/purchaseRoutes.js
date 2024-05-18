import express from "express";
import purchaseControllers from "../controllers/purchaseControllers.js";

const router = express.Router();

router.get("/", purchaseControllers.list);
router.post("/", purchaseControllers.create);

export default router;
