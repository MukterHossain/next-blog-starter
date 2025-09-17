import { Prisma, User } from "@prisma/client"
import { prisma } from "../../config/db"

const createUser = async(payload: Prisma.UserCreateInput): Promise<User>=>{
    const createdUser = await prisma.user.create({
        data: payload
    })
    
    return createdUser
}


const getAllUsers = async() =>{
    const result = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            picture: true,
            createdAt: true,
            updatedAt: true,
            role: true,
            status:true,
            Posts: true
        },
        orderBy: { createdAt: 'desc' }
    })
    return result
}

const getUserById = async(id: number) =>{
    const result = await prisma.user.findUnique({
        where: {id},
        omit:{
            password:true,
            isVerified:true
        }
        // select: {
        //     id: true,
        //     name: true,
        //     email: true,
        //     picture: true,
        //     createdAt: true,
        //     updatedAt: true,
        //     role: true,
        //     status:true,
        //     Posts: true
        // },
    })
    return result
}
const updateUser = async(id: number, payload: Prisma.UserCreateInput): Promise<User> =>{
    const {name, email, picture, role, status} = payload
    const result = await prisma.user.update({
        where: {id},
        data:{
            name, email, picture, role, status
        }
    })
    return result
}
const deleteUser = async(id: number) =>{
    await prisma.user.delete({
        where: {id}
    })
    return null
}




export const UserService = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}