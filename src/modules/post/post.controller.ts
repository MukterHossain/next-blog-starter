import { Request, Response } from "express";
import { PostService } from "./post.service";



const createPost = async(req: Request, res: Response)=>{
    try {
        const result = await PostService.createPost(req.body)
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data:result
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: `Failed to create post: ${error}`,
        })
    }       
}
const getAllPost = async(req: Request, res: Response)=>{
    try {
        const result = await PostService.getAllPost()
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




export const PostController = {
    createPost,
    getAllPost

}