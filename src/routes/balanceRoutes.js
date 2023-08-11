import express from "express";
import BalanceController from "../controllers/balanceController.js";

const BalanceRoutes = express.Router();

BalanceRoutes
    .post('/balance/post', BalanceController.postBalance)
    .get('/balance/:id', BalanceController.getBalanceByID)

export default BalanceRoutes;