import { Request, Response } from "express";
import { UserService } from "./user.service";


const createUser = async(req: Request, res: Response)=>{
    try {
        const result = await UserService.createUser(req.body)
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data:result
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: `Failed to create user: ${error}`,
        })
    }       
}
const getAllUsers = async(req: Request, res: Response)=>{
    try {
        const result = await UserService.getAllUsers()
         res.status(201).json({
            success: true,
            message: "User data retrive successfully",
            data:result
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: `Failed to retrive data: ${error}`,
        })
    }       
}
const getUserById = async(req: Request, res: Response)=>{
    try {
        const result = await UserService.getUserById(Number(req.params.id))
         res.status(201).json({
            success: true,
            message: "User data retrive successfully",
            data:result
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: `Failed to retrive data: ${error}`,
        })
    }       
}



export const UserController = {
    createUser,
    getAllUsers,
    getUserById
}