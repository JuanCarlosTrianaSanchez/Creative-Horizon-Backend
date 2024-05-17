import express from "express";
import userControllers from "../controllers/userControllers.js";

const router = express.Router();

router.get("/", userControllers.list);
router.get("/:id", userControllers.find);
router.post("/", userControllers.create);
router.put("/:id", userControllers.update);
router.delete("/:id", userControllers.destroy);

export default router;
