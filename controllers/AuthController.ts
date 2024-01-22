import { encrypt, compare } from "../utils/handlePassword";
import userModel from "../models/UserModel";
import { handleHttpError } from "../utils/handleError";
import { Request, Response } from "express";
import { tokenSign, } from "../utils/handlejwt";
import {sesionData, newUser, UserAttributes} from  "../interfaces/userInterface"
import { Model } from "sequelize";



export const registerController =  async(req:Request, res:Response): Promise<Response | void> =>{
    try{
    const data = req.body
    const newPassword = data.password
    const passwordHash = await encrypt(newPassword)
    const newUser : newUser = {...data, password: passwordHash}
    console.log(newUser) 
    const dataUser: Model<UserAttributes> = await userModel.create(newUser)

    ///💥ATENCION HE DEJADO AQUÍ UN MALDITO ANY PERO ESTO ME SUPERAAAA AAAAAHHHHH!!!!
    //TE ODIOOOOOOOOO
    //  dataUser.set('password', undefined, { strict:false})
        const sesiondata : sesionData = {
           token: await tokenSign(dataUser),
           user:dataUser
        }

    res.send({sesiondata})
        
    } catch(error){
        console.log(error)
        handleHttpError(res, "ERROR_REGISTER_USER")
    }
} 

 export const loginController = async(req:Request, res:Response): Promise<Response | void> =>{
    try{
        //req = matchedData(req);
        const userEmail : string = req.body.email
        const loginPassword : string = req.body.password
        const user : any = await userModel.findOne ({where: {email: userEmail}});
        //💥OTRO ANY POR AQUÍII
        if(user === null){
            handleHttpError(res, "USER_NOT_EXISTS", 404)
        }

        const hashPassword : string = user.password;
        const check = await compare(loginPassword, hashPassword)

        if(!check){
            handleHttpError(res, "PASSWORD_INVALID", 401)
        }
        user.set('password', undefined, {strict:false})

        const sesiondata : sesionData = {
            token: await tokenSign(user),
            user:user
         }
        res.send({sesiondata})

    }catch(error){
        console.log(error)
        handleHttpError(res, "ERROR_LOGIN_USER")
    }

}

