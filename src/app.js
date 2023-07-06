import express from "express";
import db from "./database/models/index.js";
import configRoutes from "./routes/index.js";
import routes from "./routes/userRoutes.js";

const app = express();

app.use(express.json());

app.use(
    configRoutes,
    routes
    );

export default app;