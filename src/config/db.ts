
import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient()


// omit by globaly used
// export const prisma = new PrismaClient({
//     omit:{
//         user: {
//             password:true,
//             isVerified:true
//         }
//     }
// })