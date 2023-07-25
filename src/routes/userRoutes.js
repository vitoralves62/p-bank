import express from "express";
import UsersController from "../controllers/UsersController.js"
import authenticated from "../middleware/authenticated.js";
import roles from "../middleware/roles.js";
import permissions from "../middleware/permissions.js";

const userRoutes = express.Router();

userRoutes.use(authenticated);

userRoutes
    .get('/home', roles(["Administrador"]), UsersController.getUserPage)
    .get('/home/:id', roles(["Administrador"]), UsersController.getUserByID)
    .post('/admin', roles(["Administrador"]), UsersController.postUser)
    .put('/admin/:id/edit', roles(["Administrador"]), UsersController.putUser)
    .delete('/admin/delete/:id', roles(["Administrador"]), UsersController.deleteUser)

export default userRoutes;
