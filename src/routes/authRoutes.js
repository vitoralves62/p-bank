import { Router } from "express";
import AuthController from "../controllers/authController.js";

const authRoutes = Router();

authRoutes
    .post('/api/login', AuthController.login)

export default authRoutes;
