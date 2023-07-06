import express from 'express';
import RolesController from "../controllers/rolesController.js";

const rolesRoutes = express.Router();

rolesRoutes
    .post('/admin/roles', RolesController.postRole)
    .get('/roles', RolesController.getAllRoles)
    .get('/role/:id', RolesController.getRoleByID)
    .delete('/admin/:id', RolesController.deleteRole)
    .put('/admin/role/:id', RolesController.updateRole)

export default rolesRoutes;