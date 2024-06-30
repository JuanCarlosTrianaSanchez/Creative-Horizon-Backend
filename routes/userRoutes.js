/* import express from "express";
import { expressjwt } from "express-jwt";
import userControllers from "../controllers/userControllers.js";

const router = express.Router();

router.get("/", userControllers.list);
router.get("/:id", userControllers.find);
router.post("/", userControllers.create);
router.put("/:id", userControllers.update);
router.delete("/:id", userControllers.destroy);
router.post("/register", userControllers.register);

router.post(
  "/api/user/profile",
  expressjwt({ algorithms: ["HS256"], secret: process.env.JWT_SECRET }),
  userControllers.profile
);

export default router;
 */
import express from "express";
import { expressjwt } from "express-jwt";
import userControllers from "../controllers/userControllers.js";

const router = express.Router();

router.get("/", userControllers.list);
router.get("/:id", userControllers.find);
// Elimina la siguiente línea porque vamos a usar register para crear usuarios
// router.post("/", userControllers.create);
router.put("/:id", userControllers.update);
router.delete("/:id", userControllers.destroy);
router.post("/register", userControllers.register);

router.post(
  "/profile",
  expressjwt({ algorithms: ["HS256"], secret: process.env.JWT_SECRET }),
  userControllers.profile
);

export default router;
