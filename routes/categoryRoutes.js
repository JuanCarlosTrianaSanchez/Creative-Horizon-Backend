import express from "express";
import categoryControllers from "../controllers/categoryControllers.js";

const router = express.Router();

router.get("/", categoryControllers.list);
router.get("/:id", categoryControllers.find);
router.post("/", categoryControllers.create);
router.put("/:id", categoryControllers.update);

export default router;
