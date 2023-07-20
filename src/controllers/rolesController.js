import express from "express";  
import db from "../database/models/index.js";
import RolesService from "../services/rolesServices.js";
import RolesDTO from "../DTOs/rolesDTO.js";
const Role = db.roles;


class RolesController {
    static postRole = async (req, res) => {
        const {rolename, roledec} = req.body;
        try {
            const roleDTO = new RolesDTO(rolename, roledec)
            const newRole = await RolesService.postNewRole(roleDTO)
            res.status(201).send(newRole)
        } catch (error) {
            res.status(400).send({message: error.message})
            console.log(error)
        }
    }

    static getAllRoles = async (req, res) => {
        try {
            const roles = await RolesService.getRolePage()
            res.status(200).send(roles)
        } catch (error) {
            throw new Error('Falha ao buscar cargos')
        }
    }

    static getRoleByID = async (req, res) => {
        try {
            const id = req.params.id
            const roles = await RolesService.getRoleByID(id)
            res.status(200).send(roles)
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static updateRole = async (req, res) => {
        const id = req.params.id
        const {rolename, roledec} = req.body;
        try {
            const roleDTO = new RolesDTO(rolename, roledec);
            const updaterole = await RolesService.updateRole(roleDTO, id)
            res.status(200).send(updaterole);
        } catch (error) {
            res.status(400).send({message: error.message});
            console.log(error)
        }
    }

    static deleteRole = async (req, res) => {
        const id = req.params.id;
        try {
            await RolesService.deleteRole(id);
            res.status(200).send('Cargo deletado!')
        } catch (error) {
            res.status(400).send({message: error.message});
            console.log(error);
        }
    }
}

export default RolesController;