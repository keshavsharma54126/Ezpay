import React from 'react';
import { getServerSession } from 'next-auth';
import { Card } from "@repo/ui/card";
import prisma from '@repo/db/client';
import { authOptions } from '../../lib/auth';
import { Button } from '@repo/ui/button';
import { TotalTransactions } from '../../../components/TotalTransactions';

// Types
type TransactionType = 'sent' | 'received' | 'bank transfer';

interface Transaction {
  id: number;
  timestamp: Date;
  amount: number;
  type: TransactionType;
  status?: string;
  provider?: string;
  toUserId?:number;
  fromUserId?:number;
}

// Server Component for data fetching
async function TransactionsPage() {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);

  if (!userId) {
    return <div>Please log in to view transactions.</div>;
  }

  const [sentTransactions, receivedTransactions, onRampTransactions] = await Promise.all([
    prisma.p2pTransfer.findMany({
      where: { fromUserId: userId },
      orderBy: { timestamp: 'desc' },
    }),
    prisma.p2pTransfer.findMany({
      where: { toUserId: userId },
      orderBy: { timestamp: 'desc' },
    }),
    prisma.onRampTransaction.findMany({
      where: { userId: userId },
    }),
  ]);

  const combinedTransactions: Transaction[] = [
    ...sentTransactions.map(tx => ({ ...tx, type: 'sent' as TransactionType })),
    ...receivedTransactions.map(tx => ({ ...tx, type: 'received' as TransactionType })),
    ...onRampTransactions.map(tx => ({ 
      ...tx, 
      timestamp: tx.startTime, 
      type: 'bank transfer' as TransactionType 
    })),
  ];

  const sortedTransactions = combinedTransactions.sort((a, b) => 
    b.timestamp.getTime() - a.timestamp.getTime()
  );

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-indigo-600 text-4xl pt-8 mb-8 font-bold">
        Transactions
      </h1>
      <TotalTransactions transactions={sortedTransactions} />
    </div>
  );
}

// Client Component for rendering


export default TransactionsPage;