import express from 'express';
import PermissionsController from '../controllers/permissionsController.js';

const permissionsRoutes = express.Router();

permissionsRoutes
    .post('/admin/permissions', PermissionsController.postPerm )
    .get('/permissions', PermissionsController.getAllPerms )
    .get('/permissions/:id', PermissionsController.getPermByID )
    .delete('/permissions/admin/:id', PermissionsController.deletePermission)
    .put('/admin/permissions/:id', PermissionsController.updatePermission)

export default permissionsRoutes;