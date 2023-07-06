import db from "../database/models/index.js";
const perm = db.permissions;

class PermissionsServices {
    static async postNewPermission(dto){
        const {permname, permdesc} = dto

        const newPerm = await db.permissions.findOne({
            where: {
                permname: permname
            }
        });
        if (newPerm) {
            throw new Error('Permissão já cadastrada');
        }
        try {
            const newPermCreator = await db.permissions.create({
                permname: permname,
                permdesc: permdesc,
                createdAt: new Date(),       
                updatedAt: new Date()
            });
            return newPermCreator;

        } catch (error) {
            throw new Error('Erro ao cadastrar permissão')
        }
    }

    static async getPermPage(){
        const perm = await db.permissions.findAll()
        return perm;
    }

    static async getRoleByID(id) {
        const perm = await db.permissions.findOne({
            where:{
                id: id
            }
        })
        if(!perm){
            throw new Error('Permissão não encontrada')
        }
        return perm;
    }

    static async updatePermission(dto, id){
        const {permname, permdesc} = dto
        const perm = await db.permissions.findOne({
            where:{
                id: id
            }
        });
        if (!perm){
            throw new Error('Permissão não encontrada');
        }
        try {
            perm.permname = permname;
            perm.permdesc = permdesc;
            await perm.save();
            return perm;
        } catch (error) {
            throw new Error('Erro ao atualizar permissão');
        }
    }

    static async deletePermission(id) {
        const perm = await db.permissions.findOne({
            where:{
                id: id
            }
        });
        if (!perm){
            throw new Error('Permissão não encontrado');
        }
        try {
            const deleteperm = await perm.destroy();
            return deleteperm;
        } catch (error) {
            throw new Error('Erro ao deletar permissão');
        }
    }
}

export default PermissionsServices;