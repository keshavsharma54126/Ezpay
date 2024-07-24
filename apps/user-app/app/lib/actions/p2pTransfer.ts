"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client";

export async function p2pTransfer(to:string, amount:number){
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;

    if(!from){
        return {
            message: "User not authenticated"
        }
    }
    
    const toUser = await prisma.user.findFirst({
        where: {
            number: to
        }
    });

    if(!toUser){
        return {
            message: "User not found"
        }
    }

    try {
        const result = await prisma.$transaction(async (tx) => {
            await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId"=${Number(from)} FOR UPDATE`;
            
            const fromBalance = await tx.balance.findUnique({
                where: {
                    userId: Number(from)
                }
            });

            if(!fromBalance || fromBalance.amount < amount){
               return {
                message:"Insufficient Balance"
               }
            }

            await tx.balance.update({
                where: {
                    userId: Number(from)
                },
                data: {
                    amount: {
                        decrement: amount
                    }
                }
            });

            await tx.balance.update({
                where: {
                    userId: Number(toUser.id)
                },
                data: {
                    amount: {
                        increment: amount
                    }
                }
            });

            await tx.p2pTransfer.create({
                data:{
                    fromUserId:Number(from),
                    toUserId:toUser.id,
                    amount,
                    timestamp: new Date()
                }
            })

            return {
                message: "Payment successfull"
            }
        });

        return result;
    } catch (error) {
        console.log(error)
        return {
            message:"An error occurred"
        }
    }
}
