import express from "express";
import Sequelize from 'sequelize';
import UsersService from "../services/UsersServices.js";
import db from "../database/models/index.js";
import UserDTO from "../DTOs/userDTO.js";
const Users = db.Users;

class UsersController {
    static getUserPage = async (req, res) => {
        try {
            const users = await UsersService.getUserPage()
            res.status(200).send(users)
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static getUserByID = async (req, res) => {
        try{
            const id = req.params.id
            const user = await UsersService.getUserByID(id)
            res.status(200).send(user);
        }
        catch(error) {
            res.status(400).send({ message: error.message });
            };
    }

    static postUser = async (req,res) => {
        const { name, status, email, senha } = req.body
        try {
            const userDTO = new UserDTO(name, status, email, senha) 
            const newUser = await UsersService.postNewUser(userDTO)
            
            res.status(201).send(newUser)
            
        } catch (error) {
            res.status(400).send({message: error.message})
            console.log(error)
        }
    }

    static putUser = async (req, res) => {
        const id = req.params.id
        const { name, status, email, password } = req.body;
    
        try {
            const userDTO = new UserDTO(name, status, email, password);
            const updatedUser = await UsersService.updateUser(userDTO, id);
    
            res.status(200).send(updatedUser);
        } catch (error) {
            res.status(400).send({ message: error.message });
            console.log(error);
        }
    }

    static deleteUser = async (req, res) => {
        const id = req.params.id;
        try {
            await UsersService.deleteUser(id)
            res.status(200).send("Usuário deletado!")
        } catch (error) {
            res.status(400).send({ message: error.message });
            console.log(error);
        }
    }
    
}

export default UsersController;
