import { NextRequest, NextResponse } from 'next/server';
import prisma from "@repo/db/client"
import { authOptions } from '../../lib/auth';
import {getServerSession} from "next-auth"
export async function POST(req: NextRequest) {
  const { toUserId } = await req.json();
  const session = await getServerSession(authOptions)
    if(!session){
        return NextResponse.json({message:"User not signed in"},{status:404})
    }
  if (!toUserId) {
    return NextResponse.json({ message: "userId is required" }, { status: 400 });
  }

  try {
    const res = await prisma.conversation.findFirst({
        where:{
            user1Id:Number(session?.user.id),
            user2Id:toUserId
        }
    })
    if(res){
        return NextResponse.json({message:"conversation already added"},{status:200})
    }
    await prisma.conversation.create({
        data:{
            user1Id:Number(session?.user.id),
            user2Id:toUserId
        }
    })
    return NextResponse.json({message:"conversatoin added"},{status:200})
   
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
