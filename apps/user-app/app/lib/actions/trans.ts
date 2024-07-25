import { OnRampTransactions } from './../../../components/OnRampTransactions';
import { P2pTransactions } from '../../../components/P2pTransactions';
// lib/prisma.ts
import  prisma from '@repo/db/client';
import { authOptions } from '../auth';
import { getServerSession } from 'next-auth';




export const getUserTransactions = async () => {
    const session = await getServerSession(authOptions);
    const sentTransactions = await prisma.p2pTransfer.findMany({
        where:{
            fromUserId:Number(session?.user?.id)
        },orderBy:{
            timestamp:'desc'
        }

    })
    const toTransactions = await prisma.p2pTransfer.findMany({
        where:{
            toUserId:Number(session?.user?.id)
        },orderBy:{
            timestamp:'desc'
        }

    })

    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    const combinedTransactions = [
        ...sentTransactions.map(tx => ({...tx,type:'sent'})),
        ...toTransactions.map(tx=>({...tx,type:'recieved'})),
        ...txns.map(tx=>({...tx,timestamp:tx.startTime,type:"bank transfer"}))
    ];

    const sortedTransactions =combinedTransactions.sort((a,b)=> (b.timestamp.getTime()-a.timestamp.getTime()));
    console.log(sortedTransactions)
   return sortedTransactions

};
