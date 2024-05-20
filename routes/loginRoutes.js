import express, { Router } from "express";
import loginControllers from "../controllers/loginControllers.js";

const router = express.Router();

Router.get("/", loginControllers.lis);

export default router;
