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
const getAllPosts = async(req: Request, res: Response)=>{
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = (req.query.search as string)|| "";
        const isFeatured = req.query.isFeatured ? req.query.isFeatured  === 'true'  : undefined;
        const tags = req.query.tags ? (req.query.tags as string).split(",") : []

        const result = await PostService.getAllPosts({page, limit, search, isFeatured, tags})
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
    getAllPosts,
    getPostById,
    updatePost,
    deletePost

}