import express from "express";
import { login } from "../controllers/loginControllers.js"; // Ajusta la ruta según la estructura de tu proyecto

const router = express.Router();

// Ruta para el login de usuarios
router.post("/", login);

export default router;
