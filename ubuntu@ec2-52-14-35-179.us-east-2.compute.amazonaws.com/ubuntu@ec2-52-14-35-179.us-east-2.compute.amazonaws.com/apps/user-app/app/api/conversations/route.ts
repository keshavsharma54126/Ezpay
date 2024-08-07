import { NextRequest, NextResponse } from 'next/server';
import prisma from "@repo/db/client";
import { authOptions } from '../../lib/auth';
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ message: "User not signed in" }, { status: 500 });
  }

  try {
    const res = await prisma.conversation.findMany({
      where: {
        OR: [
          { user1Id: Number(session?.user.id) },
          { user2Id: Number(session?.user.id) }
        ],
      },
      include: {
        user1: true,
        user2: true,
      }
    });
    return NextResponse.json({ conversations: res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
