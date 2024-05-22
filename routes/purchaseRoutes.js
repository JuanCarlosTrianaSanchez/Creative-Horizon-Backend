import express from "express";
import purchaseControllers from "../controllers/purchaseControllers.js";

const router = express.Router();

router.get("/", purchaseControllers.list);
router.get("/:id", purchaseControllers.find);
router.post("/", purchaseControllers.create);
router.put("/:id", purchaseControllers.update);
router.delete("/:id", purchaseControllers.destroy);

export default router;
