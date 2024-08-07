import prisma from "@repo/db/client"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
export async function searchPeople(number:string){
    const session  = await getServerSession(authOptions);
    if(!session?.user || !session?.user?.id){
        return{
            message:"Unauthenticated request"
        }
    }
    try{
        const user = await prisma.user.findUnique({
            where:{
                number
            },
        });
        
            return user
    }catch(e){
        console.log('hello bitch')
        console.log(e)
        
    }
    
}