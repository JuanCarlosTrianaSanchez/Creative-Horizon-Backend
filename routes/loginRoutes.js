import express from "express";
import loginControllers from "../controllers/loginControllers.js";

const router = express.Router();

router.get("/", loginControllers.list);
router.post("/login", loginControllers.login);

export default router;
