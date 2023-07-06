import db from "../database/models/index.js";
import PermissionsDTO from "../services/permissionsDTO.js";
import PermissionsServices from "../services/permissionsServices.js";
const perm = db.permissions;

class PermissionsController {
    static postPerm = async (req, res) => {
        const {permname, permdesc} = req.body;
        try {
            const PermDTO = new PermissionsDTO(permname, permdesc)
            const newPerm = await PermissionsServices.postNewPermission(PermDTO)
            res.status(201).send(newPerm)
        } catch (error) {
            res.status(400).send({message: error.message})
            console.log(error)
        }
    }

    static getAllPerms = async (req, res) => {
        try {
            const perm = await PermissionsServices.getPermPage()
            res.status(200).send(perm)
        } catch (error) {
            throw new Error('Falha ao buscar cargos')
        }
    }

    static getPermByID = async (req, res) => {
        try {
            const id = req.params.id
            const perm = await PermissionsServices.getRoleByID(id)
            res.status(200).send(perm)
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static updatePermission = async (req, res) => {
        const id = req.params.id
        const {permname, permdesc} = req.body;
        try {
            const permDTO = new PermissionsDTO(permname, permdesc);
            const updateperm = await PermissionsServices.updatePermission(permDTO, id)
            res.status(200).send(updateperm);
        } catch (error) {
            res.status(400).send({message: error.message});
            console.log(error)
        }
    }

    static deletePermission = async (req, res) => {
        const id = req.params.id;
        try {
            await PermissionsServices.deletePermission(id);
            res.status(200).send('Permissão deletada!')
        } catch (error) {
            res.status(400).send({message: error.message});
            console.log(error);
        }
    }
}

export default PermissionsController;