import { Request, Response } from "express";
import { AuthService } from "./auth.service";




const loginWithEmailAndPassword = async(req: Request, res: Response)=>{
    try {
        const result = await AuthService.loginWithEmailAndPassword(req.body)
        res.status(200).json({
            success: true,
            message: "User login successfully",
            data:result
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: `Failed to login: ${error}`,
        })
    }       
}





export const AuthController = {
    loginWithEmailAndPassword

}