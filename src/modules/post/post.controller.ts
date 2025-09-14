import { Request, Response } from "express";
import { PostService } from "./post.service";



const createPost = async(req: Request, res: Response)=>{
    try {
        const result = await PostService.createPost(req.body)
        res.status(201).json({
            success: true,
            message: "Post created successfully",
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
            message: "Post data retrive successfully",
            data:result
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: `Failed to retrive post data: ${error}`,
        })
    }       
}
const getPostById = async(req: Request, res: Response)=>{
    try {
        const result = await PostService.getPostById(Number(req.params.id))
         res.status(201).json({
            success: true,
            message: "Post data retrive successfully",
            data:result
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: `Failed to retrive post data: ${error}`,
        })
    }       
}
const updatePost = async(req: Request, res: Response)=>{
    try {
        const { title, content, thumbnail, author, isFeatured, tags } = req.body;
        const result = await PostService.updatePost(Number(req.params.id), { title, content, thumbnail, author, isFeatured, tags })
         res.status(201).json({
            success: true,
            message: "Post data update successfully",
            data:result
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: `Failed to update post data: ${error}`,
        })
    }       
}
const deletePost = async(req: Request, res: Response)=>{
    try {
        const result = await PostService.deletePost(Number(req.params.id))
         res.status(201).json({
            success: true,
            message: "Post delete successfully",
            data:result
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: `Failed to delete post data: ${error}`,
        })
    }       
}




export const PostController = {
    createPost,
    getAllPost,
    getPostById,
    updatePost,
    deletePost

}