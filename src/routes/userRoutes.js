import express from "express";
import UsersController from "../controllers/UsersController.js"
import authenticated from "../middleware/authenticated.js";

const userRoutes = express.Router()

userRoutes.use(authenticated)

userRoutes
    .get('/home', UsersController.getUserPage)
    .get('/home/:id', UsersController.getUserByID)
    .post('/admin', UsersController.postUser)
    .put('/admin/:id/edit', UsersController.putUser)
    .delete('/admin/delete/:id', UsersController.deleteUser)


export default userRoutes;