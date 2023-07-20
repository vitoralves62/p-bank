import AuthService from "../services/authServices.js";

const authServices = new AuthService;

class AuthController {
    static async login(req,res) {
        const {email, password} = req.body
        
        try {
            const login = await authServices.login({email, password})

            res.status(200).send(login)
        } catch (error) {
            console.log(error);
            res.status(401).send({message: error.message})
        }
    }
}

export default AuthController;