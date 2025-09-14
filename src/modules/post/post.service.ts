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


const getAllPosts = async({page =1, limit =10, search, isFeatured, tags }: {page?: number, limit?:number, search?:string, isFeatured?: boolean, tags?:string[]}) =>{

    console.log({isFeatured})
    console.log({tags})
    
    const skip = (page - 1) * limit;
    const where:any = {
           AND :[
            search && {
                 OR:[
                {title: {contains:search, mode: 'insensitive'}},
                {content: {contains:search, mode: 'insensitive'}},
            ]
            },
            typeof isFeatured === 'boolean' &&{isFeatured},
            tags && tags.length > 0 && {tags: {hasEvery:tags}}
           ].filter(Boolean)
        }
    const result = await prisma.post.findMany({
        skip,
        take: limit,
        where,
        include: {
            author: true
        },
        
        orderBy: { createdAt: 'desc' }
    })
    const total = await prisma.post.count({where})
    return {
        data: result,
        pagination:{
            page,
            limit,
            total,
            totalPages: Math.ceil(total/limit)
        }
    }
}
const getPostById = async(id:number) =>{
    return await prisma.$transaction(async(tx) =>{
await tx.post.update({
        where: {id},
        data: {
            views: { increment: 1 }
        },
    })
    const postData = await tx.post.findUnique({
        where: {id},
        
        select: {
            id: true,
            title: true,
            content: true,
            thumbnail: true,
            authorId: true,
            isFeatured: true,
            views: true,
            tags: true,
            createdAt: true,
            updatedAt: true,
        }
    })
    return postData
    })
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
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
}