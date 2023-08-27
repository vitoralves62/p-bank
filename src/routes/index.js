import express from "express";
import userRoutes from "./userRoutes.js";
import app from "../app.js";
import authRoutes from "./authRoutes.js";
import rolesRoutes from "./roleRotes.js";
import permissionsRoutes from "./permissionsRoutes.js";
import securityRoutes from "./securityRoutes.js";
import BalanceRoutes from "./balanceRoutes.js";
import firstUserRoutes from "./firstUserRoute.js";

const configRoutes = express.Router()
    configRoutes.get('/', (req, res) => {
        res.status(200).send('Welcome to P-Bank!');
    });
    configRoutes.use(
       express.json(),
       firstUserRoutes,
       authRoutes,
       userRoutes,
       BalanceRoutes,
       rolesRoutes,
       permissionsRoutes,
       securityRoutes
       
    )
;

export default configRoutes;
