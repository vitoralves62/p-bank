import pkg from 'jsonwebtoken';
const { verify } = pkg;
import jsonSecret from "../config/jsonSecret.js";

export default async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).send('Access token não informado!');
    }

    const [, accessToken] = token.split(" ");

    try {
        const decodedToken = verify(accessToken, jsonSecret.secret);

        const { email, senha, id } = decodedToken; 
        req.email = email;
        req.senha = senha;
        req.id = id; // Definir o id do usuário no objeto "req"

        return next();

    } catch (error) {
        res.status(401).send('Usuário não autorizado!');
        console.log(error);
    }
};
