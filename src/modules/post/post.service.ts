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





export const PostService = {
    createPost,
    getAllPost
}