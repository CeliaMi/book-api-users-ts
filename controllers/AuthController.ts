import { encrypt, compare } from "../utils/handlePassword";
import userModel from "../models/UserModel";
//import { tokenSign } from "../utils/handleJwt.js";
import { handleHttpError } from "../utils/handleError";
import { Request, Response } from "express";
import { tokenSign, } from "../utils/handlejwt";



export const registerController =  async(req:Request, res:Response): Promise<Response | void> =>{
    try{
    const data = req.body
    const newPassword = data.password
    const passwordHash = await encrypt(newPassword)
    const newUser = {...data, password: passwordHash}
    console.log(newUser) 
    const dataUser = await userModel.create(newUser)
    //esta línea evita que se vea expuesto el hash de la contraseña👇
    //dataUser.set('password', undefined, { strict:false})

     const sesiondata = {
        token: await tokenSign(dataUser),
        user:dataUser
     }
    res.send({sesiondata})
    } catch(error){
        handleHttpError(res, "ERROR_REGISTER_USER")
    }
} 

 export const loginController = async(req:Request, res:Response): Promise<Response | void> =>{
    try{
        //req = matchedData(req);
        const userEmail = req.body.email
        const loginPassword = req.body.password
        console.log(userEmail)
        const user :any  = await userModel.findOne ({where: {email: userEmail}});
        if(!user){
            handleHttpError(res, "USER_NOT_EXISTS", 404)
        }

        const hashPassword : string = user.password;
        console.log(hashPassword)
        const check = await compare(loginPassword, hashPassword)

        if(!check){
            handleHttpError(res, "PASSWORD_INVALID", 401)
        }
        //user.set('password', undefined, {strict:false})

        const sesiondata = {
            token: await tokenSign(user),
            user:user
         }
        res.send({sesiondata})

    }catch(error){
        console.log(error)
        handleHttpError(res, "ERROR_LOGIN_USER")
    }

}
