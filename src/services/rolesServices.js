import db from "../database/models/index.js";
const roles = db.roles;

class RolesService {
    static async postNewRole(dto){
        const {rolename, roledec} = dto

        const newRole = await db.roles.findOne({
            where: {
                rolename: rolename
            }
        });
        if (newRole) {
            throw new Error('Cargo já cadastrada');
        }
        try {
            const newRoleCreator = await db.roles.create({
                rolename: rolename,
                roledec: roledec,
                createdAt: new Date(),       
                updatedAt: new Date()
            });
            return newRoleCreator;

        } catch (error) {
            throw new Error('Erro ao cadastrar cargo')
        }
    }

    static async getRolePage(){
        const role = await db.roles.findAll()
        return role;
    }

    static async getRoleByID(id) {
        const role = await db.roles.findOne({
            where:{
                id: id
            }
        })
        if(!role){
            throw new Error('Cargo não encontrado')
        }
        return role;
    }

    static async updateRole(dto, id){
        const {rolename, roledec} = dto
        const role = await db.roles.findOne({
            where:{
                id: id
            }
        });
        if (!role){
            throw new Error('Cargo não encontrado');
        }
        try {
            role.rolename = rolename;
            role.roledec = roledec;
            await role.save();
            return role;
        } catch (error) {
            throw new Error('Erro ao atualizar cargo');
        }
    }

    static async deleteRole(id) {
        const role = await db.roles.findOne({
            where:{
                id: id
            }
        });
        if (!role){
            throw new Error('Cargo não encontrado');
        }
        try {
            const deleterole = await role.destroy();
            return deleterole;
        } catch (error) {
            throw new Error('Erro ao deletar cargo');
        }
    }

}

export default RolesService;
