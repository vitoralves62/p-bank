import pkg from 'jsonwebtoken';
const { verify } = pkg;
import dotenv from 'dotenv';

dotenv.config();

export default async (req, res, next) => {
    const secret = process.env.SECRET;
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).send('Access token não informado!');
    }

    const [, accessToken] = token.split(" ");

    try {
        const decodedToken = verify(accessToken, secret);

        const { email, id } = decodedToken; 
        req.email = email;
        req.id = id;

        return next();

    } catch (error) {
        res.status(401).send('Usuário não autorizado!');
        console.log(error);
    }
};
