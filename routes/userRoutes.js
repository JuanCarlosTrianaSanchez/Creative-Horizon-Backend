import { expressjwt } from "express-jwt";

import express from "express";
import userControllers from "../controllers/userControllers.js";

const router = express.Router();

router.get("/", userControllers.list);
router.get("/:id", userControllers.find);
router.post("/", userControllers.create);
router.put("/:id", userControllers.update);
router.delete("/:id", userControllers.destroy);

router.post(
  "/api/users/profile",
  expressjwt({ algorithms: ["HS256"], secret: "secretPassword" }),
  userControllers.profile
);

export default router;
