import express from "express";
import { expressjwt } from "express-jwt";
import userControllers from "../controllers/userControllers.js";

const router = express.Router();

router.get("/", userControllers.list);
router.get("/:id", userControllers.find);
router.put("/:id", userControllers.update);
router.delete("/:id", userControllers.destroy);
router.post("/register", userControllers.register);

router.post(
  "/profile",
  expressjwt({ algorithms: ["HS256"], secret: process.env.JWT_SECRET }),
  userControllers.profile
);

export default router;
