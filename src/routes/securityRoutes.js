import express, { Router } from "express";
import securityController from "../controllers/securityController.js";

const securityRoutes = Router();

securityRoutes
    .post('/security/acl/:id', securityController.postACL)
    .post('/security/perms-roles', securityController.postPermsRoles)

export default securityRoutes;