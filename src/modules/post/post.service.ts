import { Post, Prisma } from "@prisma/client"
import { prisma } from "../../config/db"

const createPost = async(payload: Prisma.PostCreateInput): Promise<Post>=>{
    const createdUser = await prisma.post.create({
        data: payload,
        include: { author: {
            select: {
                id: true,
                name: true,
                email: true,
            }
        } }
    })
    
    return createdUser
    
}


const getAllPost = async() =>{
    const result = await prisma.post.findMany({
        select: {
            id: true,
            title: true,
            content: true,
            thumbnail: true,
            authorId: true,
            isFeatured: true,
            tags: true,
            createdAt: true,
            updatedAt: true,
        },
        orderBy: { id: 'desc' }
    })
    return result
}
const getPostById = async(id:number) =>{
    const result = await prisma.post.findUnique({
        where: {id},
        select: {
            id: true,
            title: true,
            content: true,
            thumbnail: true,
            authorId: true,
            isFeatured: true,
            tags: true,
            createdAt: true,
            updatedAt: true,
        }
    })
    return result
}
const updatePost = async(id:number, payload: Prisma.PostCreateInput): Promise<Post>=>{
    const {title, content, thumbnail, author, isFeatured, tags} = payload
    const result = await prisma.post.update({
        where: {id},
        data:{
            title, content, thumbnail, isFeatured, tags, author
        }
    }, )
    return result
}
const deletePost = async(id:number) =>{
    const result = await prisma.post.delete({
        where: {id}
        
    })
    return null
}





export const PostService = {
    createPost,
    getAllPost,
    getPostById,
    updatePost,
    deletePost
}