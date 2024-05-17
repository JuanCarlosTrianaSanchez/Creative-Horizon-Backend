import express from "express";
import categoryControllers from "../controllers/categoryControllers.js";

const router = express.Router();

router.get("/", categoryControllers.list);

export default router;
