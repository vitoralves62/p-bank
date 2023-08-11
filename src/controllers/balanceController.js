import BalanceDTO from "../DTOs/balanceDTO.js";
import balanceService from "../services/balanceService.js"

class BalanceController{
    static postBalance = async (req,res) => {
        const {value, user_id} = req.body;
        try {
            const balanceDTO = new BalanceDTO(value, user_id);
            const newBalance = await balanceService.postNewBalance(balanceDTO);
            res.status(201).send(newBalance);
        } catch (error) {
            res.status(400).send({message: error.message})
            console.log(error)
        }
    }

    static getBalanceByID = async (req, res) => {
        try {
            const id = req.params.id;
            const balance = await balanceService.getBalanceByID(id);
            res.status(200).json(balance);
        } catch (error) {
            res.status(400).send({message: error.message})
            console.log(error)
        }
    }
}

export default BalanceController;