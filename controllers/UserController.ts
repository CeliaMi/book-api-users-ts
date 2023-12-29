import { Request, Response } from "express";
import userModel from "../models/UserModel";

const UserController = {
    async getUsers(_req : Request  , res : Response ){
        const users = await userModel.getUsers();
        return res.json(users)
    },
    async getUser(req : Request, res : Response){
        const userId = req.params.id
        const user = await userModel.getUsers(userId);
        return res.json(user)
    },

    async createUser(req : Request, res : Response){
        const bodyData = req.body
        const result = await userModel.createUser(bodyData);
        return res.json(result);
    },
    async updateUser(req : Request, res : Response){
        const userId = req.params.id
        const bodyData = req.body
        const result = await userModel.updateUser(userId, bodyData);
        return res.json(result)
    },
    async deleteUser(req : Request, res : Response){
        const userId = req.params.id
        const result = await userModel.deleteUser(userId);
        return res.json(result)
    },
}

export default UserController