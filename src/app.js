import express from "express";
import db from "./database/models/index.js";
import configRoutes from "./routes/index.js";
import routes from "./routes/userRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200, 
  };

app.use(cors(corsOptions));

app.use(
    configRoutes,
    routes
    );

export default app;