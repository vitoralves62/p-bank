import express from "express";
import UsersController from "../controllers/UsersController.js"

const firstUserRoutes = express.Router();

firstUserRoutes
    .post('/admin', UsersController.postUser)

export default firstUserRoutes;
