import db from "../database/models/index.js";
import pkg from 'bcryptjs';
const { compare } = pkg;
import pkg2 from 'jsonwebtoken';
const { sign } = pkg2;
const Users = db.Users;
import dotenv from 'dotenv';

dotenv.config();

class AuthService {
    
    async login(dto){
        const {email, password} = dto;
        const user = await db.Users.findOne({
            attributes: ['id', 'email', 'password'],
            where: {
                email: email
            }
        })
        console.log(user)
        if(!user){
            throw new Error('Usuário ou senha inválidos')
        }
        const samePasswords = await compare(password, user.password)
        if(!samePasswords){
            throw new Error('Usuário ou senha inválido')
        }

        const accessToken = this.generateAccessToken(user.id, user.email);
        return { accessToken }
    }

    generateAccessToken(id, email) {
        const secret = process.env.SECRET;
        return sign({ id, email }, secret, {
            expiresIn: 84600
        });
    }
}

export default AuthService;
