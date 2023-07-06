import db from "../database/models/index.js";
import pkg from 'bcryptjs';
const { compare } = pkg;
import pkg2 from 'jsonwebtoken';
const { sign } = pkg2;
import jsonSecret from "../config/jsonSecret.js";
const Users = db.Users;

class AuthService {
    async login(dto){
        const {id, name, status, email, password} = dto;
        const user = await db.Users.findOne({
            attributes: ['id', 'email', 'password'],
            where: {
                email: email
            }
        })
        if(!user){
            throw new Error('Usuário ou senha inválidos')
        }
        const samePasswords = await compare(password, user.password)
        if(!samePasswords){
            throw new Error('Usuário ou senha inválido')
        }

        const accessToken = sign({
            id: user.id,
            email: user.email
        }, jsonSecret.secret, {
            expiresIn: 86400
        })
        return { accessToken }
    }
}

export default AuthService;