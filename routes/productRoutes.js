import express from "express";
import productControllers from "../controllers/productControllers.js";

const router = express.Router();

router.get("/", productControllers.list);
router.get("/search", productControllers.search);
router.get("/:id", productControllers.find);
router.post("/", productControllers.create);
router.put("/:id", productControllers.update);
router.delete("/:id", productControllers.destroy);

export default router;
