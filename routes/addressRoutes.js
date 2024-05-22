import express from "express";
import addressControllers from "../controllers/addressControllers.js";

const router = express.Router();

router.get("/", addressControllers.list);
router.get("/:id", addressControllers.find);
router.post("/", addressControllers.create);
router.put("/:id", addressControllers.update);
router.delete("/:id", addressControllers.destroy);

export default router;
