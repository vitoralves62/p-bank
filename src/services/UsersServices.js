import db from "../database/models/index.js";
const Users = db.Users;
import pkg from 'bcryptjs';
const { hash } = pkg;
import { UUID, UUIDV4 } from "sequelize";
import { v4 as uuidv4 } from 'uuid';
import UserDTO from "../DTOs/userDTO.js";
import UsersController from "../controllers/UsersController.js";

class UsersService {

    static async getUserPage(){
        const user = await db.Users.findAll({
            include: [
                {
                    model: db.roles,
                    as: 'roleS_for_users',
                    attributes: ['id', 'rolename', 'roledec'],
                    through: {
                        attributes: [],
                    }
                },
                {
                    model: db.permissions,
                    as: 'permissions_for_users',
                    attributes: ['id', 'permname', 'permdesc'],
                    through: {
                        attributes: []
                    }
                }
            ]
        })
        return user;
    }
    
    static async getUserByID(id) {
        const user = await db.Users.findOne({
            include: [
                {
                    model: db.roles,
                    as: 'roleS_for_users',
                    attributes: ['id', 'rolename', 'roledec'],
                    through: {
                        attributes: [],
                    }
                },
                {
                    model: db.permissions,
                    as: 'permissions_for_users',
                    attributes: ['id', 'permname', 'permdesc'],
                    through: {
                        attributes: []
                    }
                }
            ],
            where:{
                id: id
            }
        })
        if(!user){
            throw new Error('Usuário não encontrado')
        }
        return user;
    }

    static async postNewUser(dto){
        const {name, status, email, password} = dto;
        const newUser = await db.Users.findOne({
           where: {
               email: email
            }
        });
        if(newUser){
            throw new Error('Usuário já existente')
        }
            try{
                const passHash = await hash(password, 8)
                
                const newUserCreator = await db.Users.create({
                    
                    name: name,
                    status: status,
                    email: email,
                    password: passHash,
                    createdAt: new Date(),       
                    updatedAt: new Date()
                });
                return newUserCreator;
        
            } catch (error) {
                throw new Error('Falha ao criar usuário')
                console.log(error)
            }
    }

    static async updateUser(dto, id) {
        const { name, status, email, password } = dto;
    
        const user = await db.Users.findOne({
            where: {
                id: id
            }
        });
    
        if (!user) {
            throw new Error('Usuário não encontrado');
        }
    
        try {
            const passHash = await hash(password, 8);
    
            user.name = name;
            user.email = email;
            user.status = status;
            user.password = passHash;
    
            await user.save();
    
            return user;
    
        } catch (error) {
            throw new Error('Erro ao atualizar usuário');
        }
    }
    
    static async deleteUser(id) {
    
        const user = await db.Users.findOne({
            where: {
                id: id
            }
        });
    
        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        try {
            const deleteUser = await user.destroy();
            return deleteUser;
        } catch (error) {
            throw new Error('Erro ao atualizar usuário');
        }
    }

}

export default UsersService;