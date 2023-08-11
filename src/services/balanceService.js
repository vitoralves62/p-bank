import db from "../database/models/index.js";

class balanceService {
    static async postNewBalance(dto){
        const {value, user_id} = dto;
        try {
            const newBalanceCreator = await db.balance.create({
                value: value,
                user_id: user_id,
                createdAt: new Date(),       
                updatedAt: new Date()
            })
            return newBalanceCreator;
        } catch (error) {
            throw new Error('Erro ao cadastrar saldo')
        }
    }
    static async getBalanceByID (id){
        const balance = await db.balance.findOne({
            where: {
                id:id
            }
        })
        if(!balance){
            throw new Error("Saldo não encontrado")
        }
        return balance;
    }
}

export default balanceService;