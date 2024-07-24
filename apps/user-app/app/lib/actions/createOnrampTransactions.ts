
"use server"

import prisma from '@repo/db/client'
import {getServerSession} from "next-auth"
import {authOptions} from "../auth"

export const createOnRampTransactions= async(provider:string,value:number)=>{
    const session  = await getServerSession(authOptions);
    if(!session?.user || !session?.user?.id){
        return{
            message:"Unauthenticated request"
        }
    }
    const token = (Math.random()*1000).toString();
    await prisma.onRampTransaction.create({
        data:{
            provider,
            status:"Processing",
            amount:value*100,
            startTime:new Date(),
            userId:Number(session?.user?.id),
            token
        }
    })
    return{
        message:"Done"
    }
}   

